import React, { useState, useEffect } from 'react';
import { api } from '../../services/apiService';
import { User, AdminStats, ContactMessage } from '../../types';
import AdminBlogs from './AdminBlogs';
import AdminServicesManager from './AdminServicesManager';
import AdminMerchManager from './AdminMerchManager';
import AdminSettings from './AdminSettings';
import AdminTeamManager from './AdminTeamManager';
import AdminTestimonialsManager from './AdminTestimonialsManager';
import AdminTimelineManager from './AdminTimelineManager';
import AdminOrdersManager from './AdminOrdersManager';
import AdminUserManager from './AdminUserManager';
import AdminReports from './AdminReports';

interface AdminDashboardProps {
    user: User;
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
    // Updated view state type to include reports
    const [view, setView] = useState<'reports' | 'dashboard' | 'blogs' | 'services' | 'merch' | 'team' | 'testimonials' | 'timeline' | 'orders' | 'users' | 'settings'>('reports');

    return (
        <div className="flex h-screen bg-gray-50 font-roboto-slab">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex-col hidden md:flex shadow-xl z-10">
                <div className="px-6 py-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold font-montserrat">M</div>
                    <div>
                        <h2 className="font-montserrat font-bold text-lg leading-none tracking-wide text-white">MindStrong</h2>
                        <p className="text-xs text-primary font-medium mt-1">Super Admin Console</p>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Analytics</p>
                    <button onClick={() => setView('reports')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'reports' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-chart-pie mr-3 w-5 text-center"></i>
                        Reports & Overview
                    </button>
                    <button onClick={() => setView('dashboard')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'dashboard' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-inbox mr-3 w-5 text-center"></i>
                        Inbox & Messages
                    </button>

                    <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2">E-Commerce</p>
                    <button onClick={() => setView('orders')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'orders' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-shopping-bag mr-3 w-5 text-center"></i>
                        Orders
                    </button>
                    <button onClick={() => setView('merch')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'merch' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-tshirt mr-3 w-5 text-center"></i>
                        Merchandise
                    </button>

                    <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2">Content Management</p>
                    <button onClick={() => setView('blogs')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'blogs' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-newspaper mr-3 w-5 text-center"></i>
                        Blog Posts
                    </button>
                    <button onClick={() => setView('services')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'services' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-concierge-bell mr-3 w-5 text-center"></i>
                        Services
                    </button>
                    <button onClick={() => setView('team')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'team' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-users mr-3 w-5 text-center"></i>
                        Team Members
                    </button>
                    <button onClick={() => setView('testimonials')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'testimonials' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-comment-dots mr-3 w-5 text-center"></i>
                        Testimonials
                    </button>
                    <button onClick={() => setView('timeline')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'timeline' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-history mr-3 w-5 text-center"></i>
                        Timeline
                    </button>

                    <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2">System</p>
                    <button onClick={() => setView('users')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'users' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-users-cog mr-3 w-5 text-center"></i>
                        Users & Roles
                    </button>
                    <button onClick={() => setView('settings')} className={`w-full text-left flex items-center px-4 py-2.5 rounded-lg transition-all ${view === 'settings' ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                        <i className="fas fa-cog mr-3 w-5 text-center"></i>
                        Global Settings
                    </button>
                </nav>
                <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-white truncate w-32">{user.username}</p>
                            <p className="text-xs text-primary font-medium capitalize">{user.role} Access</p>
                        </div>
                        <button onClick={onLogout} className="text-slate-400 hover:text-red-400 transition-colors p-2" title="Logout">
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {view === 'reports' && <AdminReports />}
                        {view === 'dashboard' && <InboxView onLogout={onLogout} />}
                        {view === 'blogs' && <AdminBlogs />}
                        {view === 'services' && <AdminServicesManager />}
                        {view === 'merch' && <AdminMerchManager />}
                        {view === 'team' && <AdminTeamManager />}
                        {view === 'testimonials' && <AdminTestimonialsManager />}
                        {view === 'timeline' && <AdminTimelineManager />}
                        {view === 'orders' && <AdminOrdersManager />}
                        {view === 'users' && <AdminUserManager />}
                        {view === 'settings' && <AdminSettings />}
                    </div>
                </main>
            </div>
        </div>
    );
};

const InboxView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const messagesData = await api.getContactMessages();
                setMessages(messagesData.sort((a, b) => {
                    if (a.is_read !== b.is_read) return a.is_read ? 1 : -1;
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                }));
            } catch (err: any) {
                if (err.message && err.message.includes('Session expired')) onLogout();
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [onLogout]);

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold font-montserrat text-gray-800">Inbox & Messages</h2>
                <p className="text-sm text-gray-500">Manage contact inquiries from the website.</p>
            </div>
            {loading ? <p>Loading messages...</p> : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">From</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {messages.map(msg => (
                                    <tr key={msg.id} className={`hover:bg-gray-50 transition-colors ${!msg.is_read ? 'bg-blue-50/50' : ''}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{msg.name}</div>
                                            <div className="text-xs text-gray-500 mt-1">{msg.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-700 line-clamp-2 max-w-md">{msg.message}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-[10px] uppercase font-bold rounded-full ${!msg.is_read ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                                                {!msg.is_read ? 'New' : 'Read'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {messages.length === 0 && <p className="text-center py-12 text-gray-500">No messages yet.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;