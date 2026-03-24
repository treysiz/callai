# CallAI — Scan-to-Call with AI Ordering

A lightweight web app for restaurants. Customers scan a QR code, land on a branded page, and tap one button to call your AI ordering agent. All content (phone number, brand name, hours) is managed from a password-protected admin panel — no code editing required.

---

## Features

- **One-tap calling** — `tel:` link dials the configured number instantly
- **Bilingual** — Chinese / English toggle, auto-detects browser language
- **Admin panel** — change phone number, brand info, and colors without touching code
- **QR code generator** — enter your public URL, generate and print the QR code
- **Password protected** — admin login required to save any changes
- **Live config** — updates take effect immediately for all new visitors

---

## Project Structure

```
├── server.js          # Express backend
├── config.json        # Persistent config (phone, brand, password)
├── package.json
└── public/
    ├── index.html     # Customer-facing landing page
    └── admin.html     # Admin panel (login required)
```

---

## Quick Start

**1. Install dependencies**
```bash
npm install
```

**2. Start the server**
```bash
npm start
```

**3. Open in browser**

| Page | URL |
|------|-----|
| Customer page | http://localhost:3000/index.html |
| Admin panel   | http://localhost:3000/admin.html |

Default admin password: `admin123` — change it immediately after first login.

---

## Configuration

All settings are managed from **admin.html**. Login and update:

| Field | Description |
|-------|-------------|
| Phone number | The number customers call (supports `+1 (212) 555-1234` format) |
| Brand name (ZH / EN) | Restaurant name in both languages |
| Subtitle (ZH / EN) | Tagline shown under the name |
| Business hours (ZH / EN) | Displayed at the bottom of the page |
| Brand color | Logo background color |
| Landing page URL | Public URL used to generate the QR code |

Changes are saved to `config.json` and reflected instantly.

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/config` | Returns public config (no password) |
| `POST` | `/api/config` | Save config (requires `password` in body) |
| `POST` | `/api/password` | Change admin password |

---

## Deployment

Any Node.js host works. Example with environment variable for port:

```bash
PORT=8080 npm start
```

After deploying, paste the public URL (e.g. `https://your-app.vercel.app/index.html`) into the **Landing page URL** field in the admin panel, then generate and print the QR code.

---

## US Phone Number Format

Use E.164 format for best compatibility:

```
+12125551234
+14078639062
```

Display format in the `phone` field can include dashes or parentheses — they are stripped automatically before generating the `tel:` link.
