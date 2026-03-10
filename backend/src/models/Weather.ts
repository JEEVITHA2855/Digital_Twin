/**
 * Weather Model
 * Represents weather data that influences CO2 dispersion
 */

export interface Weather {
  temperature: number; // Celsius
  humidity: number; // Percentage
  windSpeed: number; // m/s
  pressure: number; // hPa
  description: string;
  icon: string;
}

export interface WeatherDispersionFactors {
  temperatureFactor: number;
  windFactor: number;
  humidityFactor: number;
}
