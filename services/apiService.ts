import { Service, MerchandiseItem, TimelineEvent, TeamMember, Testimonial, BlogPost, AdminStats, ContactMessage, User, Order, Profile } from '../types';
import { supabase } from './supabaseClient';
import { CartItem } from '../context/CartContext';

// Helper to map DB snake_case to frontend camelCase
const mapService = (data: any): Service => ({
    title: data.title,
    description: data.description,
    imgSrc: data.img_src,
    icon: data.icon
});

const mapMerch = (data: any): MerchandiseItem => ({
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    currency: data.currency,
    sizes: data.sizes,
    images: data.images,
    sku: data.sku
});

const mapTeam = (data: any): TeamMember => ({
    id: data.id,
    name: data.name,
    role: data.role,
    imgSrc: data.img_src,
    social_twitter: '',
    social_facebook: '',
    social_linkedin: '',
    ...data
});

const mapTestimonial = (data: any): Testimonial => ({
    id: data.id,
    name: data.name,
    quote: data.quote,
    imgSrc: data.img_src,
    role: ''
});

const mapBlog = (data: any): BlogPost => ({
    id: data.id,
    slug: data.slug,
    title: data.title,
    category: data.category,
    author: data.author,
    content: data.content,
    imgSrc: data.img_src,
    published_at: data.published_at,
    created_at: data.created_at
});

const mapMessage = (data: any): ContactMessage => ({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    is_read: data.is_read,
    created_at: data.created_at
});

export const api = {
    // Services
    getServices: async (): Promise<Service[]> => {
        const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        return data.map(mapService);
    },
    createService: async (svc: Partial<Service>) => {
        const { data, error } = await supabase.from('services').insert([{
            title: svc.title,
            description: svc.description,
            img_src: svc.imgSrc,
            icon: svc.icon
        }]).select().single();
        if (error) throw error;
        return mapService(data);
    },
    updateService: async (index: number, patch: Partial<Service>) => {
        const { data, error } = await supabase.from('services').update({
            title: patch.title,
            description: patch.description,
            img_src: patch.imgSrc,
            icon: patch.icon
        }).eq('id', index).select().single();
        if (error) throw error;
        return mapService(data);
    },
    deleteService: async (id: number) => {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) throw error;
    },

    // Merchandise
    getMerchandise: async (): Promise<MerchandiseItem[]> => {
        const { data, error } = await supabase.from('merchandise').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data.map(mapMerch);
    },
    getMerch: async (): Promise<MerchandiseItem[]> => { // Alias
        const { data, error } = await supabase.from('merchandise').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data.map(mapMerch);
    },
    createMerch: async (item: Partial<MerchandiseItem>) => {
        const { data, error } = await supabase.from('merchandise').insert([{
            title: item.title,
            description: item.description,
            price: item.price,
            currency: item.currency,
            sizes: item.sizes,
            images: item.images,
            sku: item.sku
        }]).select().single();
        if (error) throw error;
        return mapMerch(data);
    },
    updateMerch: async (id: number, patch: Partial<MerchandiseItem>) => {
        const { data, error } = await supabase.from('merchandise').update({
            title: patch.title,
            description: patch.description,
            price: patch.price,
            currency: patch.currency,
            sizes: patch.sizes,
            images: patch.images,
            sku: patch.sku
        }).eq('id', id).select().single();
        if (error) throw error;
        return mapMerch(data);
    },
    deleteMerch: async (id: number) => {
        const { error } = await supabase.from('merchandise').delete().eq('id', id);
        if (error) throw error;
    },

    // Blog
    getBlogPosts: async (): Promise<BlogPost[]> => {
        const { data, error } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
        if (error) throw error;
        return data.map(mapBlog);
    },
    createBlog: async (post: Partial<BlogPost>) => {
        const { data, error } = await supabase.from('blog_posts').insert([{
            title: post.title,
            slug: post.slug,
            category: post.category,
            author: post.author,
            content: post.content,
            img_src: post.imgSrc,
            published_at: post.published_at || new Date().toISOString()
        }]).select().single();
        if (error) throw error;
        return mapBlog(data);
    },
    updateBlog: async (id: number, patch: Partial<BlogPost>) => {
        const { data, error } = await supabase.from('blog_posts').update({
            title: patch.title,
            slug: patch.slug,
            category: patch.category,
            author: patch.author,
            content: patch.content,
            img_src: patch.imgSrc,
            published_at: patch.published_at
        }).eq('id', id).select().single();
        if (error) throw error;
        return mapBlog(data);
    },
    deleteBlog: async (id: number) => {
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (error) throw error;
    },

    // Timeline
    getTimelineEvents: async (): Promise<TimelineEvent[]> => {
        const { data, error } = await supabase.from('timeline_events').select('*').order('period', { ascending: true });
        if (error) throw error;
        return data.map(item => ({
            id: item.id,
            imgSrc: item.img_src,
            period: item.period,
            title: item.title,
            description: item.description
        }));
    },
    createTimeline: async (evt: Partial<TimelineEvent>) => {
        const { data, error } = await supabase.from('timeline_events').insert([{
            img_src: evt.imgSrc,
            period: evt.period,
            title: evt.title,
            description: evt.description
        }]).select().single();
        if (error) throw error;
        return data;
    },
    updateTimeline: async (id: number, patch: Partial<TimelineEvent>) => {
        const { data, error } = await supabase.from('timeline_events').update({
            img_src: patch.imgSrc,
            period: patch.period,
            title: patch.title,
            description: patch.description
        }).eq('id', id).select().single();
        if (error) throw error;
        return data;
    },
    deleteTimeline: async (id: number) => {
        const { error } = await supabase.from('timeline_events').delete().eq('id', id);
        if (error) throw error;
    },

    // Team
    getTeamMembers: async (): Promise<TeamMember[]> => {
        const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        return data.map(mapTeam);
    },
    createTeamMember: async (member: Partial<TeamMember>) => {
        const { data, error } = await supabase.from('team_members').insert([{
            name: member.name,
            role: member.role,
            bio: (member as any).bio,
            img_src: member.imgSrc
        }]).select().single();
        if (error) throw error;
        return mapTeam(data);
    },
    updateTeamMember: async (id: number, patch: Partial<TeamMember>) => {
        const { data, error } = await supabase.from('team_members').update({
            name: patch.name,
            role: patch.role,
            bio: (patch as any).bio,
            img_src: patch.imgSrc
        }).eq('id', id).select().single();
        if (error) throw error;
        return mapTeam(data);
    },
    deleteTeamMember: async (id: number) => {
        const { error } = await supabase.from('team_members').delete().eq('id', id);
        if (error) throw error;
    },

    // Testimonials
    getTestimonials: async (): Promise<Testimonial[]> => {
        const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data.map(mapTestimonial);
    },
    createTestimonial: async (t: Partial<Testimonial>) => {
        const { data, error } = await supabase.from('testimonials').insert([{
            name: t.name,
            quote: t.quote,
            img_src: t.imgSrc,
        }]).select().single();
        if (error) throw error;
        return mapTestimonial(data);
    },
    updateTestimonial: async (id: number, patch: Partial<Testimonial>) => {
        const { data, error } = await supabase.from('testimonials').update({
            name: patch.name,
            quote: patch.quote,
            img_src: patch.imgSrc
        }).eq('id', id).select().single();
        if (error) throw error;
        return mapTestimonial(data);
    },
    deleteTestimonial: async (id: number) => {
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) throw error;
    },

    // Contact
    submitContactForm: async (formData: { name: string; email: string; phone: string; message: string }) => {
        const { data, error } = await supabase.from('contact_messages').insert([formData]).select().single();
        if (error) throw error;
        return mapMessage(data);
    },
    getContactMessages: async (): Promise<ContactMessage[]> => {
        const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data.map(mapMessage);
    },

    // Auth
    login: async (credentials: { email: string, password: string }): Promise<{ token: string; user: User }> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });
        if (error) throw error;
        if (!data.session) throw new Error('No session returned');

        // Check profile for role
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();

        const user: User = {
            id: 1,
            username: data.user.email || 'Admin',
            role: profile ? profile.role : 'authenticated'
        };
        return { token: data.session.access_token, user };
    },

    signup: async (credentials: { email: string, password: string, fullName: string }): Promise<{ token: string; user: User }> => {
        const { data, error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            options: {
                data: {
                    full_name: credentials.fullName
                }
            }
        });
        if (error) throw error;
        if (!data.session) throw new Error('Signup successful! Please check your email for verification if enabled, or login.');

        // Auto-login after signup if session exists
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user!.id).single();

        const user: User = {
            id: 1,
            username: data.user!.email || 'User',
            role: profile ? profile.role : 'customer'
        };
        return { token: data.session.access_token, user };
    },

    // Stats
    getAdminStats: async (): Promise<AdminStats> => {
        const [s, m, t, tm, b, cm, ucm] = await Promise.all([
            supabase.from('services').select('*', { count: 'exact', head: true }),
            supabase.from('merchandise').select('*', { count: 'exact', head: true }),
            supabase.from('team_members').select('*', { count: 'exact', head: true }),
            supabase.from('testimonials').select('*', { count: 'exact', head: true }),
            supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
            supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
            supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false)
        ]);

        return {
            services: s.count || 0,
            merchandise: m.count || 0,
            teamMembers: t.count || 0,
            testimonials: tm.count || 0,
            blogPosts: b.count || 0,
            contactMessages: cm.count || 0,
            unreadMessages: ucm.count || 0
        };
    },

    // Orders
    createOrder: async (orderData: Partial<Order>, items: CartItem[]): Promise<Order> => {
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([orderData])
            .select()
            .single();

        if (orderError) throw orderError;

        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.id,
            product_title: item.title,
            quantity: item.quantity,
            price_at_purchase: item.price
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return order as Order;
    },

    getOrder: async (id: number): Promise<Order | null> => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
            return null;
        }
        return data as Order;
    },

    getOrders: async (statusFilter?: string): Promise<Order[]> => {
        let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (statusFilter) {
            query = query.eq('status', statusFilter);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data as Order[];
    },

    updateOrderStatus: async (id: number, status: string): Promise<void> => {
        const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', id);
        if (error) throw error;
    },

    // Database Settings
    getSettings: async (): Promise<Record<string, string>> => {
        const { data, error } = await supabase.from('site_settings').select('*');
        if (error) throw error;
        const settings: Record<string, string> = {};
        if (data) {
            data.forEach((row: any) => {
                settings[row.key] = row.value;
            });
        }
        return settings;
    },
    updateSetting: async (key: string, value: string) => {
        const { error } = await supabase.from('site_settings').upsert({ key, value });
        if (error) throw error;
    },

    // User Management
    getProfiles: async (): Promise<Profile[]> => {
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data as Profile[];
    },
    updateProfileRole: async (id: string, role: string) => {
        const { error } = await supabase.from('profiles').update({ role }).eq('id', id);
        if (error) throw error;
    },

    // File Upload
    uploadImage: async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        return data.publicUrl;
    }
};