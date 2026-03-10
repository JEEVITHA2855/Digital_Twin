# Setup Guide

## Digital Twin CO₂ Emission Platform - Complete Setup

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- **Code Editor** (VS Code recommended)
- **OpenWeather API Key** (optional, for real weather data)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Digital_Twin
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Optional: Add your OpenWeather API key to .env
# OPENWEATHER_API_KEY=your_key_here

# Start development server
npm run dev
```

Backend will run on: **http://localhost:3000**

### 3. Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

### 4. Open in Browser

Visit: **http://localhost:5173**

You should see the Digital Twin CO₂ Platform! 🎉

---

## 🔧 Detailed Setup

### Backend Setup (Detailed)

#### 1. Install Dependencies

```bash
cd backend
npm install
```

This installs:
- Express (web framework)
- TypeScript (type safety)
- Axios (HTTP client)
- CORS, Helmet (security)
- Morgan (logging)

#### 2. Configure Environment Variables

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# OpenWeather API (Get free key at https://openweathermap.org/api)
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_CITY=Delhi

# CORS (Add your frontend URLs)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Getting OpenWeather API Key:**

1. Go to: https://openweathermap.org/api
2. Sign up for free account
3. Generate API key (free tier: 60 calls/minute)
4. Add key to `.env` file

**Note**: If you don't add an API key, the app will use mock weather data.

#### 3. Project Structure

```
backend/
├── src/
│   ├── models/          # Data models
│   ├── repositories/    # Data access
│   ├── services/        # Business logic
│   ├── controllers/     # HTTP handlers  │   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── config/          # Configuration
│   ├── app.ts           # Express app
│   └── index.ts         # Entry point
├── package.json
├── tsconfig.json
└── .env
```

#### 4. Available Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production build
npm start

# Lint code
npm run lint

# Format code
npm run format

# Run tests (when implemented)
npm test
```

#### 5. Verify Backend

Test endpoints:

```bash
# Health check
curl http://localhost:3000/api/health

# Get zones
curl http://localhost:3000/api/zones

# Get weather
curl http://localhost:3000/api/weather/current

# Run simulation
curl -X POST http://localhost:3000/api/simulation/calculate \
  -H "Content-Type: application/json" \
  -d '{"interventions":{"trees":500,"evAdoption":20,"trafficReduction":10,"carbonCapture":3,"renewableEnergy":15}}'
```

---

### Frontend Setup (Detailed)

#### 1. Install Dependencies

```bash
cd frontend
npm install
```

This installs:
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Leaflet (maps)
- Recharts (charts)
- Zustand (state management)
- Axios (API client)

#### 2. Configure Environment Variables

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

**Note**: If you deploy backend to different URL, update this.

#### 3. Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── CityMap.tsx
│   │   ├── StatsDashboard.tsx
│   │   ├── EmissionCharts.tsx
│   │   └── ...
│   ├── services/        # API client
│   ├── store/          # Zustand state
│   ├── types/          # TypeScript types
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

#### 4. Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

#### 5. Verify Frontend

Open browser: **http://localhost:5173**

You should see:
- ✅ Interactive map with city zones
- ✅ Emission statistics dashboard
- ✅ Charts and visualizations
- ✅ Intervention control sliders
- ✅ Weather widget
- ✅ Dark/light theme toggle

---

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

#### 1. Prerequisites

- Docker Desktop installed
- Docker Compose installed

#### 2. Build and Run

```bash
# From project root
docker-compose up --build
```

This will:
- Build backend container
- Build frontend container
- Start both services
- Set up networking

#### 3. Access Application

- Frontend: **http://localhost:5173**
- Backend: **http://localhost:3000**

#### 4. Stop Services

```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Individual Docker Builds

#### Backend Only

```bash
cd backend

# Build image
docker build -t digital-twin-backend .

# Run container
docker run -p 3000:3000 \
  -e OPENWEATHER_API_KEY=your_key \
  digital-twin-backend
```

#### Frontend Only

```bash
cd frontend

# Build image
docker build -t digital-twin-frontend .

# Run container
docker run -p 5173:5173 digital-twin-frontend
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using port
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process or change port in .env
PORT=3001
```

#### 2. Module Not Found

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**:
- Check backend `.env` has correct `ALLOWED_ORIGINS`
- Ensure frontend `.env` has correct `VITE_API_URL`
- Restart both servers

#### 4. TypeScript Errors

**Error**: `Cannot find name 'Type'`

**Solution**:
```bash
# Rebuild TypeScript
npm run build

# Check tsconfig.json is correct
```

#### 5. Map Not Loading

**Error**: Map shows gray tiles

**Solution**:
- Check internet connection (map tiles from OpenStreetMap)
- Check browser console for errors
- Verify Leaflet CSS is imported

#### 6. API Key Issues

**Error**: Weather data not loading

**Solution**:
- Verify OpenWeather API key is correct
- Check API key is activated (takes ~10 minutes)
- App will fallback to mock data if key is invalid

---

## 💻 Development Workflow

### Best Practices

#### 1. Code Style

```bash
# Format code before committing
npm run format

# Check for linting errors
npm run lint
```

#### 2. Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-intervention

# Make changes, commit
git add .
git commit -m "feat: add new intervention type"

# Push to remote
git push origin feature/new-intervention
```

#### 3. Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

---

## 🎯 Next Steps

After setup is complete:

1. **Explore the UI**: Try different intervention combinations
2. **Check API Documentation**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. **Review Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Customize Zones**: Edit `backend/src/repositories/ZoneRepository.ts`
5. **Add Features**: Use clean architecture to add new capabilities
6. **Deploy**: See deployment section below

---

## 🚀 Deployment

### Backend Deployment Options

#### 1. Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd backend
heroku create digital-twin-api

# Set environment variables
heroku config:set OPENWEATHER_API_KEY=your_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### 2. Railway

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Select backend folder
4. Add environment variables
5. Deploy

#### 3. AWS EC2

```bash
# SSH to EC2 instance
ssh -i key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <repo>
cd Digital_Twin/backend
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start dist/index.js
pm2 startup
pm2 save
```

### Frontend Deployment Options

#### 1. Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set environment variable
vercel env add VITE_API_URL
```

#### 2. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

#### 3. GitHub Pages

```bash
# Build
cd frontend
npm run build

# Deploy (requires gh-pages package)
npm install -g gh-pages
gh-pages -d dist
```

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Express.js Guide](https://expressjs.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Leaflet Documentation](https://leafletjs.com)

---

## 🆘 Getting Help

If you encounter issues:

1. Check this documentation
2. Review error messages carefully
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Verify all environment variables are set
6. Ensure all dependencies are installed

---

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Backend running on port 3000
- [ ] Frontend running on port 5173
- [ ] Can access application in browser
- [ ] Map loads with zones visible
- [ ] Intervention sliders work
- [ ] Simulation calculates properly
- [ ] Charts display data
- [ ] Weather widget shows data
- [ ] Dark/light theme toggle works
- [ ] No console errors

---

**Setup Complete! Happy Coding! 🚀**
