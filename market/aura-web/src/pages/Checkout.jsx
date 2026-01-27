import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useShop();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
            return;
        }

        if (step === 2) {
            setLoading(true);
            setError('');

            const orderData = {
                shippingDetails: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    country: formData.country,
                    postalCode: formData.postalCode
                },
                items: cart,
                totalAmount: cartTotal
            };

            try {
                const response = await fetch('http://localhost:5000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                if (!response.ok) {
                    throw new Error('Failed to place order');
                }

                // Order successful
                if (clearCart) clearCart(); // create this function in context if it doesn't exist or just ignore for now
                setStep(3);
            } catch (err) {
                console.error(err);
                setError('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (cart.length === 0 && step === 1) {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                <h2>Your bag is empty</h2>
                <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '40px', borderRadius: '16px' }}>
                <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>Secure Checkout</h1>

                {/* Steps */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
                    <div style={{ height: '2px', background: '#333', position: 'absolute', top: '50%', left: '0', right: '0', zIndex: -1 }}></div>
                    {[1, 2, 3].map(num => (
                        <div key={num} style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: step >= num ? 'var(--color-gold-primary)' : '#333',
                            color: step >= num ? 'black' : '#888',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                        }}>
                            {step > num ? <CheckCircle size={20} /> : num}
                        </div>
                    ))}
                </div>

                {step === 3 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                            <CheckCircle size={80} color="var(--color-gold-primary)" style={{ marginBottom: '20px' }} />
                        </motion.div>
                        <h2>Order Confirmed!</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>Thank you for your purchase. We have received your shipping details.</p>
                        <Link to="/" className="btn-primary">Return to Home</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                {step === 1 ? 'Shipping Information' : 'Payment Details'}
                            </h3>

                            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

                            {step === 1 ? (
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <input className="input-field" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                                        <input className="input-field" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                                    </div>
                                    <input className="input-field" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                                    <input className="input-field" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <input className="input-field" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                                        <input className="input-field" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    <div style={{ padding: '20px', border: '1px solid var(--color-gold-primary)', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <CreditCard /> <span>Credit Card (Mock)</span>
                                    </div>
                                    <input className="input-field" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <input className="input-field" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} required />
                                        <input className="input-field" name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} required />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', borderTop: '1px solid #333', paddingTop: '20px' }}>
                            <div style={{ textAlign: 'left' }}>
                                <p style={{ color: 'var(--color-text-secondary)' }}>Total Amount:</p>
                                <h2 style={{ color: 'var(--color-gold-primary)' }}>₹{cartTotal.toFixed(2)}</h2>
                            </div>
                            <button disabled={loading} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: loading ? 0.7 : 1 }}>
                                {loading ? 'Processing...' : (step === 2 ? 'Pay Now' : 'Continue')} <ArrowRight size={18} />
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Checkout;
