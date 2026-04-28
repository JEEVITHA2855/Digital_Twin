# Digital Twin CO₂ Emission Modeling and Simulation Platform

A full-stack digital twin platform for simulating, analyzing, and visualizing urban CO₂ emissions. The system models environmental impact across city zones and allows users to test intervention strategies with real-time analytics and geospatial visualization.

---

## Overview

This platform represents a virtual model of an urban environment where emissions can be monitored and controlled through simulation. It enables users to explore how factors such as traffic, energy usage, and environmental policies affect CO₂ emissions across different zones.

The system combines geospatial visualization, simulation logic, and real-time analytics to provide actionable insights for sustainable urban planning.

---

## Problem Statement

Urban emission management is complex due to:

* Distributed emission sources across different zones
* Lack of interactive tools for scenario simulation
* Difficulty in visualizing environmental impact
* Limited accessibility of real-time analytics

---

## Solution

This system provides a digital twin where:

* City zones are modeled and visualized on an interactive map
* Emissions are calculated using configurable simulation logic
* Environmental interventions can be applied dynamically
* Real-time analytics show the impact of changes
* Weather data influences emission dispersion

---

## Key Features

### Interactive Map

* Visual representation of city zones (industrial, residential, commercial, green)
* Emission heatmap with color-coded intensity
* Zone-level inspection

### Emission Simulation Engine

* Configurable emission factors
* Real-time recalculation
* Weather-influenced dispersion

### Environmental Interventions

* Tree plantation simulation
* Electric vehicle adoption
* Traffic reduction
* Carbon capture mechanisms
* Renewable energy usage

### Analytics Dashboard

* Total emission tracking
* Zone-level breakdown
* Sustainability scoring
* Historical trends

### Weather Integration

* Real-time weather data (OpenWeather API)
* Impact on emission dispersion

---

## Tech Stack

### Frontend

* React (TypeScript)
* Vite
* Tailwind CSS
* shadcn/ui
* Leaflet (maps)
* Recharts (data visualization)
* Zustand (state management)
* Axios

### Backend

* Node.js (TypeScript)
* Express
* REST API
* Dependency Injection pattern
* OpenWeather API integration

---

## System Architecture

```text
Client (React + TypeScript)
        ↓
API Layer (Axios)
        ↓
Express Routes
        ↓
Controllers
        ↓
Services (Simulation Logic)
        ↓
Repositories (Data Layer)
        ↓
External APIs / Data Sources
```

---

## Backend Design

The backend follows a layered architecture:

* **Controllers** — handle HTTP requests and validation
* **Services** — contain core simulation logic
* **Repositories** — abstract data access
* **Models** — define domain structures

This separation improves maintainability, scalability, and testability.

---

## Example Workflow

* User opens the map interface
* Selects a zone or applies an intervention
* System recalculates emissions
* Updated results are reflected in the dashboard
* Weather data influences dispersion results

---

## API Overview

### GET `/api/zones`

Retrieve all zones with emission data

### POST `/api/simulation/calculate`

Calculate emissions based on interventions

### GET `/api/weather/current`

Fetch real-time weather data

---

## Setup Instructions

### Prerequisites

* Node.js 18+
* npm

---

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Deployment

* Frontend: Vercel
* Backend: Render / Node hosting
* Environment variables required for API integration

---

## Engineering Highlights

* Designed a full-stack system using Clean Architecture principles
* Implemented modular backend with separation of concerns
* Built real-time simulation engine for emission modeling
* Integrated geospatial visualization using Leaflet
* Developed analytics dashboard with interactive charts
* Applied TypeScript for type safety across the stack

---

## Challenges

* Designing scalable simulation logic
* Integrating geospatial visualization with dynamic data
* Handling real-time updates efficiently
* Managing API communication between frontend and backend

---

## Future Improvements

* Machine learning–based emission prediction
* Multi-city simulation support
* Real-time sensor (IoT) integration
* Advanced scenario comparison
* User authentication and role management

---

## Resume Impact

Built a full-stack digital twin platform for urban CO₂ emission simulation using React, Node.js, and TypeScript, implementing clean architecture, geospatial visualization, and real-time analytics for environmental modeling.

---

## Notes

* Designed with scalability and extensibility in mind
* Backend architecture allows easy integration of real databases and services
* Frontend focuses on clear visualization and user interaction

---
