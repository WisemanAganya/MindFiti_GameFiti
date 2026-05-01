import React, { useEffect, useState } from 'react';
import { api } from '../../services/apiService';
import { Order } from '../../types';

const AdminOrdersManager: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const loadOrders = async () => {
        setLoading(true);
        try {
            let status = filter === 'all' ? undefined : filter;
            const data = await api.getOrders(status);
            setOrders(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, [filter]);

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            await api.updateOrderStatus(id, newStatus);
            loadOrders();
        } catch (e) {
            alert('Failed to update status');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><i className="fas fa-clock"></i> Pending</span>;
            case 'paid': return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><i className="fas fa-check-circle"></i> Paid</span>;
            case 'shipping': return <span className="bg-purple-100 text-purple-800 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><i className="fas fa-truck"></i> Shipping</span>;
            case 'delivered': return <span className="bg-green-100 text-green-800 border border-green-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><i className="fas fa-box-open"></i> Delivered</span>;
            case 'cancelled': return <span className="bg-red-100 text-red-800 border border-red-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><i className="fas fa-times-circle"></i> Cancelled</span>;
            default: return <span className="bg-gray-100 text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><i className="fas fa-circle"></i> {status}</span>;
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-montserrat text-gray-800">Order Management</h2>
                    <p className="text-gray-500 mt-1">Track and update customer merchandise orders.</p>
                </div>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
                    {['all', 'pending', 'paid', 'shipping', 'delivered'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${filter === s ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="py-12 text-center text-gray-500"><i className="fas fa-spinner fa-spin text-3xl mb-4"></i><p>Loading Orders...</p></div>
            ) : orders.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
                    <i className="fas fa-receipt text-5xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Orders Found</h3>
                    <p className="text-gray-500 mb-6">There are no orders matching the current filter.</p>
                    {filter !== 'all' && (
                        <button onClick={() => setFilter('all')} className="text-primary font-bold hover:underline">View All Orders</button>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Details</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {orders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-primary">#{order.id}</div>
                                            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{order.payment_method || 'Unknown'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-800">{order.shipping_name}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1"><i className="fas fa-phone text-xs opacity-50"></i> {order.shipping_phone}</div>
                                            {order.payment_phone && order.payment_phone !== order.shipping_phone && (
                                                <div className="text-xs text-gray-400 mt-0.5" title="Payment Phone">Pay: {order.payment_phone}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-800">
                                                KES {order.total_amount?.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-800">{new Date(order.created_at).toLocaleDateString()}</div>
                                            <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="inline-flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1 group-hover:border-primary/30 transition-colors">
                                                <span className="text-xs font-semibold text-gray-500 px-2">Update:</span>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className="bg-white border-none rounded text-sm font-bold text-gray-700 py-1.5 px-3 pr-8 focus:ring-0 cursor-pointer outline-none shadow-sm"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="shipping">Shipping</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersManager;
