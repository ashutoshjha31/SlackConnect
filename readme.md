# Slack Connect App

A full-stack Slack Connect app that integrates OAuth 2.0, token management, and scheduled message delivery.

---

## 📁 Repository Structure

```
root/
├── backend/               # Express + Prisma backend
│   ├── src/
│   ├── prisma/
│   └── .env
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   └── .env
├── README.md
└── ...
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/slack-connect-app.git
cd slack-connect-app
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

#### Fill `.env` with:
```
PORT=3000
DATABASE_URL=postgres://<your_postgres_url>
SLACK_CLIENT_ID=xxxx
SLACK_CLIENT_SECRET=xxxx
SLACK_REDIRECT_URI=https://your-backend-url.com/api/slack/callback
```

```bash
npx prisma generate
npx prisma migrate dev --name init
npx ts-node src/index.ts
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
```

#### Fill `.env` with:
```
VITE_BACKEND_URL=https://your-backend-url.com
```

```bash
npm run dev
```

---

## 🏗️ Architecture Overview

### ✅ OAuth Flow
- User clicks “Connect Slack Workspace” → Redirects to Slack Auth URL
- On successful login, Slack redirects to `/api/slack/callback`
- App exchanges code for access token
- Token is stored using Prisma (PostgreSQL)

### 🔐 Token Management
- Uses `upsert` to update or create token per Slack `team.id`
- Stores `access_token`, `refresh_token` (if present), `teamId`

### ⏰ Scheduled Messages
- A cron job runs periodically using `node-cron`
- Pulls scheduled messages from DB and sends via Slack API

---

## ❗ Challenges & Learnings

### ⚠️ Challenge: Localhost & Slack OAuth
Slack doesn’t allow `http://localhost` for redirect URIs. Used `ngrok` for tunneling. Switched to deploying backend on Render with HTTPS.

**Learning:** Always develop OAuth apps with a public HTTPS endpoint when possible.

---

### ⚠️ Challenge: SQLite Issues with Hosting
SQLite is local-only and not supported by most cloud hosts.

**Solution:** Migrated to PostgreSQL (hosted on Supabase).

---

### ⚠️ Challenge: Environment Variables in CI/CD
Managing environment variables in Vercel and Render was tricky.

**Learning:** Use `.env.example` and document variables clearly for future deployments.

---

## 📎 Useful Links
- [Slack App Dashboard](https://api.slack.com/apps)
- [Vercel](https://vercel.com)
- [Render](https://render.com)
- [Supabase (PostgreSQL)](https://supabase.com)

---

## 📬 Contact
Made with ❤️ by [Your Name](https://github.com/your-username).

