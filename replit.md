# Overview

Siwaht is a comprehensive web application for AI-powered video and audio content creation. The platform offers AI video ad creation, realistic avatar generation, voice synthesis, professional video editing, and podcast production capabilities. Built as a full-stack TypeScript application with React frontend and Express backend, it provides a responsive landing page with detailed service showcases and a contact form for lead generation.

## Recent Changes (January 2025)

- **Mobile-First Responsive Design**: Comprehensive refactor with mobile responsiveness targeting 320px, 768px, 1024px, 1440px breakpoints
- **Component Architecture**: Modular service components with proper semantic HTML structure and ARIA accessibility
- **Enhanced UX**: Interactive service previews, smooth scrolling navigation, and touch-friendly mobile interface
- **SEO Optimization**: Semantic HTML structure, meta tags, Open Graph integration, and performance optimizations
- **Design System**: Consistent color schemes, typography, and spacing using Tailwind CSS with shadcn/ui components
- **Admin Panel Fixes**: Fixed Create Video button functionality by adding required category field validation
- **Navigation Fix**: Resolved "Back to Site" button in admin layout with proper window.location navigation
- **Content Display**: Fixed frontend service components to display newly added admin content with fresh data fetching
- **Database Issues Fixed (August 2025)**: Resolved Neon database authentication failures by creating new PostgreSQL database and running migrations
- **Admin Credentials Setup**: Created admin user with username "admin" and password "admin123" for system access
- **Video Content Addition (August 2025)**: Added showcase videos across multiple sections
  - IKEA Demo: Professional furniture showcase video in Video Ads section
  - Artisan Baker Avatar: Professional artisan baker demonstrating craftsmanship in Avatars section
  - Dairy Farmer Documentary: Cinematic documentary-style video in Video Editing section
  - All videos stored locally and accessible via /videos/ route
- **Admin Panel Removal (August 2025)**: Complete removal of admin panel and authentication system
  - Simplified architecture focusing on public-facing content only
  - Removed all admin-related routes, components, and database schemas
  - Streamlined storage interface without admin management functionality
  - Clean codebase with only essential public API endpoints
  - Focus on agency presentation rather than content management
- **Mobile Optimization & Performance Enhancement (August 2025)**: Comprehensive mobile-first optimization
  - Removed custom 'xs' breakpoint from Tailwind config to use standard breakpoints only
  - Streamlined CSS by removing redundant mobile styles and unnecessary code
  - Optimized responsive classes across all components (hero, navigation, service sections)
  - Implemented consistent container-custom utility for responsive padding
  - Enhanced mobile touch interactions and simplified breakpoint structure
  - Improved site performance through code cleanup and reduced bundle size
- **Agency Positioning Update (August 2025)**: Transformed messaging to reflect Siwaht as a professional service provider
  - Updated hero section: "Your Vision, Our AI Expertise" emphasizing professional partnership
  - Changed call-to-action buttons from self-service ("Create", "Generate") to service-oriented ("Get Quote", "Order Services", "Start Your Project")
  - Revised feature descriptions to use agency language ("We create", "Our team designs", "We deliver")
  - Updated navigation and contact messaging to reflect consultation and custom services
  - Modified page metadata to position as "Professional AI Video & Audio Creation Agency"
- **Code Cleanup & Redundancy Removal (August 2025)**: Complete elimination of disconnected and admin-related code
  - Removed all admin panel references from service component placeholder text
  - Cleaned up orphaned imports and authentication-related code remnants
  - Streamlined queryClient to remove admin token handling
  - Fixed all LSP errors and schema mismatches in storage implementation
  - Eliminated redundant files, broken imports, and unused dependencies
  - Optimized codebase for agency-focused public presentation only
- **Content Enhancement & Media Integration (August 2025)**: Added professional content samples with proper media serving
  - Fixed static video file serving with proper MIME types and byte-range support for GIF-like autoplay
  - Added new IKEA demo video playing as seamless looping GIF in Video Ads section
  - Integrated podcast episodes with mini audio players in Podcast Production section
  - Added "Context is King: Engineering the Brains, and Nightmares, of AI Agents" (technology category)
  - Added "Fasten Your Nightmares" comedy episode about flight experiences
  - Configured proper audio file serving for MP3 content with HTML5 audio controls
  - Enhanced user experience with professional content showcases across all service sections
- **Multilingual Voice Ads Implementation (August 2025)**: Transformed Voice Synthesis into professional agency showcase
  - Changed section title to "Your Brand's Voice, Understood Everywhere" emphasizing global reach
  - Updated messaging to focus on professional voice ad creation rather than text-to-speech tools
  - Added three authentic multilingual voice ad samples: English, Chinese (中文), and Arabic (عربي)
  - Implemented native language titles and descriptions for each voice ad sample
  - Added AAC audio format support to server for Arabic voice ads
  - Standardized HTML5 audio players matching podcast section design for consistency
  - All voice ads successfully tested with proper audio playback across languages

# User Preferences

Preferred communication style: Simple, everyday language.
Brand name: "Siwaht" (not "SiwahtAI")
Business model: Professional AI agency providing custom video, avatar, and audio services (not a self-service tool)

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