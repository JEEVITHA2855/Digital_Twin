# Architecture Documentation

## Digital Twin CO₂ Emission Platform - Clean Architecture

---

## 🏛️ Architectural Overview

This platform follows **Clean Architecture** principles with clear separation of concerns, making it maintainable, testable, and scalable.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Presentation Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Controllers │  │  Routes      │  │  Middleware  │      │
│  │  (HTTP)      │  │  (Express)   │  │  (Error)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Simulation  │  │  Weather     │  │  Zone        │      │
│  │  Service     │  │  Service     │  │  Service     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       Data Access Layer                      │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  Zone        │  │  Weather     │                         │
│  │  Repository  │  │  Repository  │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                         Data Sources                         │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  Mock Data   │  │  OpenWeather │                         │
│  │  (In-Memory) │  │  API         │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

Each class has one reason to change:

- **EmissionSimulationService**: Only calculates emissions
- **WeatherService**: Only handles weather data
- **ZoneService**: Only manages zone data
- **Controllers**: Only handle HTTP requests/responses

**Example:**
```typescript
// ✅ Good: Single responsibility
class EmissionSimulationService {
  calculateZoneEmissions(zone, interventions, weather) {
    // Only emission calculation logic
  }
}

// ❌ Bad: Multiple responsibilities
class EmissionService {
  calculateEmissions() {}
  fetchWeather() {}
  saveToDatabase() {}
  sendEmail() {}
}
```

### 2. Open/Closed Principle (OCP)

Systems are open for extension but closed for modification:

- **Repository Pattern**: Can add new data sources without changing services
- **Service Layer**: Can add new emission factors without changing controllers
- **Intervention Model**: Can add new intervention types easily

**Example:**
```typescript
// ✅ Can add new repositories without changing service
interface IWeatherRepository {
  getCurrentWeather(): Promise<Weather>;
}

class OpenWeatherRepository implements IWeatherRepository {}
class MockWeatherRepository implements IWeatherRepository {}
class CustomAPIRepository implements IWeatherRepository {} // Easy to add!
```

### 3. Liskov Substitution Principle (LSP)

Any repository implementation can replace another:

```typescript
// Both repositories can be used interchangeably
const weatherRepo: IWeatherRepository = config.apiKey 
  ? new OpenWeatherRepository(config)
  : new MockWeatherRepository();

const weatherService = new WeatherService(weatherRepo);
```

### 4. Interface Segregation Principle (ISP)

Focused interfaces for specific needs:

```typescript
// ✅ Good: Specific interfaces
interface IZoneRepository {
  findAll(): Promise<Zone[]>;
  findById(id: string): Promise<Zone | null>;
}

// ❌ Bad: Fat interface
interface IRepository {
  findAll();
  findById();
  create();
  update();
  delete();
  search();
  export();
  import();
}
```

### 5. Dependency Inversion Principle (DIP)

High-level modules don't depend on low-level modules. Both depend on abstractions:

```typescript
// Service depends on abstraction (interface), not concrete implementation
class SimulationService {
  constructor(
    private emissionService: EmissionSimulationService,
    private weatherService: WeatherService, // Uses IWeatherRepository internally
    private zoneService: ZoneService // Uses IZoneRepository internally
  ) {}
}
```

---

## 📦 Layered Architecture

### Layer 1: Models (Domain Layer)

**Purpose**: Define core business entities

**Files**:
- `Zone.ts` - City zone entity
- `Intervention.ts` - Environmental interventions
- `Weather.ts` - Weather data
- `Simulation.ts` - Simulation results

**Rules**:
- No dependencies on other layers
- Pure TypeScript interfaces and types
- Business logic constraints

### Layer 2: Repositories (Data Access Layer)

**Purpose**: Abstract data access

**Files**:
- `ZoneRepository.ts` - Zone data access
- `WeatherRepository.ts` - Weather data access

**Rules**:
- Implements repository interfaces
- Can be swapped without affecting services
- Currently uses mock data and OpenWeather API
- Easy to replace with database (PostgreSQL, MongoDB, etc.)

**Example Swap**:
```typescript
// Current: Mock data
class MockZoneRepository implements IZoneRepository {
  private zones: Zone[] = [...mockData];
}

// Future: Database
class PostgresZoneRepository implements IZoneRepository {
  constructor(private db: Database) {}
  async findAll() {
    return this.db.query('SELECT * FROM zones');
  }
}
```

### Layer 3: Services (Business Logic Layer)

**Purpose**: Core business logic and calculations

**Files**:
- `EmissionSimulationService.ts` - CO₂ calculations
- `WeatherService.ts` - Weather processing
- `ZoneService.ts` - Zone management
- `SimulationService.ts` - Orchestration

**Rules**:
- Depends only on repositories (through interfaces)
- No HTTP/Express dependencies
- Fully testable without UI or database
- Contains all business rules

### Layer 4: Controllers (Presentation Layer)

**Purpose**: Handle HTTP requests/responses

**Files**:
- `ZoneController.ts`
- `WeatherController.ts`
- `SimulationController.ts`

**Rules**:
- Thin layer - no business logic
- Validates input
- Calls services
- Formats responses

### Layer 5: Routes (API Layer)

**Purpose**: Define API endpoints

**Files**:
- `zoneRoutes.ts`
- `weatherRoutes.ts`
- `simulationRoutes.ts`
- `index.ts` - Route aggregation

**Rules**:
- Maps URLs to controllers
- RESTful design
- Clear naming conventions

### Layer 6: Configuration (Infrastructure Layer)

**Purpose**: Dependency injection and configuration

**Files**:
- `config.ts` - Environment configuration
- `container.ts` - Dependency injection container

**Rules**:
- Creates and wires dependencies
- Single source of truth for configuration
- Environment-based configuration

---

## 🔄 Data Flow

### Request Flow (Example: POST /api/simulation/calculate)

```
1. HTTP Request
   ↓
2. Express Middleware (CORS, Body Parser)
   ↓
3. Route Handler (/api/simulation/calculate)
   ↓
4. SimulationController.calculateSimulation()
   ↓
5. SimulationService.runSimulation()
   ├→ ZoneService.getAllZones()
   │  └→ ZoneRepository.findAll()
   ├→ WeatherService.getCurrentWeather()
   │  └→ WeatherRepository.getCurrentWeather()
   └→ EmissionSimulationService.calculateZoneEmissions()
   ↓
6. Aggregate Results
   ↓
7. Return Response (JSON)
```

---

## 🧪 Testability

### Unit Testing Strategy

Each layer can be tested independently:

```typescript
// Test Service without Database or HTTP
describe('EmissionSimulationService', () => {
  const service = new EmissionSimulationService();

  it('should calculate emissions correctly', () => {
    const zone = mockZone;
    const interventions = { trees: 100, ... };
    const weather = mockWeather;

    const result = service.calculateZoneEmissions(zone, interventions, weather);
    
    expect(result.currentEmissions).toBeLessThan(zone.baseEmissions);
  });
});

// Test Controller with Mock Service
describe('SimulationController', () => {
  const mockService = {
    runSimulation: jest.fn().mockResolvedValue(mockResult)
  };
  const controller = new SimulationController(mockService);

  it('should return simulation result', async () => {
    const req = { body: { interventions: {...} } };
    const res = { json: jest.fn() };

    await controller.calculateSimulation(req, res, next);
    
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockResult
    });
  });
});
```

---

## 🔌 Dependency Injection

Using **Constructor Injection** pattern:

```typescript
// container.ts
export function createContainer(config: AppConfig): Container {
  // Create repositories
  const zoneRepository = new MockZoneRepository();
  const weatherRepository = new OpenWeatherRepository(config);

  // Inject into services
  const weatherService = new WeatherService(weatherRepository);
  const zoneService = new ZoneService(zoneRepository);
  const emissionService = new EmissionSimulationService();
  
  // Inject into orchestration service
  const simulationService = new SimulationService(
    emissionService,
    weatherService,
    zoneService
  );

  // Inject into controllers
  const simulationController = new SimulationController(simulationService);

  return { ...allDependencies };
}
```

**Benefits**:
- Easy to swap implementations
- Simplified testing (inject mocks)
- Clear dependencies
- No singletons or globals

---

## 🚀 Scalability Considerations

### Current Architecture Supports:

1. **Horizontal Scaling**: Stateless API can run multiple instances
2. **Database Migration**: Repository pattern makes it easy to add PostgreSQL/MongoDB
3. **Caching Layer**: Can add Redis without changing business logic
4. **Message Queues**: Can add RabbitMQ for async processing
5. **Microservices**: Each service can be extracted into separate service

### Future Enhancements:

```typescript
// Add caching layer
class CachedWeatherRepository implements IWeatherRepository {
  constructor(
    private weatherRepo: IWeatherRepository,
    private cache: ICache
  ) {}

  async getCurrentWeather() {
    const cached = await this.cache.get('weather');
    if (cached) return cached;

    const weather = await this.weatherRepo.getCurrentWeather();
    await this.cache.set('weather', weather, 600); // 10 min
    return weather;
  }
}

// Add event-driven architecture
class SimulationService {
  async runSimulation(request: SimulationRequest) {
    const result = await this.calculateSimulation(request);
    
    // Publish event
    await this.eventBus.publish('simulation.completed', result);
    
    return result;
  }
}
```

---

## 📝 Code Organization Best Practices

### File Naming
- `PascalCase` for classes and types
- One class per file
- File name matches class name

### Import Order
```typescript
// 1. External imports
import express from 'express';
import axios from 'axios';

// 2. Internal imports (models)
import { Zone, Weather } from '../models';

// 3. Internal imports (services)
import { ZoneService } from '../services';

// 4. Internal imports (utilities)
import { formatNumber } from '../utils';
```

### Folder Structure
```
src/
├── models/          # Domain entities
├── repositories/    # Data access
├── services/        # Business logic
├── controllers/     # HTTP handlers
├── routes/          # Route definitions
├── middleware/      # Express middleware
├── config/          # Configuration
└── index.ts         # Entry point
```

---

## 🔒 Security Considerations

Current implementation is prototype-level. For production:

1. **Add Authentication**: JWT, OAuth2
2. **Input Validation**: Use Joi or Zod
3. **Rate Limiting**: Prevent abuse
4. **SQL Injection**: Use parameterized queries (when adding DB)
5. **XSS Protection**: Helmet.js (already added)
6. **HTTPS**: SSL/TLS in production
7. **Environment Variables**: Never commit `.env` files
8. **API Keys**: Rotate regularly, use secrets manager

---

## 📊 Performance Optimization

### Current Optimizations:
- **Compression**: Gzip responses
- **Caching Headers**: Can add cache-control
- **Async/Await**: Non-blocking operations

### Future Optimizations:
- **Database Indexing**: When adding PostgreSQL
- **Redis Caching**: Weather data, zone data
- **CDN**: Frontend assets
- **Lazy Loading**: Large datasets pagination
- **WebSockets**: Real-time updates

---

## 🎓 Learning Architecture

This project demonstrates:

✅ **Clean Architecture**
✅ **SOLID Principles**
✅ **Dependency Injection**
✅ **Repository Pattern**
✅ **Layered Architecture**
✅ **Separation of Concerns**
✅ **Interface-based Design**
✅ **Testable Code**

Perfect for interviews, portfolios, and learning modern backend architecture!
