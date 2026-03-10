/**
 * Emission Charts Component
 * Visualizes emission data using charts
 */

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { SimulationResult } from '@/types';
import { formatNumber, getZoneTypeColor } from '@/utils/helpers';

interface EmissionChartsProps {
  result: SimulationResult | null;
}

export function EmissionCharts({ result }: EmissionChartsProps) {
  if (!result) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare zone emissions data
  const zoneData = result.zones.map((zone) => ({
    name: zone.name,
    emissions: parseFloat(zone.currentEmissions.toFixed(2)),
    type: zone.type,
  }));

  // Prepare emission breakdown data
  const breakdownData = [
    { name: 'Vehicular', value: result.breakdown.vehicular, color: '#3b82f6' },
    { name: 'Industrial', value: result.breakdown.industrial, color: '#8b5cf6' },
    { name: 'Residential', value: result.breakdown.residential, color: '#f59e0b' },
  ];

  // Prepare intervention impact data
  const interventionData = [
    { name: 'Tree Absorption', value: result.breakdown.treeAbsorption, color: '#10b981' },
    { name: 'Carbon Capture', value: result.breakdown.carbonCapture, color: '#06b6d4' },
    { name: 'Renewable Energy', value: result.breakdown.renewableEnergy, color: '#f59e0b' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Zone Emissions Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Emissions by Zone</CardTitle>
          <CardDescription>CO₂ output across city zones</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={zoneData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                className="text-xs"
              />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => `${formatNumber(value, 2)} kg/day`}
              />
              <Legend />
              <Bar
                dataKey="emissions"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Emission Breakdown Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Emission Sources</CardTitle>
          <CardDescription>Distribution of CO₂ by source</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => `${formatNumber(value, 2)} kg/day`}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Intervention Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Intervention Impact</CardTitle>
          <CardDescription>CO₂ reduction from interventions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interventionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" className="text-xs" />
              <YAxis dataKey="name" type="category" className="text-xs" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => `${formatNumber(value, 2)} kg/day`}
              />
              <Legend />
              <Bar dataKey="value" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Emission Summary</CardTitle>
          <CardDescription>Key metrics overview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Emissions</span>
              <span className="text-lg font-bold text-primary">
                {formatNumber(result.totalEmissions, 2)} kg/day
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${(result.totalEmissions / result.baselineEmissions) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Emission Reduction</span>
              <span className="text-lg font-bold text-green-500">
                -{formatNumber(result.emissionReduction, 2)} kg/day
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width: `${result.emissionReductionPercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Sustainability Score</span>
              <span className="text-2xl font-bold">
                {result.sustainabilityScore}/100
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${result.sustainabilityScore}%`,
                  background: `linear-gradient(to right, #ef4444, #f59e0b, #10b981)`,
                }}
              />
            </div>
          </div>

          <div className="pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Zones</span>
              <span className="font-medium">{result.zones.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">High Emission Zones</span>
              <span className="font-medium text-red-500">
                {result.zones.filter((z) => z.emissionLevel === 'high').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Low Emission Zones</span>
              <span className="font-medium text-green-500">
                {result.zones.filter((z) => z.emissionLevel === 'low').length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
