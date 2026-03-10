/**
 * Weather Widget Component
 * Displays current weather and its impact on emissions
 */

import { useEffect } from 'react';
import { Cloud, Wind, Droplets, Thermometer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { useStore } from '@/store';
import { formatNumber } from '@/utils/helpers';

export function WeatherWidget() {
  const { weather, fetchWeather } = useStore();

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  if (!weather) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Weather Conditions
        </CardTitle>
        <CardDescription>
          Current weather affecting emission dispersion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Thermometer className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="text-lg font-bold">{formatNumber(weather.temperature, 1)}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wind className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Wind Speed</p>
              <p className="text-lg font-bold">{formatNumber(weather.windSpeed, 1)} m/s</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Droplets className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-lg font-bold">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Cloud className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Conditions</p>
              <p className="text-sm font-medium capitalize">{weather.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            ℹ️ Weather conditions influence how CO₂ disperses in the atmosphere.
            Higher wind speeds and temperatures generally improve dispersion.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
