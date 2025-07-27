# Adaptive Edge Website

## Overview

This is a modern, full-stack web application for Adaptive Edge, a strategy and innovation consultancy. The application is built using a monorepo structure with a React frontend, Express.js backend, and PostgreSQL database using Drizzle ORM. It features a clean, minimal design with coral/navy branding, subtle animations, and asymmetric image styling that reflects the company's collaborative, forward-thinking, and AI-native approach.

## Recent Changes

- **January 27, 2025**: Implemented playful cursor interaction with bird-like movement
- **January 27, 2025**: Enhanced murmuration animation with true emergent flocking behavior
- **January 27, 2025**: Added GitHub-ready documentation and project structure
- **January 27, 2025**: Fixed CSS import order and restored vibrant coral/navy brand colors
- **January 27, 2025**: Added asymmetric image styling with non-curved corners for visual interest
- **January 27, 2025**: Applied asymmetric styling to profile and case study images

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Structure
- **Components**: Modular React components with shadcn/ui integration
- **Pages**: Single-page application with home and 404 pages
- **Styling**: Tailwind CSS with custom brand colors (coral and navy theme)
- **Animation**: Framer Motion for smooth, engaging interactions including:
  - Hero murmuration with emergent flocking behavior (40 particles)
  - Interactive cursor birds that follow mouse movement
  - Hover effects and micro-interactions throughout
- **Forms**: React Hook Form with Zod validation

### Backend Structure
- **API Routes**: RESTful endpoints for contact form submissions
- **Storage**: Flexible storage interface with in-memory implementation (ready for database upgrade)
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Logging**: Request/response logging for API endpoints

### Shared Components
- **Schema**: Drizzle schema definitions for users and contacts tables
- **Types**: TypeScript type definitions shared between client and server
- **Validation**: Zod schemas for runtime type validation

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on frontend
   - Form data validated using Zod schema
   - POST request sent to `/api/contact` endpoint
   - Server validates and stores contact information
   - Success/error feedback displayed to user

2. **Contact Management**:
   - Admin endpoint available at `/api/contacts` for retrieving all contacts
   - In-memory storage currently used (ready for PostgreSQL upgrade)

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18 with TypeScript support
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Animation**: Framer Motion for smooth interactions
- **HTTP Client**: Fetch API with TanStack Query for caching
- **Form Handling**: React Hook Form with Hookform Resolvers

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript
- **Database**: Neon Database (PostgreSQL) with Drizzle ORM
- **Validation**: Zod for runtime type checking
- **Session Management**: Connect-pg-simple for PostgreSQL sessions

### Development Tools
- **Build Tool**: Vite with React plugin
- **TypeScript**: Full TypeScript support across the stack
- **CSS Framework**: Tailwind CSS with PostCSS
- **Database Migration**: Drizzle Kit for schema management

## Deployment Strategy

The application is configured for deployment with the following approach:

1. **Build Process**:
   - Frontend built using Vite (outputs to `dist/public`)
   - Backend compiled using esbuild (outputs to `dist`)
   - Single build command handles both client and server

2. **Environment Configuration**:
   - Database URL required via `DATABASE_URL` environment variable
   - Development and production environments supported
   - Replit-specific plugins for development experience

3. **Database Setup**:
   - Drizzle configured for PostgreSQL dialect
   - Migration files stored in `./migrations` directory
   - Schema defined in `./shared/schema.ts`

4. **Static Asset Serving**:
   - Vite handles static assets in development
   - Express serves built assets in production
   - Replit development banner integration

The application is designed to be easily deployable on platforms like Replit, with automatic database provisioning and environment variable management. The modular architecture allows for easy scaling and maintenance as the consultancy grows.