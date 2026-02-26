-- Migration: Add youtube_resources to nodes table

ALTER TABLE nodes 
ADD COLUMN IF NOT EXISTS youtube_resources JSONB DEFAULT '[]'::jsonb;

-- Comment for documentation
COMMENT ON COLUMN nodes.youtube_resources IS 'Structured list of YouTube video objects {title, channel, url, type}';
