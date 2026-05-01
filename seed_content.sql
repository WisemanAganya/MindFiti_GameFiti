-- Seed Data for Project MindStrong
-- Run this to populate the database with initial content so it can be managed by Admin.

-- 1. Services
INSERT INTO services (title, description, img_src, icon)
SELECT 'Consultation', 'One-on-one mental performance consultations for athletes and coaches.', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', 'fa-comments'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Consultation');

INSERT INTO services (title, description, img_src, icon)
SELECT 'Workshops', 'Group workshops on mental resilience and concussion awareness.', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80', 'fa-users'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Workshops');

INSERT INTO services (title, description, img_src, icon)
SELECT 'E-learning', 'Online courses and resources for athletes and support staff.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80', 'fa-laptop'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'E-learning');


-- 2. Merchandise
INSERT INTO merchandise (title, description, price, currency, sizes, images, sku)
SELECT 'Mindstrong Classic T-Shirt', 'A comfortable, ethically sourced tee featuring our logo. Soft cotton blend, available in multiple sizes.', 24.99, 'USD', '["S", "M", "L", "XL"]'::jsonb, '["https://via.placeholder.com/400x400?text=T-Shirt"]'::jsonb, 'MSHIRT-001'
WHERE NOT EXISTS (SELECT 1 FROM merchandise WHERE sku = 'MSHIRT-001');

INSERT INTO merchandise (title, description, price, currency, sizes, images, sku)
SELECT 'Mindstrong Hoodie', 'Cozy pullover hoodie with embroidered logo — perfect for cool evenings and mindful walks.', 49.99, 'USD', '["S", "M", "L", "XL"]'::jsonb, '["https://via.placeholder.com/400x400?text=Hoodie"]'::jsonb, 'MHOOD-002'
WHERE NOT EXISTS (SELECT 1 FROM merchandise WHERE sku = 'MHOOD-002');

INSERT INTO merchandise (title, description, price, currency, sizes, images, sku)
SELECT 'Mindful Mug', 'Ceramic mug with our signature quote. Microwave and dishwasher safe.', 12.50, 'USD', '[]'::jsonb, '["https://via.placeholder.com/400x400?text=Mug"]'::jsonb, 'MMUG-003'
WHERE NOT EXISTS (SELECT 1 FROM merchandise WHERE sku = 'MMUG-003');


-- 3. Timeline Events (Our Journey)
INSERT INTO timeline_events (period, title, description, img_src)
SELECT '2019 – 2020', 'The Spark', 'After sustaining multiple concussions, our founder began publicly speaking about mental health in sports.', 'https://images.unsplash.com/photo-1599481238640-4c12727c3c39?ixlib=rb-4.0.3&q=80&w=800'
WHERE NOT EXISTS (SELECT 1 FROM timeline_events WHERE title = 'The Spark');

INSERT INTO timeline_events (period, title, description, img_src)
SELECT '2020 – 2021', 'Building Community', 'Launched #MindFitiGameFiti movement with first cohort of athletes, coaches, and mental health advocates.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&q=80&w=800'
WHERE NOT EXISTS (SELECT 1 FROM timeline_events WHERE title = 'Building Community');

INSERT INTO timeline_events (period, title, description, img_src)
SELECT '2022 – 2023', 'Recognition & Expansion', 'Gaining national attention with the Tujiamini Silver Award, expanded outreach with mentorship programs.', 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&q=80&w=800'
WHERE NOT EXISTS (SELECT 1 FROM timeline_events WHERE title = 'Recognition & Expansion');

INSERT INTO timeline_events (period, title, description, img_src)
SELECT '2024 – Present', 'Digital Growth', 'Strategic partnerships to integrate mental wellness into sports institutions, plus e-learning platform and podcast.', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&q=80&w=800'
WHERE NOT EXISTS (SELECT 1 FROM timeline_events WHERE title = 'Digital Growth');


-- 4. Blog Posts (Latest Insights)
INSERT INTO blog_posts (title, slug, category, author, content, img_src, published_at)
SELECT 'A Simple Mindful Breathing Technique', 'mindful-breathing-technique', 'Practice', 'Dr. Maria Lopez', 'A short guide to a breathing exercise you can use anytime to ground yourself.', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&q=80&w=800', NOW()
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'mindful-breathing-technique');

INSERT INTO blog_posts (title, slug, category, author, content, img_src, published_at)
SELECT 'Building Resilience Through Small Habits', 'building-resilience', 'Wellness', 'Team Mindstrong', 'Practical steps to create small, repeatable habits that build emotional resilience.', 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-4.0.3&q=80&w=800', NOW()
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'building-resilience');

INSERT INTO blog_posts (title, slug, category, author, content, img_src, published_at)
SELECT 'How to Support Someone You Care About', 'how-to-support-someone', 'Community', 'Community Contributor', 'Guidance on compassionate listening and supporting mental well-being for others.', 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&q=80&w=800', NOW()
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'how-to-support-someone');


-- 5. Team Members
INSERT INTO team_members (name, role, img_src)
SELECT 'Alex Morgan', 'Founder & CEO', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80'
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Alex Morgan');

INSERT INTO team_members (name, role, img_src)
SELECT 'Jamie Lee', 'Head of Programs', 'https://images.unsplash.com/photo-1545996124-1b3bc5f4b4a8?w=800&q=80'
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Jamie Lee');

INSERT INTO team_members (name, role, img_src)
SELECT 'Chris Patel', 'Community Manager', 'https://images.unsplash.com/photo-1531123414780-f0b60f67f1b1?w=800&q=80'
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Chris Patel');


-- 6. Testimonials
INSERT INTO testimonials (name, quote, img_src)
SELECT 'Alex Rivera', 'Mindstrong helped me build small but powerful daily habits. Their resources are approachable and kind.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80'
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE name = 'Alex Rivera');

INSERT INTO testimonials (name, quote, img_src)
SELECT 'Jessie Kim', 'The community is supportive and the guided moments have been a huge help in managing stress.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80'
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE name = 'Jessie Kim');

INSERT INTO testimonials (name, quote, img_src)
SELECT 'Sam O''Neill', 'Practical, compassionate, and research-informed — exactly what I was looking for.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80'
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE name = 'Sam O''Neill');
