# Digital Twin CO₂ Emission Modeling and Simulation Platform

A production-quality platform for simulating and visualizing urban CO₂ emissions with environmental intervention capabilities.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** and **SOLID principles** with clear separation of concerns:

### Backend Architecture
```
backend/
├── src/
│   ├── controllers/    # HTTP request handlers
│   ├── services/       # Business logic layer
│   ├── repositories/   # Data access layer
│   ├── models/         # Domain models and interfaces
│   ├── routes/         # API route definitions
│   ├── config/         # Configuration management
│   └── middleware/     # Express middleware
```

**Layers:**
- **Controllers**: Handle HTTP requests/responses, validation
- **Services**: Core business logic, emission calculations
- **Repositories**: Data access abstraction
- **Models**: TypeScript interfaces and types

### Frontend Architecture
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API client services
│   ├── store/          # Zustand state management
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
```

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **TailwindCSS** for utility-first styling
- **shadcn/ui** for beautiful components
- **Leaflet** for interactive maps
- **Recharts** for data visualization
- **Zustand** for state management
- **Axios** for API communication

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- REST API with layered architecture
- **Dependency Injection** pattern
- **OpenWeather API** integration
- Mock data repositories (easily replaceable)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your OpenWeather API key to .env
npm run dev
```

Backend runs on: `http://localhost:3000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🎯 Features

### 1. Interactive Digital Twin Map
- Visual representation of city zones (industrial, residential, commercial, green)
- Real-time emission heatmap with color coding
- Click zones for detailed information

### 2. CO₂ Emission Simulation Engine
- Physics-based emission calculations
- Configurable emission factors
- Real-time simulation updates
- Weather-influenced dispersion model

### 3. Environmental Interventions
Control and simulate impact of:
- 🌳 Tree planting
- 🚗 EV adoption
- 🚦 Traffic reduction
- 🏭 Carbon capture units
- ☀️ Renewable energy

### 4. Smart Analytics Dashboard
- Total city emissions tracking
- Zone-by-zone breakdown
- Predictive emission reduction
- Sustainability score calculation
- Historical trend visualization

### 5. Weather Integration
- Real-time weather data from OpenWeather API
- Weather-influenced CO₂ dispersion
- Temperature, wind, and humidity factors

### 6. Modern UI/UX
- Light theme by default (dark mode optional)
- Responsive design
- Smooth animations
- Professional SaaS-style interface
- Loading states and error handling

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=3000
NODE_ENV=development
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_CITY=Delhi
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000/api
```

## 📊 API Documentation

### Endpoints

#### GET `/api/zones`
Get all city zones with emission data
```json
{
  "zones": [
    {
      "id": "zone-1",
      "name": "Industrial District",
      "type": "industrial",
      "emissions": 2450.5,
      "coordinates": {...}
    }
  ]
}
```

#### POST `/api/simulation/calculate`
Calculate emissions with interventions
```json
{
  "interventions": {
    "trees": 1000,
    "evAdoption": 30,
    "trafficReduction": 15,
    "carbonCapture": 5,
    "renewableEnergy": 25
  }
}
```

#### GET `/api/weather/current`
Get current weather data
```json
{
  "temperature": 18.5,
  "humidity": 65,
  "windSpeed": 3.5,
  "description": "Clear sky"
}
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🎨 Design Principles

### SOLID Principles Implementation

- **Single Responsibility**: Each class has one reason to change
- **Open/Closed**: Services are open for extension, closed for modification
- **Liskov Substitution**: Repository interfaces ensure substitutability
- **Interface Segregation**: Focused interfaces for specific needs
- **Dependency Inversion**: Depend on abstractions, not implementations

### Clean Architecture Benefits

1. **Independent of Frameworks**: Business logic doesn't depend on Express or React
2. **Testable**: Business rules can be tested without UI or database
3. **Independent of UI**: UI can change without changing business logic
4. **Independent of Database**: Can swap mock data for real databases easily
5. **Independent of External Agencies**: Business rules don't know about OpenWeather API

## 🔮 Future Enhancements

- [ ] AI/ML prediction model for emission forecasting
- [ ] Multi-city support
- [ ] Real-time IoT sensor integration
- [ ] Advanced weather patterns simulation
- [ ] Historical data analysis
- [ ] Scenario comparison tool
- [ ] Export reports (PDF/Excel)
- [ ] User authentication and roles
- [ ] WebSocket for real-time updates
- [ ] Mobile app with React Native

## 📝 License

MIT License - feel free to use this for your projects!

## 👥 Contributing

This is a hackathon prototype but built with production standards. Contributions welcome!

## 🎓 Learning Resources

This project demonstrates:
- Clean Architecture in Node.js
- SOLID principles in TypeScript
- Modern React patterns
- State management with Zustand
- API design best practices
- Docker containerization
- Professional UI/UX design

Perfect for learning modern full-stack development!

---

**Built with ❤️ for sustainable urban planning**
