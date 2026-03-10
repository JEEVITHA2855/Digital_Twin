/**
 * Application Configuration
 * Centralized configuration management
 */

import dotenv from 'dotenv';

dotenv.config();

export interface AppConfig {
  port: number;
  nodeEnv: string;
  openWeatherApiKey: string;
  openWeatherCity: string;
  allowedOrigins: string[];
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY || '',
  openWeatherCity: process.env.OPENWEATHER_CITY || 'Delhi',
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'],
};

export default config;
