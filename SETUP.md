SETUP INSTRUCTIONS FOR AgRO NXT
================================

PREREQUISITES:
1. Node.js v14 or higher (Download from https://nodejs.org/)
2. MongoDB Community Edition (Download from https://www.mongodb.com/try/download/community)
3. Git (optional, for version control)

INSTALLATION STEPS:

### Step 1: Start MongoDB
Windows:
- Open Command Prompt
- Run: mongod
- Keep it running in background

macOS/Linux:
- Terminal: brew services start mongodb-community
or
- Terminal: mongod

### Step 2: Install Dependencies and Configure the Server
From the project root, run:

```powershell
npm run install-all
Copy-Item server\.env.example server\.env
```

Edit `server\.env` if your MongoDB URI or JWT secret differs from the defaults.

### Step 3: Start the Application
Make sure MongoDB is running, then from the project root run:

```powershell
npm run dev
```

Open http://localhost:3000. The backend API runs on http://localhost:5001.

### Step 6: Login
1. Use demo credentials:
   Email: farmer@agro.com
   Password: password123
2. Or create a new account by clicking "Register here"

TROUBLESHOOTING:

Issue: MongoDB connection error
Solution:
- Ensure MongoDB is running (mongod command)
- Check MongoDB URI in server/.env
- For Windows: Services > MongoDB should be running
- For macOS: brew services list (check if mongodb-community is running)

Issue: Port 5001 already in use
Solution:
- Change PORT in server/.env and update the client API URL/proxy to match
- Or stop the process using port 5001

Issue: Port 3000 already in use
Solution:
- Run: set PORT=3001 && npm start (Windows)
- Run: PORT=3001 npm start (macOS/Linux)

Issue: npm install fails
Solution:
- Delete node_modules folder
- Delete package-lock.json
- Run npm install again
- Ensure Node.js is properly installed

Issue: Authentication error
Solution:
- Clear browser cache and cookies
- Delete localStorage (F12 > Application > LocalStorage)
- Login again with demo credentials

FEATURES QUICK START:

1. Dashboard (/)
   - View weather, market prices, recommendations

2. Farm Management (/farms)
   - Add, edit farms with soil data

3. Crop Recommendation (/recommendation)
   - Get AI recommendations based on soil and season

4. Profit Simulation (/profit)
   - Calculate expected profit with charts

5. Government Schemes (/schemes)
   - Browse schemes with filters

6. Sustainability (/sustainability)
   - Check eco-scores and recommendations

7. Voice Assistant (/voice)
   - Demo voice interface

PROJECT STRUCTURE:

agro-nxt/
├── server/
│   ├── models/          (Database schemas)
│   ├── routes/          (API endpoints)
│   ├── middleware/      (Auth, validators)
│   ├── server.js        (Main server file)
│   ├── seed.js          (Demo data script)
│   ├── package.json
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── components/  (Reusable UI)
│   │   ├── pages/       (Page components)
│   │   ├── services/    (API calls)
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md

ENVIRONMENT VARIABLES:

server/.env:
- PORT=5001
- MONGODB_URI=mongodb://localhost:27017/agro-nxt
- JWT_SECRET=your_jwt_secret_key_change_in_production_12345
- NODE_ENV=development

USEFUL COMMANDS:

Backend:
- npm start          → Start server
- npm run dev        → Start with nodemon (auto-reload)
- npm run seed       → Add demo data to MongoDB

Frontend:
- npm start          → Start development server
- npm run build      → Create production build
- npm test           → Run tests

SWITCHING BETWEEN TERMINAL TABS:

To run both server and client simultaneously:
1. Open Terminal 1 → cd agro-nxt/server → npm start
2. Open Terminal 2 → cd agro-nxt/client → npm start

PRODUCTION DEPLOYMENT:

Before deploying to production:
1. Change JWT_SECRET in .env
2. Set NODE_ENV=production
3. Update MONGODB_URI to production database
4. Configure CORS for your domain
5. Enable HTTPS
6. Set up proper error logging
7. Run: npm run build (in client folder)

SUPPORT & DOCUMENTATION:

- See README.md for complete documentation
- API documentation in server routes
- Component documentation in client/src/components
- For issues, check browser console (F12) and server logs

NEXT STEPS:

1. Explore the dashboard
2. Create a farm
3. Get crop recommendations
4. Run profit simulations
5. Check eligibility for schemes
6. Track sustainability metrics

Thank you for using AgRO NXT!
