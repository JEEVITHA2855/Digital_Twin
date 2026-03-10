/**
 * Weather Controller
 * Handles HTTP requests for weather data
 */

import { Request, Response, NextFunction } from 'express';
import { WeatherService } from '../services/WeatherService';

export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  /**
   * GET /api/weather/current
   * Get current weather data
   */
  getCurrentWeather = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const weather = await this.weatherService.getCurrentWeather();
      const dispersionFactors =
        this.weatherService.calculateDispersionFactors(weather);

      res.json({
        success: true,
        data: {
          weather,
          dispersionFactors,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
