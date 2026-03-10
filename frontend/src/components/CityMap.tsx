/**
 * Interactive Map Component
 * Displays city zones with emission heatmap
 */

import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Zone } from '@/types';
import { getEmissionColor, formatNumber } from '@/utils/helpers';
import 'leaflet/dist/leaflet.css';

interface CityMapProps {
  zones: Zone[];
}

// Component to update map view
function MapUpdater({ zones }: { zones: Zone[] }) {
  const map = useMap();

  useEffect(() => {
    if (zones.length > 0) {
      const bounds = zones.flatMap((zone) =>
        zone.coordinates.map((coord) => [coord.lat, coord.lng] as LatLngExpression)
      );
      if (bounds.length > 0) {
        map.fitBounds(bounds as LatLngExpression[]);
      }
    }
  }, [zones, map]);

  return null;
}

export function CityMap({ zones }: CityMapProps) {
  const center: LatLngExpression = [28.6139, 77.2090]; // Delhi center
  const zoom = 12;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater zones={zones} />

        {zones.map((zone) => {
          const color = getEmissionColor(zone.emissionLevel);
          const positions: LatLngExpression[] = zone.coordinates.map((coord) => [
            coord.lat,
            coord.lng,
          ]);

          return (
            <Polygon
              key={zone.id}
              positions={positions}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.5,
                weight: 2,
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{zone.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-semibold">Type:</span>{' '}
                      <span className="capitalize">{zone.type}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Emissions:</span>{' '}
                      {formatNumber(zone.currentEmissions, 2)} kg/day
                    </p>
                    <p>
                      <span className="font-semibold">Level:</span>{' '}
                      <span
                        className="capitalize font-bold"
                        style={{ color }}
                      >
                        {zone.emissionLevel}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Population:</span>{' '}
                      {formatNumber(zone.population)}
                    </p>
                    <p>
                      <span className="font-semibold">Vehicles:</span>{' '}
                      {formatNumber(zone.vehicleCount)}
                    </p>
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
}
