# Nepal Anywhere - Logistics Tracking Website

[![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?logo=netlify)](https://app.netlify.com/drop)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?logo=render)](https://render.com)

Full-stack logistics site with shipment tracking, contact forms, and admin dashboard.

## 🚀 Quick Local Setup
```
# Backend (APIs + MongoDB)
cd backend
npm install
npm run dev  # http://localhost:3000

# Frontend auto-served at http://localhost:3000
# Test: Track 'HC-20250101', submit contact form
```

**MongoDB**: Set `MONGODB_URI` in `backend/.env` (local DB or [Atlas free](https://mongodb.com/atlas)).

## 🌐 Features Live
- 📦 **Tracking**: Real-time status (NYC delivery flow)
- 📝 **Contact**: Saves inquiries to DB
- 👨‍💼 **Admin**: `/admin.html` - View shipments/inquiries, clear data
- 📱 **Responsive**: Mobile/desktop

Sample Data: 5 shipments seeded (HC-20250101 Delivered, etc.)

## 🛠 Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS
- **Backend**: Express.js + Mongoose + MongoDB
- **APIs**:
  | Endpoint | Method | Description |
  |----------|--------|-------------|
  | `/api/track` | POST | `{trackingNumber}` → Shipment details |
  | `/api/contact` | POST | Form submission |
  | `/api/admin/shipments` | GET | All shipments |
  | `/api/admin/inquiries` | GET | New inquiries |

## 📤 Deploy to Production
### Frontend (Static - 1 min)
1. [Netlify Drop](https://app.netlify.com/drop): Drag this repo folder.
2. [Vercel](https://vercel.com): Import GitHub repo.

### Backend (Full APIs)
1. [Render.com](https://render.com): New Web Service → GitHub repo → dir: `backend/`
   - Build: `npm install`
   - Start: `node server.js`
   - Env: `MONGODB_URI=your_atlas_connection_string`
2. Update frontend `script.js` fetches to `https://your-render-app.onrender.com/api/...`

### Database
- [MongoDB Atlas](https://www.mongodb.com/atlas): Free cluster, get URI for .env.

## 📁 Project Structure
```
nepal-anywhere-website/
├── index.html     # Main site
├── styles.css     # Responsive styles
├── script.js      # Tracking/contact logic
├── backend/
│   ├── server.js  # Express APIs
│   ├── db.js      # MongoDB connect
│   ├── models/    # Shipment/Inquiry schemas
│   └── data/      # Sample JSON seed
└── README.md
```

## 🎉 Next: Deploy & Share!
- Push any changes: `git add . && git commit -m \"update\" && git push`
- Live site ready after deploy!
