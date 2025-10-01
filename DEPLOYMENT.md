# Deployment Guide for Siwaht AI Agency

This guide will help you deploy your Siwaht AI Agency application to production.

## Prerequisites

- A Supabase account with a project created
- A hosting platform account (Railway, Render, Fly.io, etc.)
- Git repository connected to your hosting platform

## Database Setup

The database schema has been created in your Supabase project. It includes tables for:
- Contact submissions
- Demo videos
- Avatars
- Voice samples
- Edited videos
- Podcast samples

All tables have Row Level Security (RLS) enabled with appropriate policies for public read access to published content.

## Environment Variables

Set the following environment variables in your hosting platform:

### Required Variables

```
NODE_ENV=production
PORT=5000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your_jwt_secret_minimum_32_chars
```

### How to Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Click on "Settings" → "API"
3. Copy the "URL" value for `VITE_SUPABASE_URL`
4. Copy the "anon public" key for `VITE_SUPABASE_ANON_KEY`

### Generate JWT Secret

Run this command to generate a secure JWT secret:
```bash
openssl rand -base64 32
```

## Deployment Options

### Option 1: Deploy to Railway

1. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Create a new project:
   ```bash
   railway init
   ```

4. Add environment variables:
   ```bash
   railway variables set VITE_SUPABASE_URL=your_url
   railway variables set VITE_SUPABASE_ANON_KEY=your_key
   railway variables set ADMIN_USERNAME=your_username
   railway variables set ADMIN_PASSWORD=your_password
   railway variables set JWT_SECRET=your_jwt_secret
   ```

5. Deploy:
   ```bash
   railway up
   ```

6. Get your deployment URL:
   ```bash
   railway domain
   ```

### Option 2: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)

2. Click "New +" → "Web Service"

3. Connect your Git repository

4. Configure the service:
   - **Name**: siwaht-ai-agency
   - **Environment**: Docker
   - **Region**: Choose closest to your users
   - **Branch**: main

5. Add environment variables in the Render dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`

6. Click "Create Web Service"

### Option 3: Deploy to Fly.io

1. Install Fly CLI:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. Login to Fly:
   ```bash
   fly auth login
   ```

3. Create a new app:
   ```bash
   fly launch
   ```

4. Set environment variables:
   ```bash
   fly secrets set VITE_SUPABASE_URL=your_url
   fly secrets set VITE_SUPABASE_ANON_KEY=your_key
   fly secrets set ADMIN_USERNAME=your_username
   fly secrets set ADMIN_PASSWORD=your_password
   fly secrets set JWT_SECRET=your_jwt_secret
   ```

5. Deploy:
   ```bash
   fly deploy
   ```

## Post-Deployment Steps

### 1. Test Your Deployment

Visit your deployed URL and verify:
- [ ] Homepage loads correctly
- [ ] All service sections display properly
- [ ] Contact form submission works
- [ ] Admin login works at `/admin`
- [ ] Admin dashboard displays at `/admin/dashboard`

### 2. Configure Custom Domain (Optional)

#### Railway
```bash
railway domain add yourdomain.com
```
Then add a CNAME record in your DNS settings pointing to the Railway domain.

#### Render
1. Go to your service dashboard
2. Click "Settings" → "Custom Domain"
3. Add your domain and follow DNS instructions

#### Fly.io
```bash
fly certs add yourdomain.com
```
Then add an A record pointing to the Fly.io IP address.

### 3. Set Up Monitoring

Consider adding:
- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Analytics (Google Analytics, Plausible)

### 4. Upload Media Files

If you have videos and audio files:

1. **Option A: Host on CDN**
   - Upload files to Cloudflare R2, AWS S3, or similar
   - Update database records with CDN URLs

2. **Option B: Use Supabase Storage**
   - Upload files to Supabase Storage buckets
   - Configure public access
   - Update database records with Supabase Storage URLs

### 5. Populate Sample Data

Add sample content to your database:
- Demo videos
- Avatar showcases
- Voice samples
- Edited video examples
- Podcast samples

You can do this via:
- Supabase dashboard (Table Editor)
- Admin API endpoints (create admin endpoints for CRUD operations)
- SQL queries in Supabase SQL Editor

## Security Checklist

- [ ] Strong admin password set
- [ ] JWT secret is random and at least 32 characters
- [ ] Environment variables are set in hosting platform (not in code)
- [ ] HTTPS is enabled (usually automatic with hosting platforms)
- [ ] RLS policies are enabled on all database tables
- [ ] Admin routes require authentication

## Troubleshooting

### Build Fails

Check that:
- All dependencies are in package.json
- Node version is 20.x
- Build command completes successfully locally

### Database Connection Issues

Verify:
- Supabase URL and anon key are correct
- Supabase project is active
- Database tables exist

### Admin Login Not Working

Check:
- ADMIN_USERNAME and ADMIN_PASSWORD environment variables are set
- JWT_SECRET is set and at least 32 characters
- Cookies are enabled in browser

### 404 Errors

Ensure:
- Frontend routes are configured correctly in App.tsx
- Server is serving static files from dist/public
- Build completed successfully

## Support

For issues specific to:
- **Hosting**: Check platform-specific documentation
- **Database**: See Supabase documentation
- **Application**: Check server logs via hosting platform

## Performance Optimization Tips

1. **Enable CDN**: Use Cloudflare or similar for static assets
2. **Image Optimization**: Compress images before upload
3. **Video Optimization**: Use appropriate formats and compression
4. **Database Indexes**: Already configured in migration
5. **Caching**: Implement cache headers for media files

## Scaling

As your application grows:
- Upgrade hosting plan for more resources
- Consider database connection pooling
- Use CDN for all media assets
- Add Redis for caching if needed
- Monitor application performance metrics
