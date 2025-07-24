
CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titleKey TEXT NOT NULL,
    year INTEGER NOT NULL,
    summaryKey TEXT NOT NULL,
    toolsUsed TEXT[] NOT NULL,
    outcomeKey TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aliasKey TEXT NOT NULL,
    storyKey TEXT NOT NULL,
    helpKey TEXT NOT NULL,
    messageKey TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add a table for CyberWise Kids stories
CREATE TABLE kid_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_key TEXT NOT NULL,
    description_key TEXT NOT NULL,
    content_key TEXT NOT NULL,
    age_group TEXT NOT NULL,
    topic TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
