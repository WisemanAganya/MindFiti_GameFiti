const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middlewares
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// CORS - allow frontend origin(s) and credentials
// In development we'll accept any localhost origin (common dev servers: 3000, 5173, etc.)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser requests like curl/postman
    if (!origin) return callback(null, true);
    // allow any localhost origin for development
    try {
      const u = new URL(origin);
      if (u.hostname === 'localhost' || u.hostname === '127.0.0.1' || origin === FRONTEND_URL) {
        return callback(null, true);
      }
    } catch (e) {
      // fall through to rejection
    }
    return callback(new Error('CORS policy: Origin not allowed'));
  },
  credentials: true,
}));

// Rate limiter
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 120 });
app.use(limiter);

// Mock Data (temporary - will use database after import)
const mockServices = [
  {
    id: 1,
    icon: 'fa-solid fa-people-group',
    title: 'Mental Fitness Workshops',
    description: 'Interactive, evidence-informed sessions for athletes and teams, focusing on resilience, emotional regulation, and a high-performance mindset.',
    imgSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
  },
  {
    id: 2,
    icon: 'fa-solid fa-user-check',
    title: 'One-on-One Athlete Mentorship',
    description: 'Personalized coaching sessions to support athletes through mental health challenges, performance blocks, or career transitions.',
    imgSrc: 'https://images.unsplash.com/photo-1579208570337-b4558694e156?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
  },
  {
    id: 3,
    icon: 'fa-solid fa-heart-pulse',
    title: '#MindFitiGameFiti Community',
    description: 'A growing social movement combining sports and storytelling to foster open conversations about emotional well-being in athletics.',
    imgSrc: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
  }
];

const mockTeam = [
  {
    id: 1,
    imgSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    name: 'Leon Nyang\' Odour',
    role: 'CEO and Founder',
    social_twitter: '#',
    social_facebook: '#',
    social_linkedin: '#'
  },
  {
    id: 2,
    imgSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    name: 'Keng\'aya Caroline Bosire',
    role: 'Co-Founder & Program Lead',
    social_twitter: '#',
    social_facebook: '#',
    social_linkedin: '#'
  },
  {
    id: 3,
    imgSrc: 'https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    name: 'Elizabeth Maina',
    role: 'Secretary',
    social_twitter: '#',
    social_facebook: '#',
    social_linkedin: '#'
  }
];

const mockMerchandise = [
  {
    id: 1,
    title: 'MindStrong T-Shirt',
    description: 'Premium cotton t-shirt with our official logo.',
    sizes: 'S,M,L,XL,XXL',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      'https://images.unsplash.com/photo-1622470953794-3a5f7aa1db02?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
    ],
    price: 24.99,
    currency: 'USD',
    sku: 'MS-TSHIRT-001'
  },
  {
    id: 2,
    title: 'MindStrong Hoodie',
    description: 'Warm, comfy, and built for bold statements.',
    sizes: 'S,M,L,XL,XXL',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6d5f96333?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      'https://images.unsplash.com/photo-1556112297-c7da494df986?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      'https://images.unsplash.com/photo-1620799140159-483013d4b533?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
    ],
    price: 49.99,
    currency: 'USD',
    sku: 'MS-HOODIE-001'
  },
  {
    id: 3,
    title: 'MindStrong Notebook',
    description: 'Premium journal for mindful reflection and goal tracking. Perfect for athletes building mental resilience.',
    sizes: '',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3af4abd8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      'https://images.unsplash.com/photo-1507842217343-583f20270319?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
    ],
    price: 15.99,
    currency: 'USD',
    sku: 'MS-NOTEBOOK-001'
  },
  {
    id: 4,
    title: 'MindStrong Wrist Band',
    description: 'Stretchy wrist band with motivational message. Stay reminded of your mental fitness journey.',
    sizes: 'One Size',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
    ],
    price: 9.99,
    currency: 'USD',
    sku: 'MS-WRISTBAND-001'
  },
  {
    id: 5,
    title: 'MindStrong Sports Bracelet',
    description: 'Durable silicone bracelet with adjustable fit. Show your support for mental wellness in sports.',
    sizes: 'One Size',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800'
    ],
    price: 12.99,
    currency: 'USD',
    sku: 'MS-BRACELET-001'
  }
];

const mockTestimonials = [
  {
    id: 1,
    imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    name: 'Samuel Otieno',
    quote: 'MindStrong helped me find mental clarity during my toughest seasons on the pitch. Proud to wear the merch!'
  },
  {
    id: 2,
    imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    name: 'Faith Kamau',
    quote: 'It\'s more than a hoodie — it\'s a symbol of strength and resilience. This movement saved me.'
  },
  {
    id: 3,
    imgSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    name: 'Amara Patel',
    quote: 'The community here is incredibly supportive. Every day I feel stronger mentally because of MindStrong.'
  },
  {
    id: 4,
    imgSrc: 'https://images.unsplash.com/photo-1507539803526-c8ef5b4fbf17?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    name: 'Jamal Thompson',
    quote: 'I\'ve learned that mental fitness is just as important as physical training. MindStrong gets it.'
  }
];

// ============= PUBLIC ENDPOINTS =============

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get all services
app.get('/api/services', (req, res) => {
  res.json(mockServices);
});

// Get all team members
app.get('/api/team', (req, res) => {
  res.json(mockTeam);
});

// Get all merchandise
app.get('/api/merchandise', (req, res) => {
  const formattedMerch = mockMerchandise.map(item => ({
    ...item,
    sizes: item.sizes ? item.sizes.split(',') : []
  }));
  res.json(formattedMerch);
});

// Get all testimonials
app.get('/api/testimonials', (req, res) => {
  res.json(mockTestimonials);
});

// Get timeline events
app.get('/api/timeline', (req, res) => {
  const mockTimeline = [
    {
      id: 1,
      imgSrc: 'https://images.unsplash.com/photo-1599481238640-4c12727c3c39?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      period: '2019 – 2020',
      title: 'The Spark',
      description: 'After sustaining multiple concussions, our founder began publicly speaking about mental health in sports.'
    },
    {
      id: 2,
      imgSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      period: '2020 – 2021',
      title: 'Building Community',
      description: 'Launched #MindFitiGameFiti movement with first cohort of athletes, coaches, and mental health advocates.'
    },
    {
      id: 3,
      imgSrc: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      period: '2022 – 2023',
      title: 'Recognition & Expansion',
      description: 'Gaining national attention with the Tujiamini Silver Award, expanded outreach with mentorship programs.'
    },
    {
      id: 4,
      imgSrc: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      period: '2024 – Present',
      title: 'Digital Growth',
      description: 'Strategic partnerships to integrate mental wellness into sports institutions, plus e-learning platform and podcast.'
    }
  ];
  res.json(mockTimeline);
});

// Get all blog posts
app.get('/api/blog', (req, res) => {
  const mockBlog = [
    {
      id: 1,
      slug: 'the-mental-game',
      imgSrc: 'https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      category: 'Performance',
      title: 'The Mental Game: How Mindfulness Can Elevate Your Performance',
      author: 'By Leon Nyang\'',
      published_at: '2024-07-15'
    },
    {
      id: 2,
      slug: 'beyond-the-physical',
      imgSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
      category: 'Wellness',
      title: 'Beyond the Physical: Recognizing the Signs of Burnout in Athletes',
      author: 'By Caroline Bosire',
      published_at: '2024-07-02'
    }
  ];
  res.json(mockBlog);
});

// Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  res.json({ message: 'Message submitted successfully!' });
});

// ===== SECURE AUTH ENDPOINTS (In-memory with bcrypt + JWT) =====

// In-memory user store (will be replaced with DB when ready)
let users = [];
let refreshTokenStore = new Map();

// Initialize default admin on startup (synchronous - using bcryptjs sync method)
const defaultPassword = process.env.ADMIN_PASSWORD || 'admin';
const hash = bcrypt.hashSync(defaultPassword, 10);
users.push({
  id: 1,
  username: 'admin',
  password_hash: hash,
  role: 'admin'
});

// Login endpoint (bcrypt + JWT)
app.post(
  '/api/auth/login',
  [body('username').isString().trim(), body('password').isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid input' });

    const { username, password } = req.body;
    try {
      const user = users.find(u => u.username === username);
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });

      const payload = { id: user.id, username: user.username, role: user.role };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret-key-change-in-production', { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'dev-secret-key-change-in-production', { expiresIn: '7d' });

      // Store refresh token in memory
      refreshTokenStore.set(user.id, refreshToken);

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.json({ token: accessToken, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
      console.error('Login error', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Refresh token endpoint
app.post('/api/auth/refresh', (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key-change-in-production');
    const userId = payload.id;
    const storedToken = refreshTokenStore.get(userId);
    if (storedToken !== token) return res.status(401).json({ message: 'Invalid token' });

    const user = users.find(u => u.id === userId);
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    const newAccess = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'dev-secret-key-change-in-production', { expiresIn: '15m' });
    res.json({ token: newAccess });
  } catch (err) {
    console.error('Refresh error', err);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key-change-in-production');
      refreshTokenStore.delete(payload.id);
    } catch (err) {
      // ignore
    }
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

// Auth middleware for protected routes
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key-change-in-production');
    req.user = payload;
    next();
  } catch (err) {
    console.error('JWT auth error', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Admin endpoints (protected)
app.get('/api/admin/stats', authenticateJWT, (req, res) => {
  res.json({
    services: mockServices.length,
    merchandise: mockMerchandise.length,
    teamMembers: mockTeam.length,
    testimonials: mockTestimonials.length,
    blogPosts: 3,
    contactMessages: 0,
    unreadMessages: 0
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful error handling
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});
