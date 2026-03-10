/**
 * Main Application Component
 */

import { useEffect } from 'react';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { CityMap } from './components/CityMap';
import { InterventionControls } from './components/InterventionControls';
import { EmissionCharts } from './components/EmissionCharts';
import { WeatherWidget } from './components/WeatherWidget';
import { LoadingScreen } from './components/ui/Loading';
import { useStore } from './store';

export function App() {
  const { zones, simulationResult, isLoading, fetchZones, runSimulation } = useStore();

  useEffect(() => {
    // Initialize app data
    const initializeApp = async () => {
      await fetchZones();
      await runSimulation();
    };

    initializeApp();
  }, [fetchZones, runSimulation]);

  if (isLoading && zones.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto p-4 space-y-6">
        {/* Statistics Dashboard */}
        <section>
          <StatsDashboard result={simulationResult} />
        </section>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column: Map and Weather */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Map */}
            <section className="h-[500px]">
              <CityMap zones={zones} />
            </section>

            {/* Charts */}
            <section>
              <EmissionCharts result={simulationResult} />
            </section>
          </div>

          {/* Right Column: Controls and Weather */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <section>
              <WeatherWidget />
            </section>

            {/* Intervention Controls */}
            <section>
              <InterventionControls />
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-muted-foreground border-t">
          <p>
            Digital Twin CO₂ Emission Platform © 2026 | Built with Clean Architecture & SOLID Principles
          </p>
        </footer>
      </main>
    </div>
  );
}
