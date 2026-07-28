-- RLS Policies for GZ'ZONE tables
-- Allow public SELECT (read) access to all content tables
-- Allow authenticated users full CRUD access (for admin panel)

-- Treatments
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view treatments" ON treatments FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage treatments" ON treatments FOR ALL USING (auth.role() = 'authenticated');

-- Durations
ALTER TABLE durations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view durations" ON durations FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage durations" ON durations FOR ALL USING (auth.role() = 'authenticated');

-- FAQs
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');

-- Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');

-- Platform Ratings
ALTER TABLE platform_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view platform_ratings" ON platform_ratings FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage platform_ratings" ON platform_ratings FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Site Content
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- Gallery Images
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage gallery_images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');

-- Conversion Events
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert conversion_events" ON conversion_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can manage conversion_events" ON conversion_events FOR ALL USING (auth.role() = 'authenticated');

