# Aurora Pro — Landing Page

**Automate your Meta AI creative workflow.**

Landing page for [Aurora Pro](https://meta.ai) — a Chrome extension that automates image and animation generation on Meta AI.

---

## Overview

| | |
|---|---|
| **Project** | Aurora Pro Landing |
| **Stack** | React 19, Vite 7, Tailwind CSS v4 |
| **Deploy** | Netlify |

---

## Development

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Build

```bash
cd client
npm run build
```

- Builds the extension zip (`aurora-pro.zip`) from `Aurora Pro/dist/`
- Output in `client/dist/`

---

## Deploy (Netlify)

- **Build command:** `npm run build`
- **Publish directory:** `client/dist`
- **Redirects:** `_redirects` in `public/` (SPA routing: `/* /index.html 200`)

---

## Features

- EN / PT-BR locale toggle
- Light / Dark theme
- Extension download (aurora-pro.zip)
- Responsive layout

---

## Project Structure

```
web/
├── client/
│   ├── src/
│   │   ├── sections/   # HeroSection, Navbar
│   │   ├── contexts/   # ThemeContext, LocaleContext
│   │   └── pages/
│   ├── public/
│   │   ├── _redirects  # Netlify SPA redirects
│   │   └── aurora-pro.zip
│   └── scripts/
│       └── zip-aurora.js
└── README.md
```
