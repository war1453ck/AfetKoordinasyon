# Emergency Coordination System

## Overview

This is an emergency coordination dashboard system built with React, Express, TypeScript, and PostgreSQL. The application provides real-time monitoring and management capabilities for emergency response teams, featuring incident tracking, resource management, team coordination, and a map-based interface for visualizing active emergencies.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom emergency theme colors
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API**: RESTful endpoints for dashboard stats, incidents, resources, and teams
- **Development Server**: Custom Vite integration for full-stack development

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript types and database schema
- `migrations/` - Database migration files

## Key Components

### Database Schema
- **Users**: Authentication and role-based access
- **Incidents**: Emergency incident tracking with location, priority, and status
- **Resources**: Emergency response vehicles and equipment management
- **Teams**: Personnel and team coordination

### Frontend Components
- **Dashboard**: Main dashboard with stats cards, map view, and incident management
- **Map View**: Interactive map showing incident locations with priority-based markers
- **Active Incidents**: Real-time incident list with priority filtering
- **Resource Management**: Vehicle and equipment status tracking
- **Team Coordination**: Personnel assignment and status monitoring
- **Emergency Report Modal**: Form for creating new incident reports

### API Endpoints
- `/api/dashboard/stats` - Dashboard statistics and metrics
- `/api/incidents` - Incident CRUD operations
- `/api/incidents/active` - Active incidents filtering
- `/api/resources` - Resource management
- `/api/teams` - Team coordination

## Data Flow

1. **Real-time Updates**: Frontend polls API endpoints every 10-30 seconds for live data
2. **Incident Creation**: Emergency reports flow through form validation, API processing, and database storage
3. **Resource Allocation**: Resources are tracked and assigned to incidents through the dashboard
4. **Team Coordination**: Personnel status and assignments are managed through the team interface

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- TanStack Query for data fetching and caching
- Wouter for routing
- Zod for schema validation

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Lucide React for icons
- Date-fns for date formatting

### Backend Dependencies
- Express.js for server framework
- Drizzle ORM for database operations
- Neon Database serverless driver
- Zod for API validation

### Development Tools
- TypeScript for type safety
- Vite for build tooling
- ESBuild for production bundling
- PostCSS for CSS processing

## Deployment Strategy

### Development Environment
- Replit-optimized configuration with hot reloading
- Integrated PostgreSQL database provisioning
- Vite development server with Express API proxy

### Production Build
- Frontend: Vite builds to static assets in `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations handle schema deployment

### Environment Configuration
- `NODE_ENV` for environment detection
- `DATABASE_URL` for PostgreSQL connection
- Replit-specific modules and plugins for deployment

## Changelog

- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.