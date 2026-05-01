
export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  imgSrc: string;
}

export interface MerchandiseItem {
  id?: number;
  images: string[];
  title: string;
  description: string;
  price?: number;
  currency?: string;
  sizes?: string[];
  sku?: string;
}

export interface TimelineEvent {
  imgSrc: string;
  period: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id?: number;
  imgSrc: string;
  name: string;
  role: string;
  social_twitter: string;
  social_facebook: string;
  social_linkedin: string;
}

export interface Testimonial {
  id?: number;
  imgSrc: string;
  name: string;
  role?: string;
  quote: string;
}

export interface BlogPost {
  id?: number;
  slug: string;
  imgSrc: string;
  category: string;
  title: string;
  author: string;
  content: string;
  published_at: string;
  created_at: string;
}

export interface Profile {
  id: string;
  role: 'admin' | 'delivery' | 'customer';
  full_name: string;
  phone: string;
}

export interface Order {
  id: number;
  user_id?: string;
  status: 'pending' | 'paid' | 'shipping' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  payment_ref?: string;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_title: string;
  quantity: number;
  price_at_purchase: number;
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'editor' | string;
}

export interface AdminStats {
  services: number;
  merchandise: number;
  teamMembers: number;
  testimonials: number;
  blogPosts: number;
  contactMessages: number;
  unreadMessages: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}