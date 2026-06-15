// lib/pesapal.ts
// All PesaPal API calls — server-side only

const SANDBOX_BASE = 'https://cybqa.pesapal.com/pesapalv3';
const LIVE_BASE = 'https://pay.pesapal.com/v3';

function getBase(): string {
  const env = process.env.PESAPAL_ENV;
  if (env !== 'live') {
    console.warn(
      `[Pesapal] WARNING: PESAPAL_ENV="${env}" — using SANDBOX endpoint. ` +
      `Set PESAPAL_ENV=live in Vercel env vars for real payments.`
    );
    return SANDBOX_BASE;
  }
  return LIVE_BASE;
}

// Step 1: Get a bearer token (valid 5 minutes)
export async function getPesapalToken(): Promise<string> {
  const key = process.env.PESAPAL_CONSUMER_KEY;
  const secret = process.env.PESAPAL_CONSUMER_SECRET;

  if (!key || !secret) {
    throw new Error(
      'PesaPal credentials missing. Add PESAPAL_CONSUMER_KEY and ' +
      'PESAPAL_CONSUMER_SECRET to your Vercel environment variables.'
    );
  }

  const base = getBase();
  console.log(`[Pesapal] Authenticating against: ${base}`);

  const res = await fetch(`${base}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      consumer_key: key,
      consumer_secret: secret,
    }),
  });

  const data = await res.json();

  if (!data.token) {
    throw new Error('PesaPal auth failed: ' + JSON.stringify(data));
  }

  console.log('[Pesapal] Auth token obtained successfully.');
  return data.token;
}

// Step 2: Register IPN URL (call once at setup via /api/pesapal/setup-ipn)
export async function registerIPN(token: string, ipnUrl: string) {
  const res = await fetch(`${getBase()}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: ipnUrl,
      ipn_notification_type: 'GET',
    }),
  });
  return res.json();
}

// Step 3: Submit an order and get the payment redirect URL
export async function submitOrder(
  token: string,
  params: {
    merchantRef: string;
    amount: number;
    description: string;
    callbackUrl: string;
    notificationId: string;
    customer: {
      firstName: string;
      lastName?: string;
      phone: string;
      email?: string;
    };
  }
) {
  const res = await fetch(`${getBase()}/api/Transactions/SubmitOrderRequest`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: params.merchantRef,
      currency: 'UGX',
      amount: params.amount,
      description: params.description,
      callback_url: params.callbackUrl,
      notification_id: params.notificationId,
      branch: 'ELIWARES - Kampala',
      billing_address: {
        phone_number: params.customer.phone,
        email_address: params.customer.email || '',
        country_code: 'UG',
        first_name: params.customer.firstName,
        last_name: params.customer.lastName || '',
      },
    }),
  });

  const data = await res.json();
  console.log('[Pesapal] SubmitOrder response:', JSON.stringify(data));
  return data;
}

// Step 4: Check payment status using the order tracking ID
export async function getTransactionStatus(token: string, orderTrackingId: string) {
  const res = await fetch(
    `${getBase()}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return res.json();
}
