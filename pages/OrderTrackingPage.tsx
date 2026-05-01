import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/apiService';
import { Order, OrderItem } from '../types';

const OrderTrackingPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const orderIdParam = searchParams.get('id');
    const [orderId, setOrderId] = useState(orderIdParam || '');
    const [order, setOrder] = useState<Order | null>(null);
    const [items, setItems] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (orderIdParam) {
            handleSearch(orderIdParam);
        }
    }, [orderIdParam]);

    const handleSearch = async (id: string) => {
        setLoading(true);
        setError('');
        try {
            const numId = parseInt(id);
            if (isNaN(numId)) throw new Error('Invalid Order ID');

            // Note: In a real app, you might want to require phone number or auth to view order details for privacy.
            // For this demo, we'll allow lookup by ID.
            const orderData = await api.getOrder(numId);
            if (!orderData) throw new Error('Order not found');

            // We would need to fetch items too if not returned with order
            // Assuming api.getOrder includes this logic or we add it
            // For now let's just show status.
            setOrder(orderData);
        } catch (err: any) {
            setError('Order not found. Please check the ID.');
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'paid': return 'bg-blue-100 text-blue-800';
            case 'shipping': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 font-roboto-slab">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-3xl font-bold mb-6 font-montserrat text-primary">Track Your Order</h1>

                    <div className="flex gap-2 max-w-md mx-auto mb-8">
                        <input
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID (e.g. 102)"
                            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        />
                        <button
                            onClick={() => handleSearch(orderId)}
                            disabled={loading}
                            className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90"
                        >
                            {loading ? 'Searching...' : 'Track'}
                        </button>
                    </div>

                    {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-6">{error}</div>}

                    {order && (
                        <div className="text-left border-t pt-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                                    <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleString()}</p>
                                </div>
                                <span className={`px-4 py-2 rounded-full font-bold uppercase text-xs ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold mb-2">Delivery Details</h3>
                                <p className="text-gray-700">{order.shipping_name}</p>
                                <p className="text-gray-700">{order.shipping_phone}</p>
                                <p className="text-gray-700">{order.shipping_address}</p>
                            </div>

                            {/* Tracking Steps Visualizer */}
                            <div className="relative py-4">
                                <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                                <div className="flex justify-between text-xs font-semibold text-gray-500">
                                    <div className={`p-2 bg-white flex flex-col items-center ${['pending', 'paid', 'shipping', 'delivered'].includes(order.status) ? 'text-green-600' : ''}`}>
                                        <div className={`w-4 h-4 rounded-full mb-1 ${['pending', 'paid', 'shipping', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span>Placed</span>
                                    </div>
                                    <div className={`p-2 bg-white flex flex-col items-center ${['paid', 'shipping', 'delivered'].includes(order.status) ? 'text-green-600' : ''}`}>
                                        <div className={`w-4 h-4 rounded-full mb-1 ${['paid', 'shipping', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span>Paid</span>
                                    </div>
                                    <div className={`p-2 bg-white flex flex-col items-center ${['shipping', 'delivered'].includes(order.status) ? 'text-green-600' : ''}`}>
                                        <div className={`w-4 h-4 rounded-full mb-1 ${['shipping', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span>Shipping</span>
                                    </div>
                                    <div className={`p-2 bg-white flex flex-col items-center ${order.status === 'delivered' ? 'text-green-600' : ''}`}>
                                        <div className={`w-4 h-4 rounded-full mb-1 ${order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span>Delivered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
