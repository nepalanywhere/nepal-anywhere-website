# Nepal AnyWhere Backend - Pure Local Setup ✓ (Live Hosting Removed)

✅ **Fully Local - MongoDB Compass + localhost:3000**

## Changes Made:
- [x] db.js: Hardcoded `mongodb://localhost:27017/nepalanywhere` (no cloud URI)
- [x] server.js: Fixed `PORT = 3000` (no process.env.PORT hosting fallback)
- [x] .env: Minimal local config
- [x] All APIs: Track/Contact/Admin → MongoDB Compass

## Run Instructions:
```
cd backend
npm install
npm start
```

**URLs:**
- **Site**: http://localhost:3000/
- **Admin**: http://localhost:3000/admin.html

## Test:
1. **Track** HC-20250101 → Full stages in MongoDB
2. **Contact form** → Check admin inquiries
3. **MongoDB Compass** → Connect localhost:27017 → View `nepalanywhere` db (shipments, inquiries)

**Ready! 🚀 No hosting needed.**


