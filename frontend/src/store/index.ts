/**
 * Zustand Store
 * Global state management for the application
 */

import { create } from 'zustand';
import { Zone, SimulationResult, Weather, Interventions } from '@/types';
import { apiService } from '@/services/api';

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Data
  zones: Zone[];
  simulationResult: SimulationResult | null;
  weather: Weather | null;
  interventions: Interventions;

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  setInterventions: (interventions: Interventions) => void;
  updateIntervention: (key: keyof Interventions, value: number) => void;
  fetchZones: () => Promise<void>;
  fetchWeather: () => Promise<void>;
  runSimulation: () => Promise<void>;
  resetInterventions: () => void;
}

const defaultInterventions: Interventions = {
  trees: 0,
  evAdoption: 0,
  trafficReduction: 0,
  carbonCapture: 0,
  renewableEnergy: 0,
};

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  theme: 'light',
  zones: [],
  simulationResult: null,
  weather: null,
  interventions: { ...defaultInterventions },
  isLoading: false,
  error: null,

  // Theme toggle
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  },

  // Set all interventions at once
  setInterventions: (interventions: Interventions) => {
    set({ interventions });
  },

  // Update a single intervention
  updateIntervention: (key: keyof Interventions, value: number) => {
    set((state) => ({
      interventions: {
        ...state.interventions,
        [key]: value,
      },
    }));
  },

  // Fetch zones
  fetchZones: async () => {
    try {
      set({ isLoading: true, error: null });
      const zones = await apiService.getZones();
      set({ zones, isLoading: false });
    } catch (error) {
      set({
        error: 'Failed to fetch zones',
        isLoading: false,
      });
      console.error('Error fetching zones:', error);
    }
  },

  // Fetch weather
  fetchWeather: async () => {
    try {
      const { weather } = await apiService.getCurrentWeather();
      set({ weather });
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  },

  // Run simulation
  runSimulation: async () => {
    try {
      set({ isLoading: true, error: null });
      const result = await apiService.calculateSimulation(get().interventions);
      set({
        simulationResult: result,
        zones: result.zones,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: 'Failed to run simulation',
        isLoading: false,
      });
      console.error('Error running simulation:', error);
    }
  },

  // Reset interventions to default
  resetInterventions: () => {
    set({ interventions: { ...defaultInterventions } });
    get().runSimulation();
  },
}));
