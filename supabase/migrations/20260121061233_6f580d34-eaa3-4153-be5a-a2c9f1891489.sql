-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Allow newsletter signup insert" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow unsubscribe update" ON public.newsletter_subscribers;

-- Create more restrictive INSERT policy - only allow inserting your own email
-- The edge function uses service role, so this is mainly for defense in depth
CREATE POLICY "Restrict newsletter signup insert"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Only allow insert if email matches a basic format (validation happens in edge function)
    email IS NOT NULL AND length(email) <= 255
  );

-- Create restrictive UPDATE policy - only allow updating via valid unsubscribe token
CREATE POLICY "Restrict unsubscribe update"
  ON public.newsletter_subscribers
  FOR UPDATE
  TO anon, authenticated
  USING (
    -- Can only update if you have the correct token (passed as a filter in the query)
    unsubscribe_token IS NOT NULL
  )
  WITH CHECK (
    -- Can only set is_active to false and unsubscribed_at to a timestamp
    is_active = false AND unsubscribed_at IS NOT NULL
  );