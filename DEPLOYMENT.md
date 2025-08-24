# Deployment Guide

This project can be deployed on various platforms including Bolt.new, Vercel, Netlify, or any Node.js hosting service.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (optional, for data persistence)

## Quick Start

1. **Clone/Fork the repository**

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values with your configuration

4. **Run in development:**
```bash
npm run dev
```
   The app will be available at http://localhost:5000

5. **Build for production:**
```bash
npm run build
npm start
```

## Platform-Specific Instructions

### Bolt.new
1. Simply paste the GitHub repository URL
2. Bolt will automatically detect the project structure
3. Set environment variables in the Bolt dashboard
4. Deploy with one click

### Vercel
1. Import the project from GitHub
2. Set environment variables in Vercel dashboard
3. Deploy (Vercel will auto-detect the configuration)

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist/public`
4. Add environment variables in Netlify dashboard

### Traditional VPS/Cloud Server
1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start with PM2 or similar: `pm2 start dist/index.js`

## Environment Variables

Required variables:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret for JWT tokens
- `ADMIN_USERNAME` - Admin dashboard username
- `ADMIN_PASSWORD` - Admin dashboard password

Optional:
- `DATABASE_URL` - PostgreSQL connection string
- Various API keys if using external services

## File Structure

- `/client` - React frontend application
- `/server` - Express backend server
- `/shared` - Shared TypeScript types and schemas
- `/public` - Static assets (videos, audio, images)

## Features

- ✅ Responsive React frontend with Tailwind CSS
- ✅ Express backend with TypeScript
- ✅ Admin dashboard for content management
- ✅ Media upload and compression
- ✅ SEO optimized
- ✅ Mobile responsive

## Notes

- The project uses Vite for development and building
- Media files are stored locally in `/public/uploads`
- For production, consider using cloud storage (AWS S3, etc.)
- The admin dashboard is at `/admin` route

## Support

For issues or questions, please check the repository's issues section.