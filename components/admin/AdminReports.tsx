import React, { useEffect, useState } from 'react';
import { api } from '../../services/apiService';
import { Order, ContactMessage, AdminStats } from '../../types';

const AdminReports: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      try {
        const [statsData, ordersData, messagesData] = await Promise.all([
          api.getAdminStats(),
          api.getOrders(),
          api.getContactMessages()
        ]);
        setStats(statsData);
        setRecentOrders(ordersData);
        setMessages(messagesData);
      } catch (err) {
        console.error("Failed to load reports", err);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-gray-500"><i className="fas fa-spinner fa-spin text-2xl mb-4"></i><p>Generating Reports...</p></div>;
  }

  // Calculate revenue
  const totalRevenue = recentOrders.filter(o => o.status === 'paid' || o.status === 'delivered').reduce((sum, o) => sum + Number(o.total_amount), 0);
  const pendingOrders = recentOrders.filter(o => o.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-montserrat text-gray-800">System Reports & Analytics</h2>
        <p className="text-sm text-gray-500">Comprehensive overview of platform activity and financial metrics.</p>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">KES {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
            <i className="fas fa-money-bill-wave"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{recentOrders.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
            <i className="fas fa-shopping-bag"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Pending Orders</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{pendingOrders}</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">
            <i className="fas fa-clock"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Unread Messages</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.unreadMessages || 0}</p>
          </div>
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl">
            <i className="fas fa-envelope"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold font-montserrat text-gray-800 mb-4 border-b pb-2">Content Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600"><i className="fas fa-tshirt w-6 text-center text-gray-400"></i> Merchandise Items</span>
              <span className="font-bold">{stats?.merchandise || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600"><i className="fas fa-newspaper w-6 text-center text-gray-400"></i> Published Blogs</span>
              <span className="font-bold">{stats?.blogPosts || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600"><i className="fas fa-users w-6 text-center text-gray-400"></i> Team Members</span>
              <span className="font-bold">{stats?.teamMembers || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600"><i className="fas fa-comment-dots w-6 text-center text-gray-400"></i> Testimonials</span>
              <span className="font-bold">{stats?.testimonials || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600"><i className="fas fa-concierge-bell w-6 text-center text-gray-400"></i> Services</span>
              <span className="font-bold">{stats?.services || 0}</span>
            </div>
          </div>
        </div>

        {/* Recent Revenue Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold font-montserrat text-gray-800 mb-4 border-b pb-2">Recent Order Activity</h3>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent orders to display.</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.slice(0, 5).map(order => (
                <div key={order.id} className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">KES {order.total_amount}</p>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${order.status === 'paid' ? 'bg-green-100 text-green-700' : order.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
