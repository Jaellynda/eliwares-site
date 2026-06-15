import { NextResponse } from 'next/server';
import { getPesapalToken } from '@/lib/pesapal';

export async function GET() {
  try {
    const key = process.env.PESAPAL_CONSUMER_KEY;
    const secret = process.env.PESAPAL_CONSUMER_SECRET;
    const env = process.env.PESAPAL_ENV;
    const ipnId = process.env.PESAPAL_IPN_ID;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // Check if credentials exist
    if (!key || !secret) {
      return NextResponse.json({
        status: 'MISSING_CREDENTIALS',
        hasKey: !!key,
        hasSecret: !!secret,
        env,
        ipnId: !!ipnId,
        siteUrl,
      });
    }

    // Try to get a token
    const token = await getPesapalToken();

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'PesaPal credentials are valid!',
      token: token.substring(0, 20) + '...',
      env,
      ipnId: !!ipnId,
      siteUrl,
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'ERROR',
      error: err.message,
      hasKey: !!process.env.PESAPAL_CONSUMER_KEY,
      hasSecret: !!process.env.PESAPAL_CONSUMER_SECRET,
    }, { status: 500 });
  }
}
