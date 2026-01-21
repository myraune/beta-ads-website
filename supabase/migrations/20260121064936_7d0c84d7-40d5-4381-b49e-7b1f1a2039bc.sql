-- Add explicit SELECT policy that denies all public access
-- Since we use restrictive policies, we need a permissive policy that grants NO access
-- This ensures no one can read subscriber data
CREATE POLICY "Deny public select access" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (false);

-- Add explicit DELETE policy that denies all public access
-- This ensures no one can delete subscriber records
CREATE POLICY "Deny public delete access" 
ON public.newsletter_subscribers 
FOR DELETE 
USING (false);