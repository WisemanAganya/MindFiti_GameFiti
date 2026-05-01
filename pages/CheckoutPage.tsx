import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

type PaymentMethod = 'stk' | 'paybill' | 'pochi';

const CheckoutPage: React.FC = () => {
    const { items, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        shipping_name: '',
        shipping_phone: '',
        shipping_address: '',
    });
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stk');
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed' | 'awaiting_confirmation'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;
        setLoading(true);

        try {
            if (paymentMethod === 'stk') {
                setPaymentStatus('processing');
                // 1. Simulate M-Pesa STK Push
                await new Promise(resolve => setTimeout(resolve, 2500)); // Mock delay
                
                // 2. Create Order in Supabase
                const orderData = {
                    total_amount: cartTotal,
                    shipping_name: form.shipping_name,
                    shipping_phone: form.shipping_phone,
                    shipping_address: form.shipping_address,
                    status: 'paid' as const,
                    payment_ref: `STK-${Date.now()}`
                };
                const newOrder = await api.createOrder(orderData, items);
                
                clearCart();
                setPaymentStatus('success');
                setTimeout(() => navigate(`/track-order?id=${newOrder.id}`), 1500);
            } else {
                // Paybill or Pochi - Create pending order and wait for manual confirmation
                const orderData = {
                    total_amount: cartTotal,
                    shipping_name: form.shipping_name,
                    shipping_phone: form.shipping_phone,
                    shipping_address: form.shipping_address,
                    status: 'pending' as const,
                    payment_ref: `${paymentMethod.toUpperCase()}-PENDING`
                };
                const newOrder = await api.createOrder(orderData, items);
                
                clearCart();
                setPaymentStatus('awaiting_confirmation');
                setTimeout(() => navigate(`/track-order?id=${newOrder.id}`), 4000);
            }
        } catch (err) {
            console.error(err);
            setPaymentStatus('failed');
            alert('Checkout Process Failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0 && paymentStatus !== 'success' && paymentStatus !== 'awaiting_confirmation') {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-gray-50">
                <i className="fas fa-shopping-basket text-6xl text-gray-300 mb-4"></i>
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <button onClick={() => navigate('/')} className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">
                    Go Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 font-roboto-slab">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold mb-8 font-montserrat text-gray-800">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Form & Payment Methods */}
                    <div className="space-y-6">
                        {/* Shipping Form */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center gap-2">
                                <i className="fas fa-map-marker-alt text-primary"></i> Shipping Information
                            </h2>
                            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input required name="shipping_name" value={form.shipping_name} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Phone Number</label>
                                    <input required name="shipping_phone" type="tel" value={form.shipping_phone} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="07XXXXXXXX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                    <textarea required name="shipping_address" value={form.shipping_address} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition h-24" placeholder="Street, Apartment, City" />
                                </div>
                            </form>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center gap-2">
                                <i className="fas fa-wallet text-green-600"></i> Payment Method
                            </h2>
                            <div className="space-y-3">
                                {/* STK Push Option */}
                                <label className={`block border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'stk' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment_method" value="stk" checked={paymentMethod === 'stk'} onChange={() => setPaymentMethod('stk')} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                                        <div className="ml-3 flex-1">
                                            <span className="block text-sm font-bold text-gray-900">M-Pesa STK Push (Express)</span>
                                            <span className="block text-xs text-gray-500 mt-1">Prompt will be sent to your phone instantly.</span>
                                        </div>
                                        <i className="fas fa-mobile-alt text-2xl text-green-600"></i>
                                    </div>
                                </label>

                                {/* Paybill Option */}
                                <label className={`block border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'paybill' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment_method" value="paybill" checked={paymentMethod === 'paybill'} onChange={() => setPaymentMethod('paybill')} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                                        <div className="ml-3 flex-1">
                                            <span className="block text-sm font-bold text-gray-900">M-Pesa Paybill</span>
                                            <span className="block text-xs text-gray-500 mt-1">Manual transfer using our Business Number.</span>
                                        </div>
                                        <i className="fas fa-building text-2xl text-green-600"></i>
                                    </div>
                                </label>

                                {/* Pochi la Biashara Option */}
                                <label className={`block border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'pochi' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment_method" value="pochi" checked={paymentMethod === 'pochi'} onChange={() => setPaymentMethod('pochi')} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                                        <div className="ml-3 flex-1">
                                            <span className="block text-sm font-bold text-gray-900">Pochi la Biashara</span>
                                            <span className="block text-xs text-gray-500 mt-1">Direct transfer to merchant.</span>
                                        </div>
                                        <i className="fas fa-store text-2xl text-green-600"></i>
                                    </div>
                                </label>
                            </div>

                            {/* Conditional Instructions based on selection */}
                            {paymentMethod === 'paybill' && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                                    <p className="font-bold mb-2">Paybill Instructions:</p>
                                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                        <li>Go to M-Pesa {'>'} Lipa na M-Pesa {'>'} Paybill</li>
                                        <li>Business Number: <strong className="text-gray-900">247247</strong></li>
                                        <li>Account Number: <strong className="text-gray-900">0798036081</strong></li>
                                        <li>Enter Amount: <strong className="text-gray-900">KES {cartTotal}</strong></li>
                                        <li>Click "Complete Order" below after sending.</li>
                                    </ol>
                                </div>
                            )}

                            {paymentMethod === 'pochi' && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                                    <p className="font-bold mb-2">Pochi Instructions:</p>
                                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                        <li>Dial *334# {'>'} Pochi la Biashara {'>'} Send to Pochi</li>
                                        <li>Enter Number: <strong className="text-gray-900">0798036081</strong></li>
                                        <li>Enter Amount: <strong className="text-gray-900">KES {cartTotal}</strong></li>
                                        <li>Click "Complete Order" below after sending.</li>
                                    </ol>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary & Action */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center gap-2">
                                <i className="fas fa-receipt text-gray-500"></i> Order Summary
                            </h2>
                            <div className="space-y-3 max-h-60 overflow-y-auto mb-6 pr-2">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                        <div className="flex-1">
                                            <span className="font-semibold text-gray-800">{item.title}</span>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-bold text-gray-700">{item.currency} {(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
                                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                                <span className="text-2xl font-bold text-green-600">{items[0]?.currency || 'KES'} {cartTotal.toLocaleString()}</span>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading || paymentStatus === 'success' || paymentStatus === 'awaiting_confirmation'}
                                className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg flex items-center justify-center space-x-2 transition-all transform ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:-translate-y-1'}`}
                            >
                                {loading && paymentMethod === 'stk' ? (
                                    <>
                                        <i className="fas fa-mobile-alt animate-pulse"></i>
                                        <span>Check your phone for STK Prompt...</span>
                                    </>
                                ) : loading ? (
                                    <>
                                        <i className="fas fa-circle-notch fa-spin"></i>
                                        <span>Processing Order...</span>
                                    </>
                                ) : paymentStatus === 'success' ? (
                                    <>
                                        <i className="fas fa-check-circle"></i>
                                        <span>Payment Successful!</span>
                                    </>
                                ) : paymentStatus === 'awaiting_confirmation' ? (
                                    <>
                                        <i className="fas fa-clock"></i>
                                        <span>Order placed! Awaiting Payment...</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-lock"></i>
                                        <span>{paymentMethod === 'stk' ? 'Pay Now via M-Pesa' : 'Complete Order'}</span>
                                    </>
                                )}
                            </button>
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <i className="fas fa-shield-alt"></i>
                                <span>256-bit encrypted checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
