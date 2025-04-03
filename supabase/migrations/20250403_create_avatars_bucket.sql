
-- Create a storage bucket for avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
);

-- Allow public read access to all files in the avatars bucket
CREATE POLICY "Public Access"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatars');

-- Allow authenticated users to upload files to the avatars bucket
CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

-- Allow users to update their own avatar files
CREATE POLICY "Users can update their own avatars"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

-- Allow users to delete their own avatar files
CREATE POLICY "Users can delete their own avatars"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );
