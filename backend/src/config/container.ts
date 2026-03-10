/**
 * Dependency Container
 * Implements Dependency Injection pattern
 * Follows Dependency Inversion Principle
 */

import { AppConfig } from './config';

// Repositories
import {
  IZoneRepository,
  MockZoneRepository,
} from '../repositories/ZoneRepository';
import {
  IWeatherRepository,
  OpenWeatherRepository,
  MockWeatherRepository,
} from '../repositories/WeatherRepository';

// Services
import { EmissionSimulationService } from '../services/EmissionSimulationService';
import { WeatherService } from '../services/WeatherService';
import { ZoneService } from '../services/ZoneService';
import { SimulationService } from '../services/SimulationService';

// Controllers
import { ZoneController } from '../controllers/ZoneController';
import { WeatherController } from '../controllers/WeatherController';
import { SimulationController } from '../controllers/SimulationController';

export interface Container {
  // Repositories
  zoneRepository: IZoneRepository;
  weatherRepository: IWeatherRepository;

  // Services
  emissionSimulationService: EmissionSimulationService;
  weatherService: WeatherService;
  zoneService: ZoneService;
  simulationService: SimulationService;

  // Controllers
  zoneController: ZoneController;
  weatherController: WeatherController;
  simulationController: SimulationController;
}

/**
 * Create and configure dependency container
 */
export function createContainer(config: AppConfig): Container {
  // Initialize Repositories
  const zoneRepository: IZoneRepository = new MockZoneRepository();

  // Use real OpenWeather API if key provided, otherwise use mock
  const weatherRepository: IWeatherRepository = config.openWeatherApiKey
    ? new OpenWeatherRepository(config)
    : new MockWeatherRepository();

  // Initialize Services
  const emissionSimulationService = new EmissionSimulationService();
  const weatherService = new WeatherService(weatherRepository);
  const zoneService = new ZoneService(zoneRepository);
  const simulationService = new SimulationService(
    emissionSimulationService,
    weatherService,
    zoneService
  );

  // Initialize Controllers
  const zoneController = new ZoneController(zoneService);
  const weatherController = new WeatherController(weatherService);
  const simulationController = new SimulationController(simulationService);

  return {
    zoneRepository,
    weatherRepository,
    emissionSimulationService,
    weatherService,
    zoneService,
    simulationService,
    zoneController,
    weatherController,
    simulationController,
  };
}
