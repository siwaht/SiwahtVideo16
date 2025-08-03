# Overview

SiwahtAI is a comprehensive web application for AI-powered video and audio content creation. The platform offers AI video ad creation, realistic avatar generation, voice synthesis, professional video editing, and podcast production capabilities. Built as a full-stack TypeScript application with React frontend and Express backend, it provides a responsive landing page with detailed service showcases and a contact form for lead generation.

## Recent Changes (January 2025)

- **Mobile-First Responsive Design**: Comprehensive refactor with mobile responsiveness targeting 320px, 768px, 1024px, 1440px breakpoints
- **Component Architecture**: Modular service components with proper semantic HTML structure and ARIA accessibility
- **Enhanced UX**: Interactive service previews, smooth scrolling navigation, and touch-friendly mobile interface
- **SEO Optimization**: Semantic HTML structure, meta tags, Open Graph integration, and performance optimizations
- **Design System**: Consistent color schemes, typography, and spacing using Tailwind CSS with shadcn/ui components

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Styling**: Tailwind CSS with shadcn/ui component library using Radix UI primitives
- **State Management**: TanStack React Query for server state and forms with React Hook Form
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with custom configuration for development and production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with JSON communication
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware with structured error responses

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Production Storage**: Neon serverless PostgreSQL for production deployment

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Connect-pg-simple configured for PostgreSQL session storage (prepared for future implementation)
- **Security**: Basic security headers and CORS configuration

## API Structure
- **Contact Form**: POST /api/contact for form submissions with Zod validation
- **Admin Endpoints**: GET /api/contact for retrieving submissions
- **Validation**: Zod schemas for request/response validation with error handling
- **Response Format**: Consistent JSON responses with success/error status

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod resolvers
- **Backend**: Express.js with TypeScript support via tsx
- **Database**: Drizzle ORM with PostgreSQL dialect and Neon serverless driver
- **Build Tools**: Vite with React plugin and TypeScript compilation

## UI and Design System
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority for component variants

## Development and Quality
- **Type Safety**: TypeScript with strict configuration
- **Validation**: Zod for runtime type validation and schema generation
- **Development**: Replit-specific plugins for development environment
- **Query Management**: TanStack React Query for server state management

## Utility Libraries
- **Date Handling**: date-fns for date manipulation
- **Styling Utilities**: clsx and tailwind-merge for conditional styling
- **Carousel**: Embla Carousel for interactive components
- **Command Interface**: cmdk for command palette functionality