import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowLeft, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useShop();
    const product = location.state?.product;

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    // ... existing image selection code ...

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        addToCart(product, selectedSize, quantity);
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        addToCart(product, selectedSize, quantity);
        navigate('/checkout');
    }

    return (
        // ... container ...
        // ... button back ...
        // ... grid ...
        // ... gallery ...

        // Info Section
        <div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <h4 style={{ color: 'var(--color-gold-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>
                    {product.category || "Exclusive Collection"}
                </h4>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', margin: '10px 0' }}>{product.title} {product.title2}</h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{product.price}</span>
                    {product.jss219 && (
                        <span style={{ background: 'var(--color-coral-accent)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                            {product.jss219}
                        </span>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '5px', marginBottom: '30px', color: '#ffb400' }}>
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="#ffb400" />)}
                    <span style={{ color: 'var(--color-text-secondary)', marginLeft: '10px' }}>(124 Reviews)</span>
                </div>

                {/* Size Selector */}
                <div style={{ marginBottom: '30px' }}>
                    <h5 style={{ marginBottom: '10px', color: 'var(--color-text-secondary)' }}>SELECT SIZE</h5>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                style={{
                                    width: '50px', height: '50px', borderRadius: '8px', border: selectedSize === size ? '2px solid var(--color-gold-primary)' : '1px solid #333',
                                    background: selectedSize === size ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
                                    color: selectedSize === size ? 'white' : '#888', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s'
                                }}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity Selector */}
                <div style={{ marginBottom: '40px' }}>
                    <h5 style={{ marginBottom: '10px', color: 'var(--color-text-secondary)' }}>QUANTITY</h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#111', width: 'fit-content', padding: '10px 20px', borderRadius: '30px', border: '1px solid #333' }}>
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                    </div>
                </div>

                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '40px' }}>
                    Experience the perfect blend of style and comfort. Meticulously crafted with premium materials to ensure durability and a sophisticated look. Perfect for any occasion.
                </p>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <button className="btn-primary" onClick={handleAddToCart} style={{ flex: 1, padding: '16px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <ShoppingBag /> Add to Cart
                    </button>
                    <button onClick={handleBuyNow} style={{
                        flex: 1, padding: '16px', borderRadius: '4px', border: '2px solid var(--color-gold-primary)',
                        background: 'transparent', color: 'var(--color-gold-primary)', fontWeight: 'bold', letterSpacing: '1px',
                        cursor: 'pointer', transition: 'all 0.3s'
                    }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                        BUY NOW
                    </button>
                </div>


                {/* Features */}
                <div style={{ marginTop: '60px', display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <Truck size={24} color="var(--color-gold-primary)" />
                        <div>
                            <h5 style={{ fontWeight: 'bold' }}>Free Shipping across India</h5>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>On all orders over ₹2000</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <ShieldCheck size={24} color="var(--color-gold-primary)" />
                        <div>
                            <h5 style={{ fontWeight: 'bold' }}>Lifetime Warranty</h5>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Guaranteed quality and craftsmanship</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <RefreshCw size={24} color="var(--color-gold-primary)" />
                        <div>
                            <h5 style={{ fontWeight: 'bold' }}>30-Day Returns</h5>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>No questions asked return policy</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductDetails;
