# PesaPal Integration Setup Guide

Your checkout now integrates with **PesaPal 3.0** for MTN and Airtel Mobile Money payments in Uganda.

## Quick Start

### 1. Get PesaPal Test Credentials (Sandbox)

Download test keys: https://developer.pesapal.com/api3-demo-keys.txt

Extract:
- `consumer_key`
- `consumer_secret`

### 2. Add to Vercel Environment Variables

Go to: **Vercel Dashboard → eliwares-site → Settings → Environment Variables**

Add:
```
PESAPAL_CONSUMER_KEY=your_key_from_step_1
PESAPAL_CONSUMER_SECRET=your_secret_from_step_1
PESAPAL_ENV=sandbox
NEXT_PUBLIC_SITE_URL=https://www.eliwares.com  (update with your actual domain)
```

Deploy the changes.

### 3. Register Your IPN URL

After deploying, visit:
```
https://www.eliwares.com/api/setup-ipn
```

The page will show something like:
```json
{
  "ipn_id": "some_long_id_here"
}
```

Copy the `ipn_id` and add to Vercel env vars:
```
PESAPAL_IPN_ID=the_id_from_above
```

### 4. Test Payment Flow

1. Go to www.eliwares.com
2. Add items to cart
3. Click "Proceed to Checkout"
4. Fill in name and phone (e.g. +256772123456)
5. Click "Pay with Mobile Money"
6. You'll be redirected to PesaPal's test page
7. Select MTN or Airtel → enter test number
8. Payment will go through
9. You'll land on payment callback page showing success/pending/failed status

## Switching to Live (Production)

When ready for real money:

1. Register merchant account: https://www.pesapal.com/dashboard/account/register
2. Wait for approval email with live `consumer_key` and `consumer_secret`
3. Update Vercel env vars:
   ```
   PESAPAL_CONSUMER_KEY=your_live_key
   PESAPAL_CONSUMER_SECRET=your_live_secret
   PESAPAL_ENV=live
   ```
4. Redeploy

## File Structure

```
app/
  api/pesapal/
    checkout/route.ts     ← Initiates payment → returns PesaPal redirect URL
    ipn/route.ts          ← PesaPal calls this when payment status changes
    verify/route.ts       ← Called by callback page to confirm payment
  payment/
    callback/page.tsx     ← Customer lands here after paying
lib/
  pesapal.ts              ← Core API functions
components/
  storefront.tsx          ← Updated with checkout form & PesaPal handler
```

## Customer Experience

1. Customer adds items → clicks "Proceed to Checkout"
2. Fills in name, phone, address
3. Clicks "Pay with Mobile Money"
4. Redirected to PesaPal's secure page
5. Selects MTN or Airtel → enters phone number
6. **Phone buzzes with STK push**: "ELIWARES wants UGX 850,000. Enter PIN."
7. Customer approves → payment processes
8. Lands on success/pending/failed page
9. Your IPN endpoint receives confirmation
10. Staff contacts customer to arrange delivery

## Troubleshooting

**"Payment initiation failed"**
- Check that PESAPAL_CONSUMER_KEY and PESAPAL_CONSUMER_SECRET are set in Vercel
- Check that PESAPAL_ENV is set to "sandbox" or "live"
- Check your phone number format (should be like 0772123456 or +256772123456)

**Customer gets redirected but sees blank page**
- The callback page might not be loading correctly
- Check browser console for errors
- Ensure NEXT_PUBLIC_SITE_URL is set correctly

**IPN not firing**
- Check that PESAPAL_IPN_ID is set
- Make sure your IPN URL is correct when you ran `/api/setup-ipn`
- PesaPal needs to reach your domain from their servers (public URL required)

## Documentation

- PesaPal API Docs: https://developer.pesapal.com
- Sandbox Credentials: https://developer.pesapal.com/api3-demo-keys.txt
- Integration Guide: https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/api-reference
