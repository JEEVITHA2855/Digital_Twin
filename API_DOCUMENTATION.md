# API Documentation

## Digital Twin CO₂ Emission Platform API

Base URL: `http://localhost:3000/api`

---

## Endpoints

### Health Check

**GET** `/api/health`

Check API status

**Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-03-10T12:00:00.000Z"
}
```

---

## Zones

### Get All Zones

**GET** `/api/zones`

Retrieve all city zones with their properties.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "zone-1",
      "name": "Industrial District",
      "type": "industrial",
      "coordinates": [
        { "lat": 51.515, "lng": -0.090 },
        { "lat": 51.515, "lng": -0.070 },
        { "lat": 51.505, "lng": -0.070 },
        { "lat": 51.505, "lng": -0.090 }
      ],
      "baseEmissions": 2500,
      "vehicleCount": 800,
      "population": 5000,
      "industrialUnits": 25,
      "greenCoverage": 10
    }
  ],
  "count": 6
}
```

### Get Zone by ID

**GET** `/api/zones/:id`

Retrieve a specific zone by its ID.

**Parameters:**
- `id` (string) - Zone identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "zone-1",
    "name": "Industrial District",
    "type": "industrial",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Zone not found"
}
```

### Get Zones by Type

**GET** `/api/zones/type/:type`

Retrieve zones filtered by type.

**Parameters:**
- `type` (string) - Zone type: `industrial`, `residential`, `commercial`, or `green`

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 2
}
```

---

## Simulation

### Calculate Simulation

**POST** `/api/simulation/calculate`

Run emission simulation with environmental interventions.

**Request Body:**
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

**Parameters:**
- `interventions.trees` (number, 0-∞) - Number of trees planted
- `interventions.evAdoption` (number, 0-100) - EV adoption percentage
- `interventions.trafficReduction` (number, 0-100) - Traffic reduction percentage
- `interventions.carbonCapture` (number, 0-∞) - Number of carbon capture units
- `interventions.renewableEnergy` (number, 0-100) - Renewable energy percentage

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEmissions": 5234.56,
    "baselineEmissions": 6850.00,
    "emissionReduction": 1615.44,
    "emissionReductionPercentage": 23.58,
    "sustainabilityScore": 65,
    "zones": [
      {
        "id": "zone-1",
        "name": "Industrial District",
        "currentEmissions": 2150.30,
        "emissionLevel": "high",
        "dispersionFactor": 0.95,
        ...
      }
    ],
    "breakdown": {
      "vehicular": 2500.00,
      "industrial": 2000.00,
      "residential": 900.00,
      "treeAbsorption": 57.53,
      "carbonCapture": 500.00,
      "renewableEnergy": 300.00
    },
    "timestamp": "2026-03-10T12:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid intervention values"
}
```

### Get Baseline Simulation

**GET** `/api/simulation/baseline`

Get baseline simulation with no interventions applied.

**Response:**
Same as calculate simulation with all interventions set to 0.

---

## Weather

### Get Current Weather

**GET** `/api/weather/current`

Retrieve current weather data and dispersion factors.

**Response:**
```json
{
  "success": true,
  "data": {
    "weather": {
      "temperature": 18.5,
      "humidity": 65,
      "windSpeed": 3.5,
      "pressure": 1015,
      "description": "Clear sky",
      "icon": "01d"
    },
    "dispersionFactors": {
      "temperatureFactor": 0.874,
      "windFactor": 0.825,
      "humidityFactor": 1.03
    }
  }
}
```

---

## Emission Formulas

### Base Vehicle Emissions
```
vehicular_emissions = vehicles × distance_per_day × emission_factor / 1000
```

**Constants:**
- `emission_factor` = 120g CO₂/km
- `distance_per_day` = 30 km

### EV Reduction
```
ev_reduction = (ev_adoption% / 100) × vehicular_emissions × 0.7
```

### Traffic Reduction
```
traffic_reduction = (traffic_reduction% / 100) × vehicular_emissions
```

### Industrial Emissions
```
industrial_emissions = industrial_units × 80 kg/day
```

### Renewable Energy Reduction
```
renewable_reduction = (renewable_energy% / 100) × industrial_emissions × 0.6
```

### Tree Absorption
```
tree_absorption = (trees × 21 kg/year) / 365 days
```

### Carbon Capture
```
carbon_capture = units × 100 kg/day
```

### Total Emissions
```
total = vehicular + industrial + residential - tree_absorption - carbon_capture
```

### Sustainability Score (0-100)
```
emission_reduction_score = ((baseline - current) / baseline) × 100 × 0.6
intervention_score = (
  (trees / 10000) × 5 +
  (ev_adoption / 100) × 20 +
  (traffic_reduction / 100) × 15 +
  (carbon_capture / 100) × 10 +
  (renewable_energy / 100) × 20
) × 0.4

sustainability_score = min(100, emission_reduction_score + intervention_score)
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently no rate limiting is implemented. For production deployment, consider implementing rate limiting middleware.

---

## CORS

CORS is enabled for the following origins:
- `http://localhost:5173` (Frontend dev server)
- `http://localhost:3000`

Configure additional origins in `.env` file:
```
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

---

## Authentication

Currently no authentication is implemented. This is a prototype suitable for hackathons and demos. For production:

1. Implement JWT-based authentication
2. Add API key validation
3. Implement user roles and permissions
4. Add OAuth2 integration if needed

---

## Future Endpoints (Not Yet Implemented)

### Historical Data
```
GET /api/simulation/history
GET /api/simulation/history/:date
```

### Scenarios
```
POST /api/scenarios
GET /api/scenarios
GET /api/scenarios/:id
DELETE /api/scenarios/:id
```

### Predictions
```
POST /api/ai/predict
GET /api/ai/forecast
```

---

## Testing with cURL

### Get all zones
```bash
curl http://localhost:3000/api/zones
```

### Run simulation
```bash
curl -X POST http://localhost:3000/api/simulation/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "interventions": {
      "trees": 500,
      "evAdoption": 20,
      "trafficReduction": 10,
      "carbonCapture": 3,
      "renewableEnergy": 15
    }
  }'
```

### Get weather
```bash
curl http://localhost:3000/api/weather/current
```

---

## Swagger/OpenAPI

To add Swagger documentation, install:
```bash
npm install swagger-ui-express swagger-jsdoc
```

Then configure in your Express app for interactive API documentation.
