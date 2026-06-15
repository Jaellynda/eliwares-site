import { NextRequest, NextResponse } from 'next/server';
import { getPesapalToken, getTransactionStatus } from '@/lib/pesapal';

export async function GET(req: NextRequest) {
  const trackingId = new URL(req.url).searchParams.get('trackingId');
  if (!trackingId) return NextResponse.json({ error: 'Missing trackingId' }, { status: 400 });

  try {
    const token = await getPesapalToken();
    const result = await getTransactionStatus(token, trackingId);

    return NextResponse.json({
      status: result.payment_status_description,
      amount: result.amount,
      currency: result.currency,
      method: result.payment_method,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
