/**
 * Statistics Dashboard Component
 * Displays key metrics and KPIs
 */

import { TrendingDown, TrendingUp, Activity, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { SimulationResult } from '@/types';
import { formatNumber } from '@/utils/helpers';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  description?: string;
}

function StatCard({ title, value, icon, trend, trendValue, description }: StatCardProps) {
  const trendIcon = trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null;
  const trendColor = trend === 'down' ? 'text-green-500' : trend === 'up' ? 'text-red-500' : 'text-gray-500';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trendValue && (
          <div className={`flex items-center gap-1 text-xs mt-1 ${trendColor}`}>
            {trendIcon}
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsDashboardProps {
  result: SimulationResult | null;
}

export function StatsDashboard({ result }: StatsDashboardProps) {
  if (!result) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Emissions"
        value={`${formatNumber(result.totalEmissions, 2)} kg/day`}
        icon={<Activity className="h-4 w-4" />}
        trend={result.emissionReduction > 0 ? 'down' : 'up'}
        trendValue={`${formatNumber(Math.abs(result.emissionReductionPercentage), 1)}%`}
        description="Current daily CO₂ output"
      />

      <StatCard
        title="Emission Reduction"
        value={`${formatNumber(result.emissionReduction, 2)} kg/day`}
        icon={<TrendingDown className="h-4 w-4" />}
        trend="down"
        trendValue={`${formatNumber(result.emissionReductionPercentage, 1)}% vs baseline`}
        description="Saved through interventions"
      />

      <StatCard
        title="Sustainability Score"
        value={result.sustainabilityScore}
        icon={<Award className="h-4 w-4" />}
        description="Overall environmental rating"
      />

      <StatCard
        title="Baseline Emissions"
        value={`${formatNumber(result.baselineEmissions, 2)} kg/day`}
        icon={<Activity className="h-4 w-4" />}
        description="Without interventions"
      />
    </div>
  );
}
