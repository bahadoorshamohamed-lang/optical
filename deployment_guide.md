# 🚀 Complete Deployment Guide: Vercel (Frontend) & Render (Backend)

This guide provides step-by-step instructions to deploy **Vision Care Opticals** with the React/Vite frontend on **Vercel** and the Express Node.js REST API on **Render**.

---

## 🛠️ Step 1: Deploy Backend to Render

### 1. Push Project Code to GitHub
Ensure your latest code is pushed to your GitHub repository:
```bash
git add .
git commit -m "Add Node.js Express backend and Vercel/Render deployment configs"
git push origin main
```

### 2. Create Render Web Service
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository (`optical`).
4. Configure the Web Service settings:
   - **Name**: `vision-care-optical-api`
   - **Region**: Select closest region (e.g. *Singapore* or *Frankfurt*)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

5. Add Environment Variables under **Environment**:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - *(Optional)* `MONGODB_URI`: `mongodb+srv://<user>:<password>@cluster.mongodb.net/optical`

6. Click **Create Web Service**. Render will deploy your API server.
7. Once deployed, copy your Render Service URL (e.g., `https://vision-care-optical-api.onrender.com`).

---

## ⚡ Step 2: Deploy Frontend to Vercel

### 1. Import Project to Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository (`optical`).

### 2. Configure Vercel Project Settings
1. **Framework Preset**: `Vite`
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### 3. Add Environment Variable
Expand the **Environment Variables** section and add:
- **Key**: `VITE_API_URL`
- **Value**: `https://vision-care-optical-api.onrender.com` *(Replace with your live Render URL from Step 1)*

4. Click **Deploy**. Vercel will build and launch your site live!

---

## 🧪 Step 3: Verification & Health Check

### 1. Verify Backend API Health
Open your browser or run:
```bash
curl https://vision-care-optical-api.onrender.com/api/health
```
**Expected Response:**
```json
{
  "status": "ok",
  "service": "Vision Care Opticals Backend Service",
  "timestamp": "2026-08-20T..."
}
```

### 2. Verify Frontend & Admin Dashboard
1. Open your live Vercel web URL (e.g. `https://optical-app.vercel.app`).
2. Click the **Admin Dashboard** button or press the shortcut.
3. Test editing the **Top Bar**, **Footer**, **Products**, or **Mass Appeal** categories to confirm real-time data persistence.
