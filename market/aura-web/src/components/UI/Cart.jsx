import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQty, cartTotal } = useShop();
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 1001 }}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100%',
                            background: '#0a0a0a', borderLeft: '1px solid #333', zIndex: 1002, display: 'flex', flexDirection: 'column'
                        }}
                    >
                        <div style={{ padding: '24px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold-primary)' }}>YOUR BAG ({cart.length})</h2>
                            <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                            {cart.length === 0 ? (
                                <p style={{ color: '#888', textAlign: 'center' }}>Your bag is empty.</p>
                            ) : (
                                cart.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #222', paddingBottom: '16px' }}>
                                        <img src={item.img1} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{item.title}</h4>
                                            <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>Size: {item.size}</p>
                                            <p style={{ color: 'var(--color-gold-primary)', marginBottom: '8px' }}>₹{item.price}</p>

                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#222', borderRadius: '4px', padding: '4px' }}>
                                                    <button onClick={() => updateQty(item.title, item.size, -1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Minus size={14} /></button>
                                                    <span style={{ fontSize: '0.9rem' }}>{item.qty}</span>
                                                    <button onClick={() => updateQty(item.title, item.size, 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Plus size={14} /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.title, item.size)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div style={{ padding: '24px', borderTop: '1px solid #333', background: '#111' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                <span>TOTAL</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <button className="btn-primary" style={{ width: '100%' }} onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}>
                                CHECKOUT
                            </button>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
