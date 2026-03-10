# 🚀 Quick Start Guide

Get the Digital Twin CO₂ Platform running in **3 minutes**!

---

## Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend (in a new terminal)
```bash
cd frontend
npm install
```

---

## Step 2: Create Environment Files

### Backend
```bash
cd backend
cp .env.example .env
```

The default `.env.example` works without any modifications! It uses mock weather data.

**Optional**: To use real weather data, get a free API key from [OpenWeather](https://openweathermap.org/api) and add it to `.env`:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

### Frontend
```bash
cd frontend
cp .env.example .env
```

No changes needed! The default configuration works perfectly.

---

## Step 3: Start the Servers

### Backend
```bash
cd backend
npm run dev
```

✅ **Backend running on http://localhost:3000**

### Frontend (in a new terminal)
```bash
cd frontend
npm run dev
```

✅ **Frontend running on http://localhost:5173**

---

## Step 4: Open in Browser

Visit: **http://localhost:5173**

🎉 **You should see the Digital Twin Platform!**

---

## What You'll See

✅ Interactive map with 6 city zones  
✅ Emission statistics dashboard  
✅ Beautiful charts and visualizations  
✅ Intervention control sliders  
✅ Weather widget  
✅ Dark/light theme toggle

---

## Try These Features

1. **Adjust Sliders**: Try adding 1000 trees and see emissions drop!
2. **EV Adoption**: Set to 50% and watch vehicular emissions decrease
3. **Zone Details**: Click on a zone in the map for detailed info
4. **Theme Toggle**: Click the sun/moon icon in the header
5. **Charts**: Scroll down to see emission breakdowns

---

## Troubleshooting

### Port Already in Use?
```bash
# Change port in .env file
PORT=3001  # Backend
# Frontend will auto-assign next available port
```

### Dependencies Not Installing?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Can't See the Map?
- Check your internet connection (map tiles need to load)
- Refresh the page
- Check browser console for errors

---

## Using Docker Instead?

```bash
# From project root
docker-compose up --build
```

Then visit: **http://localhost:5173**

---

## Next Steps

📚 Read [README.md](./README.md) for full documentation  
🏗️ Check [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the design  
📖 See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details  
🚀 Deploy following [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## Need Help?

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
2. Review [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for overview
3. Look at error messages in terminal/console
4. Verify all files copied from `.example` to real files

---

**Happy Coding! 🚀**
