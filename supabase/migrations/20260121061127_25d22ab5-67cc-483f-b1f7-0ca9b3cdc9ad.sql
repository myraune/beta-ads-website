-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid(),
  source TEXT DEFAULT 'website_popup',
  CONSTRAINT newsletter_subscribers_email_unique UNIQUE (email)
);

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers (email);

-- Create index on unsubscribe_token for unsubscribe lookups
CREATE INDEX idx_newsletter_subscribers_token ON public.newsletter_subscribers (unsubscribe_token);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow insert for signups (edge function uses service role, but this allows anon fallback)
CREATE POLICY "Allow newsletter signup insert"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow update for unsubscribe via token
CREATE POLICY "Allow unsubscribe update"
  ON public.newsletter_subscribers
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- No SELECT policy for public - only service role can read subscriber list
-- This protects email addresses from being exposed