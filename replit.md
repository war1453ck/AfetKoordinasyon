# Emergency Coordination System

## Overview

This is an emergency coordination dashboard system built with React, Express, TypeScript, and PostgreSQL. The application provides real-time monitoring and management capabilities for emergency response teams, featuring incident tracking, resource management, team coordination, and a map-based interface for visualizing active emergencies.

## System Architecture

### Architecture
- **Framework**: Laravel 10 with PHP 8.2 (Full-Stack)
- **Frontend**: Blade Templates with Tailwind CSS & Alpine.js
- **Database**: PostgreSQL with Eloquent ORM
- **Styling**: Tailwind CSS with emergency response theme
- **JavaScript**: Alpine.js for interactive components
- **Development Server**: Laravel Artisan serve on port 5000
- **Previous Stack**: React + Express.js (completely replaced)

### Project Structure
- `laravel-backend/` - Complete Laravel application
- `resources/views/` - Blade templates
- `app/Models/` - Eloquent models
- `app/Http/Controllers/` - Laravel controllers
- `database/migrations/` - Database migration files
- `routes/web.php` - Web routes

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
- June 24, 2025. Added PostgreSQL database integration with comprehensive data models
- June 24, 2025. Enhanced system with supplier mapping, earthquake monitoring, weather tracking, container management, and city management modules
- June 24, 2025. Migrated from in-memory storage to persistent PostgreSQL database with Drizzle ORM
- June 24, 2025. Added mobile user management system with location tracking and emergency alerts
- June 24, 2025. Enhanced sidebar navigation with collapsible design, search functionality, and keyboard shortcuts
- June 24, 2025. Redesigned professional sidebar with compact layout (320px → 256px width)
- June 24, 2025. Added Emergency Alerts Management system with mass notification capabilities
- June 24, 2025. Implemented Real-time Location Tracking with interactive map support
- June 24, 2025. Created comprehensive Analytics & Reports module with performance metrics
- June 24, 2025. **MAJOR MIGRATION**: Migrated backend from Express.js/TypeScript to Laravel/PHP
- June 24, 2025. Implemented Laravel API with Eloquent models for all core entities
- June 24, 2025. Maintained React frontend, updated API calls to Laravel endpoints
- June 24, 2025. **COMPLETE REBUILD**: Replaced React frontend with Laravel Blade templates
- June 24, 2025. Created full-stack Laravel application with Tailwind CSS and Alpine.js
- June 24, 2025. Implemented dashboard, incident management, and navigation system

## User Preferences

Preferred communication style: Simple, everyday language.