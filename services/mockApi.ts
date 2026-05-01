import { BlogPost, Service, MerchandiseItem, ContactMessage, TeamMember } from '../types';

// Simple localStorage-backed mock API for admin CRUD
const STORAGE_PREFIX = 'pmock_';

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch (e) {
    console.error('mockApi read error', e);
    return fallback;
  }
};

const write = (key: string, value: any) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('mockApi write error', e);
  }
};

const uid = (items: any[]) => {
  const max = items.reduce((m, it) => Math.max(m, it.id || 0), 0);
  return max + 1;
};

// Initialize defaults if missing
if (!localStorage.getItem(STORAGE_PREFIX + 'blogs')) {
  const now = new Date().toISOString();
  const defaultBlogs: BlogPost[] = [
    { id: 1, slug: 'welcome', imgSrc: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', category: 'News', title: 'Welcome to Project MindStrong', author: 'Admin', content: 'This is a demo blog post.', published_at: now, created_at: now },
  ];
  write('blogs', defaultBlogs);
}

if (!localStorage.getItem(STORAGE_PREFIX + 'services')) {
  const defaultServices: Service[] = [
    { title: 'Consultation', description: 'One-on-one sessions', imgSrc: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', icon: '' },
  ];
  write('services', defaultServices);
}

if (!localStorage.getItem(STORAGE_PREFIX + 'merch')) {
  const defaultMerch: MerchandiseItem[] = [
    { id: 1, images: ['https://images.unsplash.com/photo-1520975913321-2b0640a8b1f6?w=800&q=80'], title: 'MindStrong Tee', description: 'High-quality cotton tee', price: 20, currency: 'USD', sizes: ['S','M','L'], sku: 'MS-TEE-01' },
  ];
  write('merch', defaultMerch);
}

// Blog CRUD
const getBlogs = async (): Promise<BlogPost[]> => {
  return read<BlogPost[]>('blogs', []);
};

const createBlog = async (post: Partial<BlogPost>): Promise<BlogPost> => {
  const list = read<BlogPost[]>('blogs', []);
  const newPost: BlogPost = {
    id: uid(list),
    slug: (post.slug || (post.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-')),
    imgSrc: post.imgSrc || '',
    category: post.category || 'Uncategorized',
    title: post.title || 'Untitled',
    author: post.author || 'Admin',
    content: post.content || '',
    published_at: post.published_at || new Date().toISOString(),
    created_at: new Date().toISOString(),
  };
  list.push(newPost);
  write('blogs', list);
  return newPost;
};

const updateBlog = async (id: number, patch: Partial<BlogPost>): Promise<BlogPost> => {
  const list = read<BlogPost[]>('blogs', []);
  const idx = list.findIndex(b => b.id === id);
  if (idx === -1) throw new Error('Not found');
  list[idx] = { ...list[idx], ...patch } as BlogPost;
  write('blogs', list);
  return list[idx];
};

const deleteBlog = async (id: number): Promise<void> => {
  const list = read<BlogPost[]>('blogs', []);
  write('blogs', list.filter(b => b.id !== id));
};

// Services CRUD
const getServices = async (): Promise<Service[]> => read<Service[]>('services', []);
const createService = async (svc: Partial<Service>): Promise<Service> => {
  const list = read<Service[]>('services', []);
  const newSvc: Service = {
    title: svc.title || 'Untitled',
    description: svc.description || '',
    imgSrc: svc.imgSrc || '',
    icon: svc.icon || '',
  };
  list.push(newSvc);
  write('services', list);
  return newSvc;
};

const updateService = async (index: number, patch: Partial<Service>): Promise<Service> => {
  const list = read<Service[]>('services', []);
  if (index < 0 || index >= list.length) throw new Error('Not found');
  list[index] = { ...list[index], ...patch } as Service;
  write('services', list);
  return list[index];
};

const deleteService = async (index: number): Promise<void> => {
  const list = read<Service[]>('services', []);
  list.splice(index, 1);
  write('services', list);
};

// Merch CRUD
const getMerch = async (): Promise<MerchandiseItem[]> => read<MerchandiseItem[]>('merch', []);
const createMerch = async (item: Partial<MerchandiseItem>): Promise<MerchandiseItem> => {
  const list = read<MerchandiseItem[]>('merch', []);
  const newItem: MerchandiseItem = {
    id: uid(list),
    images: item.images || [],
    title: item.title || 'Untitled',
    description: item.description || '',
    price: item.price || 0,
    currency: item.currency || 'USD',
    sizes: item.sizes || [],
    sku: item.sku || '',
  };
  list.push(newItem);
  write('merch', list);
  return newItem;
};

const updateMerch = async (id: number, patch: Partial<MerchandiseItem>): Promise<MerchandiseItem> => {
  const list = read<MerchandiseItem[]>('merch', []);
  const idx = list.findIndex(m => m.id === id);
  if (idx === -1) throw new Error('Not found');
  list[idx] = { ...list[idx], ...patch } as MerchandiseItem;
  write('merch', list);
  return list[idx];
};

const deleteMerch = async (id: number): Promise<void> => {
  const list = read<MerchandiseItem[]>('merch', []);
  write('merch', list.filter(m => m.id !== id));
};

// Contact messages (read-only for admin)
const getContactMessages = async (): Promise<ContactMessage[]> => read<ContactMessage[]>('messages', []);

// Team members (for completeness)
const getTeamMembers = async (): Promise<TeamMember[]> => read<TeamMember[]>('team', []);

export const mockApi = {
  // blogs
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  // auth
  login: async (credentials: { username: string, password: string }) => {
    // Accept any credentials in mock mode for development
    const user = { id: 1, username: credentials.username || 'dev', role: 'admin' };
    return { token: 'mock-token', user };
  },
  // admin stats
  getAdminStats: async () => {
    const blogs = read<BlogPost[]>('blogs', []);
    const services = read<Service[]>('services', []);
    const merch = read<MerchandiseItem[]>('merch', []);
    const team = read<TeamMember[]>('team', []);
    const messages = read<ContactMessage[]>('messages', []);
    const stats = {
      services: services.length,
      merchandise: merch.length,
      teamMembers: team.length,
      testimonials: 0,
      blogPosts: blogs.length,
      contactMessages: messages.length,
      unreadMessages: messages.filter(m => !m.is_read).length,
    };
    return stats;
  },
  // services
  getServices,
  createService,
  updateService,
  deleteService,
  // merch
  getMerch,
  createMerch,
  updateMerch,
  deleteMerch,
  // messages & team
  getContactMessages,
  getTeamMembers,
};

// Expose helper to create a contact message (used when backend is unavailable)
export const mockCreateContactMessage = async (msg: Partial<ContactMessage>) => {
  const list = read<ContactMessage[]>('messages', []);
  const newMsg: ContactMessage = {
    id: uid(list),
    name: msg.name || 'Anonymous',
    email: msg.email || '',
    phone: msg.phone || '',
    message: msg.message || '',
    is_read: false,
    created_at: new Date().toISOString(),
  };
  list.push(newMsg);
  write('messages', list);
  return newMsg;
};
