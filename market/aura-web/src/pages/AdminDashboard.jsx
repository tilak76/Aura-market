import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Calendar, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center', color: 'red' }}>
                <h2>Access Denied</h2>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center', color: 'var(--color-text-primary)' }}>
                <h2>Loading Orders...</h2>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1000px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>Admin Dashboard</h1>
                    <div className="glass-panel" style={{ padding: '10px 20px', borderRadius: '30px' }}>
                        <span style={{ color: 'var(--color-gold-primary)', fontWeight: 'bold' }}>{orders.length}</span> Total Orders
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
                        <Package size={48} style={{ opacity: 0.5, marginBottom: '20px' }} />
                        <h3>No orders found yet</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Orders placed by customers will appear here.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {orders.map((order) => (
                            <div key={order._id} className="glass-panel" style={{ padding: '0', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                {/* Order Header Details */}
                                <div
                                    onClick={() => toggleExpand(order._id)}
                                    style={{
                                        padding: '20px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: expandedOrder === order._id ? 'rgba(255,255,255,0.03)' : 'transparent',
                                        transition: 'background 0.3s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{
                                            width: '50px', height: '50px', borderRadius: '12px',
                                            background: 'rgba(212, 175, 55, 0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'var(--color-gold-primary)'
                                        }}>
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Order #{order._id.slice(-6).toUpperCase()}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                                                <Calendar size={14} /> {formatDate(order.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Total Amount</div>
                                            <div style={{ color: 'var(--color-gold-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{order.totalAmount?.toFixed(2)}</div>
                                        </div>

                                        <div style={{
                                            padding: '6px 12px', borderRadius: '20px',
                                            background: order.status === 'Pending' ? 'rgba(255, 165, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)',
                                            color: order.status === 'Pending' ? 'orange' : '#4ade80',
                                            fontSize: '0.85rem', fontWeight: 'bold'
                                        }}>
                                            {order.status}
                                        </div>

                                        {expandedOrder === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedOrder === order._id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                                            {/* Shipping Info */}
                                            <div>
                                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: 'var(--color-gold-primary)' }}>
                                                    <MapPin size={18} /> Shipping Details
                                                </h4>
                                                <div style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                                    <p style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>{order.shippingDetails.firstName} {order.shippingDetails.lastName}</p>
                                                    <p style={{ margin: 0 }}>{order.shippingDetails.address}</p>
                                                    <p style={{ margin: 0 }}>{order.shippingDetails.city}, {order.shippingDetails.postalCode}</p>
                                                    <p style={{ margin: 0 }}>{order.shippingDetails.country}</p>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div>
                                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: 'var(--color-gold-primary)' }}>
                                                    <CreditCard size={18} /> Items ({order.items.length})
                                                </h4>
                                                <div style={{ display: 'grid', gap: '10px' }}>
                                                    {order.items.map((item, index) => (
                                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                {item.image && <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />}
                                                                <div>
                                                                    <p style={{ margin: 0, fontWeight: '500' }}>{item.title || item.name}</p>
                                                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Size: {item.size} | Qty: {item.quantity || item.qty}</p>
                                                                </div>
                                                            </div>
                                                            <div style={{ fontWeight: 'bold' }}>
                                                                ₹{(typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
