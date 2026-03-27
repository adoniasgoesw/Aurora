# Aurora Pro

**Automate your creative workflow on Meta AI.**

**Aurora Pro** is a Chrome extension (Manifest V3) that automates image and animation generation on [Meta AI](https://meta.ai). This repository contains the **landing page** of the product and the system documentation.

> **Note:** The Chrome extension source code is proprietary and not publicly available in this repository. The extension is distributed as a compiled and obfuscated build to protect the client's intellectual property. This repo contains only the landing page and distribution files.

---

## Project Info

| Field | Value |
|-------|-------|
| **Name** | Aurora Pro |
| **Version** | 1.0.3 |
| **Type** | Chrome Extension (Manifest V3) |
| **Author** | Adonias Goes |
| **Platform** | Meta AI (meta.ai / www.meta.ai) |

---

## Stack & Deploy

| Component | Technology |
|-----------|------------|
| **Landing** | React 19, Vite 7, Tailwind CSS v4 |
| **Extension** | Chrome Extension Manifest V3 |
| **Landing deploy** | Netlify |

---

## What is Aurora Pro

An automation system that runs on the Meta AI page to:

1. **Send prompts in batch** — One prompt per line, processed automatically.
2. **Generate images** — 4 images per prompt via Meta AI.
3. **Animate images** — Automatically sends images for animation (optional).
4. **Organize files** — Saves to structured folders (`assets/images`, `assets/animations`, `assets/videos`).

The system monitors each task's status, handles errors automatically, and allows pausing and resuming the process.

---

## Features

### Extension (Meta AI)

- Batch prompts (one per line).
- Image generation (4 per prompt) or direct video generation (1 per prompt).
- **Animate mode**: generate image → save → send for animation → download animation.
- Task queue with real-time status (pending, paused, completed, error).
- Recovery queue with retries (up to 3x).
- Timeouts and anti-freeze protections (Circuit Breaker, Watchdog).
- Automatic organization in a configurable directory.

### Landing Page

- Language toggle: **EN / PT-BR**.
- **Light / Dark** theme.
- Extension download (`aurora-pro.zip`).
- Responsive layout.

---

## Development

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Build

```bash
cd client
npm run build
```

- Generates the static site in `client/dist/`.
- Includes the extension zip (`aurora-pro.zip`) from `Aurora Pro/dist/`.

---

## Deploy (Netlify)

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `client/dist` |
| **Redirects** | `_redirects` in `public/` (SPA: `/* /index.html 200`) |

---

## Extension System Structure

The floating panel is divided into **5 tabs**:

| Tab | Function |
|-----|----------|
| **Main** | Configuration, prompts, controls and progress bar |
| **Queue** | Task management and status (prompts or animations) |
| **Images** | List of images generated in the session |
| **Animations** | List of animations generated in the session |
| **Folder** | Files in `assets/images` and their animation matches |

---

### Main Tab

**Prompts**

- One prompt per line (separated by Enter); processed automatically one by one.

**Animation Toggle**

- **Animate on:** Generate image → Save → Send for animation → Generate animation → Download.
- **Animate off:** Generate image → Save.

**Generation Type**

- **Images** — 4 images per prompt (default).
- **Videos** — 1 video per prompt (no image step).

**Base directory**

- Structure: `[Base]/assets/images/`, `assets/animations/`, `assets/videos/`.
- Recommended: File System Access API (select folder).

**Controls**

| Button | Action |
|--------|--------|
| Start Download | Starts processing |
| Pause | Pauses the process |
| Resume | Continues (when there are pending tasks) |
| Clear | Removes prompts and clears lists/state |

---

### Queue Tab

- **Images:** queues of 10 prompts (`QUEUE_SIZE`); expand by clicking the header.
- **Animations:** batches of 12 images (`ANIMATION_BATCH_SIZE`).

**Status colors**

| Color | Meaning |
|-------|---------|
| Blue | Pending |
| Orange | Paused |
| Green (✓) | Completed |
| Red (✗) | Error / awaiting recovery |
| Gray | Animated, not downloaded |

**Recovery:** failed items enter the recovery queue; up to 3 attempts (`MAX_RETRY_ATTEMPTS`).

---

### Images & Animations Tabs

- **Images:** grouped by prompt; naming pattern `01. prompt_name_1.jpg` (zero-padded).
- **Animations:** grouped by prompt; `01. prompt_name_1.mp4`.
- Green (✓) = saved; Red (✗) = not saved.

---

### Folder Tab

- Lists all files in `assets/images` (including previous sessions).
- Gray = no animation; Yellow = matching animation found in `assets/animations`.
- Match by base name: `01. Name_1.jpg` ↔ `01. Name_1.mp4`.

---

## Anti-Freeze Protection

| Step | Timeout | Message |
|------|---------|---------|
| Image generation | 5 min | "Meta is not responding." |
| Animate button click | 2 min | "The extension may have an issue." |
| Animation processing | 5 min | "Meta is not responding." |
| Watchdog (general) | 5 min without activity | "System froze (no activity)." |

- **Circuit Breaker:** after 1 Meta failure, the system stops.
- **Watchdog:** checks every 5 s.

---

## Error Cases & Recovery

**Generation:** image/video not generated within 5 min → stops and shows "Meta is not responding". Submit button unavailable → stops after 5 min.

**Animation:** image not sent within 2 min → extension issue message; animation not generated within 5 min → stops; download failed → item in red, retry up to 2x.

**Recovery:** failed prompts enter the recovery queue (up to 3 attempts). When pausing, use **Resume** to continue without losing prompts.

---

## Technical Flow Summary

**Image mode (no Animate)**
Send prompt → wait for 4 images (5 min max) → download (FS or Chrome). Delay between prompts: 3–6 s; between queues: 10 s.

**Image + Animate mode**
Generate and download all images → wait 10 s → process animations in batches of 12 (Animate per image, 2 min max; video 5 min max; download with retry up to 2x).

**Video mode**
Send prompt → wait for 1 video (5 min max) → download.

---

## Usage Recommendations

| Machine | Recommended prompts |
|---------|---------------------|
| Low-end | up to 50 |
| Mid-range | up to 100 |
| High-end | 100 to 200 |

Start small and scale up gradually (e.g. 10 → 20 → 30 → 50). Animate mode reduces the limit (e.g. 50 vs 200). Performance depends on your internet connection and Meta AI's service.

---

## File Structure

### Repository (Landing + scripts)

```
web/
├── client/
│   ├── src/
│   │   ├── sections/    # HeroSection, Navbar
│   │   ├── contexts/    # ThemeContext, LocaleContext
│   │   └── pages/
│   ├── public/
│   │   ├── _redirects   # Netlify SPA
│   │   └── aurora-pro.zip
│   └── scripts/
│       └── zip-aurora.js
└── README.md
```

### Extension (Aurora Pro) — proprietary, not included in this repo

```
Aurora Pro/
├── manifest.json
├── content.js          # Panel, flows, DOM automation
├── content.css
├── background.js       # Service worker (downloads, fetch)
├── popup.html / popup.js / popup.css
├── obfuscate-build.js  # Obfuscated build script
├── dist/               # Distribution (obfuscated JS)
└── icons/              # 16, 48, 128px
```

Extension build: `npm run build` (generates `dist/` with obfuscated JS).

---

## Summary

Aurora Pro delivers:

- Automatic file organization (images, animations, videos).
- Real-time task monitoring with recovery queue.
- Error control, timeouts, and recovery (pause/resume).
- Modern landing page (React 19, Vite 7, Tailwind v4) with extension download, theme switching, and EN/PT-BR localization.

Allows generating large volumes of visual content on Meta AI with minimal manual effort.

---

## Developer

**Adonias Goes**
GitHub: [@adoniasgoesw](https://github.com/adoniasgoesw)
