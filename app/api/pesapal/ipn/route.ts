import { NextRequest, NextResponse } from 'next/server';
import { getPesapalToken, getTransactionStatus } from '@/lib/pesapal';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderTrackingId = searchParams.get('OrderTrackingId');
  const merchantReference = searchParams.get('OrderMerchantReference');

  if (!orderTrackingId || !merchantReference) {
    return new NextResponse('OK');
  }

  try {
    const token = await getPesapalToken();
    const status = await getTransactionStatus(token, orderTrackingId);

    console.log(`[PesaPal IPN] Order ${merchantReference}: ${status.payment_status_description}`);

    if (status.payment_status_description === 'Completed') {
      // Payment confirmed — you can update your database here
      console.log(`Order ${merchantReference} PAID ✓`);
    } else if (status.payment_status_description === 'Failed') {
      console.log(`Order ${merchantReference} FAILED`);
    }
  } catch (err) {
    console.error('IPN error:', err);
  }

  return new NextResponse('OK');
}
