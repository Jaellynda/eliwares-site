# ELIWARES Website

Premium bathroom hardware store for Uganda, with MTN & Airtel Mobile Money checkout and full admin panel.

## Project Structure

```
eliwares/
├── index.html              ← Customer storefront (homepage)
├── vercel.json             ← Vercel deployment config
├── src/
│   ├── style.css           ← All styles (storefront + admin)
│   ├── data.js             ← Data store, DB functions, defaults
│   └── app.js              ← Storefront JavaScript
├── admin/
│   ├── login.html          ← Admin login page
│   ├── dashboard.html      ← Admin overview & stats
│   ├── products.html       ← Add/edit/delete products
│   ├── inventory.html      ← Stock levels, sales log
│   ├── orders.html         ← Customer orders management
│   └── brands.html         ← Brand management
└── public/
    └── images/             ← Upload product images here
```

## Default Admin Credentials

- **Username:** `admin`
- **Password:** `eliwares2025`

⚠️ Change the password in `src/data.js` → `DEFAULT_ADMIN` before going live.

## Features

### Customer Store
- Product catalogue with category & brand filters
- Stock status: In Stock / Out of Stock / Coming Soon
- Product detail modal with quantity selector
- Cart drawer with quantity controls
- Checkout with MTN MoMo, Airtel Money, or Pay on Pickup

### Admin Panel (password protected)
- Dashboard with sales stats, low stock alerts, recent orders
- Product management: add, edit, delete, set price/image/warranty
- Inventory: shop stock vs storage stock, min alert levels, stock update
- Sales log: track what sold, when, and to which order
- Orders: view all orders, update status, see payment details
- Brands: manage brands with per-brand stats

## How to Deploy on Vercel (Free)

### Option A – Drag & Drop (Easiest)
1. Go to https://vercel.com and sign up with GitHub/Google
2. Click **"Add New Project"** → **"Browse"** → upload the `eliwares` folder
3. Click **Deploy** — done! You get a free `.vercel.app` URL

### Option B – GitHub (Recommended for updates)
1. Create a free account at https://github.com
2. Create a new repository called `eliwares`
3. Upload all files from this folder to the repo
4. Go to https://vercel.com → **Import Git Repository** → select your repo
5. Click **Deploy**
6. Every time you update files on GitHub, Vercel auto-redeploys

### Option C – Vercel CLI
```bash
npm i -g vercel
cd eliwares
vercel
```

## Adding a Custom Domain (e.g. eliwares.ug)
1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `eliwares.ug`)
3. Update your domain's DNS with the values Vercel gives you

## Adding Product Images
1. Upload images to `public/images/` (e.g. `public/images/marble-tile.jpg`)
2. In Admin → Products → Edit product → set Image URL to `/public/images/marble-tile.jpg`
   Or paste any public image URL from the web.

## Data Storage
All data (products, orders, stock levels) is stored in the browser's localStorage.
This means data is stored per device/browser. For a shared database across devices,
the next step would be to connect to a backend like Supabase (free tier available).

## Changing Admin Password
Open `src/data.js` and find:
```js
const DEFAULT_ADMIN = { username: 'admin', password: 'eliwares2025' };
```
Change the values and redeploy.
