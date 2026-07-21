# FOC Capital Markets Dashboard — Deployment Guide

A standalone React app (Vite) for Netlify, seeded with your workbook data. Anyone with the link can **view**; only someone who enters the **editor passcode** can change data.

Two storage modes:
- **Shared mode** (recommended): edits save to a Supabase database. You edit, Tony opens the link and sees your latest numbers (his view auto-refreshes every ~20 seconds).
- **Local mode** (automatic fallback): if the Supabase variables are blank, data saves only in the editor's browser. Fine for a private preview, but not shared.

---

## Quick start (~15 minutes)

### Step 1 — Supabase (skip only if you want local-only mode)
1. At supabase.com, create a free project (e.g. `foc-capital`).
2. Open **SQL Editor**, paste `supabase-schema.sql`, run it.
3. Open **Project Settings → API** and copy the **Project URL** and the **anon public key**.

### Step 2 — Netlify (Git-connected, recommended)
1. Push this folder to a private GitHub repo.
2. In Netlify: **Add new site → Import an existing project**, choose the repo. `netlify.toml` already sets the build command and publish directory.
3. Under **Site configuration → Environment variables**, add:
   - `VITE_SUPABASE_URL` = your project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
   - `VITE_EDITOR_PASSCODE` = a passcode only you know (this is what unlocks editing)
4. Deploy.

**Or drag-and-drop:** copy `.env.example` to `.env`, fill in the three vars, run `npm install && npm run build`, then drag the `dist` folder onto https://app.netlify.com/drop. (Manual redeploys.)

### Step 3 — Custom domain (optional)
Netlify → **Domain management → Add a domain** (e.g. `capital.focities.com`), then add the CNAME it provides at your DNS host.

---

## Using it
- **Viewers** (Tony, team): open the link, browse everything, numbers refresh automatically. They cannot change data.
- **You**: click **View only · Unlock** in the header, enter the editor passcode. The button turns to **● Editing** and your changes save to the shared database. Click it again to drop back to view-only.
- The header **save indicator** shows "Saved · shared" (Supabase) or "Saved · this browser" (local mode).

## Backups — your safety net
The **Backup** button (always available) downloads the entire dataset as one JSON file — every deal, lender, loan, closing checklist, project, and task. Keep copies in Google Drive. If anything ever breaks, **Restore from file** rebuilds it in one step. This works with zero setup and no login. Do a download before any big change.

## Security — read this
- The **editor passcode** and the **viewer link** are browser-side controls plus an unlisted, `noindex` URL. This is appropriate for an internal management tool, but it is **not** hardened authentication — someone with the link and technical skill could read the data, and the anon key can write. Treat the URL like a sensitive Google Sheet link: share only with people who should see lender terms and deal economics.
- If FOC later needs real per-person logins, roles, and an audit trail, Supabase Auth layers onto this same database — ask Claude to wire it in.

## Not included yet
- **Gmail import** and **Google Drive document upload / auto-backup** need Google OAuth ("admin mode") and are a separate wiring job on top of this. The public view stays login-free; only you would connect Google. For now: the in-chat workflow with Claude covers email extraction, and document links (paste a Drive URL) work everywhere in the app today.

## Updating the seed data
The workbook snapshot lives in `src/App.jsx` as the `SEED` constant. To re-seed from a fresh export, give the new file to Claude for an updated `App.jsx` — or just edit in the live dashboard, which is the point of it.

## Local development
```bash
npm install
npm run dev     # http://localhost:5173
```
