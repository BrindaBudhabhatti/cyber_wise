-- supabase/schema.sql

-- This file defines the database schema for the CyberWise application.
-- You can run these commands in the Supabase SQL Editor to create the necessary tables.

-- 1. Table for "Solved Cases"
-- This table stores the details for the solved cases shown in the Case Gallery.

CREATE TABLE cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  "titleKey" text NOT NULL,
  year smallint NOT NULL,
  "summaryKey" text NOT NULL,
  "toolsUsed" text[] NOT NULL,
  "outcomeKey" text NOT NULL,
  tags text[] NOT NULL
);

-- 2. Table for "Victim Testimonials"
-- This table stores the stories and testimonials from victims.

CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  "aliasKey" text NOT NULL,
  "storyKey" text NOT NULL,
  "helpKey" text NOT NULL,
  "messageKey" text NOT NULL
);

-- After creating the tables, make sure to enable Row Level Security (RLS) for both,
-- but you do NOT need to create any policies. The service_role key we are using in the app
-- bypasses RLS rules, which is what we want for the admin panel.
