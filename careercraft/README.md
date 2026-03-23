# CareerCraft AI — Setup Guide

## File Structure
```
your-project/
├── index.html          ← Frontend (everything: HTML + CSS + JS)
├── api/
│   └── generate.js     ← Vercel serverless function (Gemini API)
└── README.md
```

---

## Step 1 — Google OAuth Client ID (for Login with Google)

1. Go to https://console.cloud.google.com
2. Create a new project (or use existing)
3. Go to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized JavaScript origins: `https://your-domain.com`
7. Copy the **Client ID** (looks like: `123456789-abc.apps.googleusercontent.com`)
8. In `index.html`, replace:
   ```
   client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
   ```
   with your real Client ID.

---

## Step 2 — Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Click **Create API Key**
3. Copy the key

---

## Step 3 — Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (run from your project folder)
vercel --prod
```

When prompted, set environment variable:
- Name: `GEMINI_API_KEY`
- Value: your Gemini API key

Or add it in the Vercel dashboard:
**Project → Settings → Environment Variables → Add**

---

## Step 4 — Google AdSense

1. Go to https://adsense.google.com
2. Sign up and add your website URL
3. Wait for approval (typically 1–7 days)
4. Once approved, get your **Publisher ID** (ca-pub-XXXXXXXXXX)
5. Create ad units and get **Ad Slot IDs**
6. In `index.html`, replace:
   - `ca-pub-XXXXXXXXXXXXXXXX` → your Publisher ID
   - `YOUR_AD_SLOT_ID` → your ad slot ID
7. Uncomment the `<ins>` blocks and remove the placeholder `<div>`s

### Ad slots in this page:
| Location | Size | Type |
|---|---|---|
| Below login hero | 728×90 | Leaderboard |
| Between form & result (Resume) | Responsive | Auto |
| Between form & result (Cover Letter) | Responsive | Auto |
| Sidebar | 300×250 | Medium Rectangle |

---

## Step 5 — Add your domain

1. Buy a domain (Namecheap ~$10/yr, Google Domains, etc.)
2. In Vercel dashboard → **Project → Settings → Domains → Add**
3. Update the `<link rel="canonical">` and `<meta property="og:url">` in `index.html`
4. Update Google OAuth authorized origins with your new domain

---

## Features included

- Login with Google (OAuth 2.0 — no password database needed)
- Session persists via localStorage (user stays logged in)
- Daily usage limit: 10 generations per user (resets at midnight)
- Resume Builder with ATS optimization
- Cover Letter Generator
- Copy to clipboard + Download as .txt
- 4 AdSense ad slots pre-configured
- Full SEO meta tags
- Responsive design (mobile + desktop)
- Vercel serverless API (Gemini key never exposed to browser)
