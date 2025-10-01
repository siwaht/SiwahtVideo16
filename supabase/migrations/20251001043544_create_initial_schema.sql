/*
  # Create Initial Database Schema for Siwaht AI Agency

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `project_details` (text, required)
      - `status` (text, default 'new')
      - `admin_notes` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `demo_videos`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `category` (text, required)
      - `video_url` (text, required)
      - `thumbnail_url` (text, optional)
      - `is_hosted_video` (boolean, default true)
      - `is_published` (boolean, default true)
      - `order_index` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `avatars`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, optional)
      - `video_url` (text, optional)
      - `thumbnail_url` (text, optional)
      - `gender` (text, required)
      - `ethnicity` (text, optional)
      - `age_range` (text, optional)
      - `voice_preview` (text, optional)
      - `is_published` (boolean, default true)
      - `order_index` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `voice_samples`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, optional)
      - `audio_url` (text, required)
      - `language` (text, required)
      - `gender` (text, required)
      - `accent` (text, optional)
      - `age_range` (text, optional)
      - `is_published` (boolean, default true)
      - `order_index` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `edited_videos`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `video_url` (text, required)
      - `thumbnail_url` (text, optional)
      - `is_hosted_video` (boolean, default true)
      - `client_name` (text, optional)
      - `category` (text, required)
      - `tags` (text, optional)
      - `is_published` (boolean, default true)
      - `order_index` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `podcast_samples`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `audio_url` (text, required)
      - `category` (text, required)
      - `duration` (text, optional)
      - `host_name` (text, optional)
      - `guest_name` (text, optional)
      - `is_published` (boolean, default true)
      - `order_index` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for published content
    - Admin-only write access (no auth system, controlled via API)
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  company text,
  project_details text NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  admin_notes text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create demo_videos table
CREATE TABLE IF NOT EXISTS demo_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  video_url text NOT NULL,
  thumbnail_url text,
  is_hosted_video boolean DEFAULT true NOT NULL,
  is_published boolean DEFAULT true NOT NULL,
  order_index integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create avatars table
CREATE TABLE IF NOT EXISTS avatars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  video_url text,
  thumbnail_url text,
  gender text NOT NULL,
  ethnicity text,
  age_range text,
  voice_preview text,
  is_published boolean DEFAULT true NOT NULL,
  order_index integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create voice_samples table
CREATE TABLE IF NOT EXISTS voice_samples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  audio_url text NOT NULL,
  language text NOT NULL,
  gender text NOT NULL,
  accent text,
  age_range text,
  is_published boolean DEFAULT true NOT NULL,
  order_index integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create edited_videos table
CREATE TABLE IF NOT EXISTS edited_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  is_hosted_video boolean DEFAULT true NOT NULL,
  client_name text,
  category text NOT NULL,
  tags text,
  is_published boolean DEFAULT true NOT NULL,
  order_index integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create podcast_samples table
CREATE TABLE IF NOT EXISTS podcast_samples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  audio_url text NOT NULL,
  category text NOT NULL,
  duration text,
  host_name text,
  guest_name text,
  is_published boolean DEFAULT true NOT NULL,
  order_index integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE edited_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_samples ENABLE ROW LEVEL SECURITY;

-- Policies for contact_submissions (insert only, no public read)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policies for demo_videos (public read for published content)
CREATE POLICY "Public can view published demo videos"
  ON demo_videos
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Policies for avatars (public read for published content)
CREATE POLICY "Public can view published avatars"
  ON avatars
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Policies for voice_samples (public read for published content)
CREATE POLICY "Public can view published voice samples"
  ON voice_samples
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Policies for edited_videos (public read for published content)
CREATE POLICY "Public can view published edited videos"
  ON edited_videos
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Policies for podcast_samples (public read for published content)
CREATE POLICY "Public can view published podcast samples"
  ON podcast_samples
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_demo_videos_published ON demo_videos(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_avatars_published ON avatars(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_voice_samples_published ON voice_samples(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_edited_videos_published ON edited_videos(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_podcast_samples_published ON podcast_samples(is_published, order_index);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status, created_at DESC);