import { NextRequest, NextResponse } from 'next/server';
import { getPesapalToken, submitOrder } from '@/lib/pesapal';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, amount, items, orderId } = body;

    // Validate
    if (!customer?.name || !customer?.phone || !amount || !orderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.PESAPAL_CONSUMER_KEY) {
      return NextResponse.json(
        { error: 'PesaPal not configured. Please add env vars.' },
        { status: 500 }
      );
    }

    const token = await getPesapalToken();

    const merchantRef = `ELI-${orderId}`.replace(/[^a-zA-Z0-9\-_.]/g, '').slice(0, 50);

    const nameParts = customer.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || 'Customer';

    const rawDesc = `ELIWARES order: ${items.map((i: any) => i.name).join(', ')}`;
    const description = rawDesc.length > 100 ? rawDesc.slice(0, 97) + '...' : rawDesc;

    const result = await submitOrder(token, {
      merchantRef,
      amount,
      description,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/callback`,
      notificationId: process.env.PESAPAL_IPN_ID!,
      customer: {
        firstName,
        lastName,
        phone: customer.phone,
        email: customer.email || undefined,
      },
    });

    if (!result.redirect_url) {
      console.error('PesaPal error:', result);
      return NextResponse.json({ error: 'Payment initiation failed', detail: result }, { status: 500 });
    }

    return NextResponse.json({
      redirectUrl: result.redirect_url,
      orderTrackingId: result.order_tracking_id,
      merchantReference: result.merchant_reference,
    });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
