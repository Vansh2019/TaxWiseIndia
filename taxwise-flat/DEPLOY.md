# TaxWise India — Deployment Guide

## AdSense Tags (Already Integrated ✅)

All three required tags are built in:

| Tag | Location |
|-----|----------|
| `<script async src="...adsbygoogle.js?client=ca-pub-8491879806233542">` | Every page `<head>` |
| `<meta name="google-adsense-account" content="ca-pub-8491879806233542">` | Every page `<head>` |
| `google.com, pub-8491879806233542, DIRECT, f08c47fec0942fa0` | `/ads.txt` route |

Ad units are placed on every page: top banner, mid-article, sidebar.

---

## Deploy to Render.com (Recommended — Free Tier)

1. Push project to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. Add Environment Variables:
   - `MONGODB_URI` → your MongoDB Atlas connection string
   - `EMAIL_USER` → vanshmahajan8082@gmail.com
   - `EMAIL_PASS` → Gmail App Password (not your actual password)
   - `SITE_URL` → your Render URL e.g. https://taxwise-india.onrender.com
   - `NODE_ENV` → production
6. Deploy!

---

## Get Gmail App Password

1. Go to myaccount.google.com → Security
2. Enable 2-Step Verification
3. Search "App Passwords" → Select app: Mail → Generate
4. Use the 16-character password as `EMAIL_PASS`

---

## Submit to Google AdSense

After deploying:
1. Log in to https://adsense.google.com
2. Sites → Add Site → enter your Render URL
3. Verification will find the meta tag and ads.txt automatically
4. Wait 1–14 days for review

---

## Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → URL prefix → enter your site URL
3. Verify via HTML meta tag (already in every page) or DNS
4. Submit sitemap: `https://yoursite.com/sitemap.xml`
