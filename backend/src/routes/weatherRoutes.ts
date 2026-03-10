/**
 * Weather Routes
 * API routes for weather data
 */

import { Router } from 'express';
import { WeatherController } from '../controllers/WeatherController';

export function createWeatherRoutes(
  weatherController: WeatherController
): Router {
  const router = Router();

  router.get('/current', weatherController.getCurrentWeather);

  return router;
}
