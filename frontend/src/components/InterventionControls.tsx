/**
 * Intervention Controls Component
 * Sliders for environmental interventions
 */

import { useEffect, useCallback } from 'react';
import { TreePine, Car, TrafficCone, Factory, Sun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Slider } from './ui/Slider';
import { Button } from './ui/Button';
import { useStore } from '@/store';
import { debounce } from '@/utils/helpers';

export function InterventionControls() {
  const { interventions, updateIntervention, runSimulation, resetInterventions, isLoading } =
    useStore();

  // Debounced simulation - runs 500ms after user stops moving slider
  const debouncedSimulation = useCallback(
    debounce(() => {
      runSimulation();
    }, 500),
    [runSimulation]
  );

  // Auto-run simulation when interventions change
  useEffect(() => {
    debouncedSimulation();
  }, [interventions, debouncedSimulation]);

  const handleSimulate = () => {
    runSimulation();
  };

  const handleReset = () => {
    resetInterventions();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environmental Interventions</CardTitle>
        <CardDescription>
          Adjust parameters to see their impact on emissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Slider
          label="Tree Planting"
          value={interventions.trees}
          min={0}
          max={10000}
          step={100}
          onChange={(value) => updateIntervention('trees', value)}
          unit="trees"
          icon={<TreePine className="w-4 h-4" />}
          description="Trees absorb CO₂ through photosynthesis"
        />

        <Slider
          label="EV Adoption"
          value={interventions.evAdoption}
          min={0}
          max={100}
          step={1}
          onChange={(value) => updateIntervention('evAdoption', value)}
          unit="%"
          icon={<Car className="w-4 h-4" />}
          description="Electric vehicles produce 70% less emissions"
        />

        <Slider
          label="Traffic Reduction"
          value={interventions.trafficReduction}
          min={0}
          max={100}
          step={1}
          onChange={(value) => updateIntervention('trafficReduction', value)}
          unit="%"
          icon={<TrafficCone className="w-4 h-4" />}
          description="Reduce overall vehicular traffic"
        />

        <Slider
          label="Carbon Capture Units"
          value={interventions.carbonCapture}
          min={0}
          max={100}
          step={1}
          onChange={(value) => updateIntervention('carbonCapture', value)}
          unit="units"
          icon={<Factory className="w-4 h-4" />}
          description="Industrial carbon capture technology"
        />

        <Slider
          label="Renewable Energy"
          value={interventions.renewableEnergy}
          min={0}
          max={100}
          step={1}
          onChange={(value) => updateIntervention('renewableEnergy', value)}
          unit="%"
          icon={<Sun className="w-4 h-4" />}
          description="Solar, wind, and other renewable sources"
        />

        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleSimulate}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Calculating...' : 'Recalculate Now'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={isLoading}
          >
            Reset All
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-center text-muted-foreground">
          💡 Changes auto-update after you stop moving sliders
        </div>
      </CardContent>
    </Card>
  );
}
