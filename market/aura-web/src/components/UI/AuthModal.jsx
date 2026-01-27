import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = isLogin
            ? 'http://localhost:5000/api/auth/login'
            : 'http://localhost:5000/api/auth/register';

        const body = isLogin
            ? { email: formData.email, password: formData.password }
            : formData;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Something went wrong');
            }

            // Save token and role
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            // We need a way to update the context without prop drilling, 
            // but for now, we'll reload or rely on the user refreshing mainly.
            // Better: Dispatch custom event or use context if we passed it in.
            window.dispatchEvent(new Event('storage')); // Simple hack if we listen for it

            alert(data.msg);
            onClose();
            window.location.reload(); // Reload to refresh context state from localStorage
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className={styles.backdrop} onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className={`${styles.modal} glass-panel`}
                >
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>

                    <h2 className={styles.title}>{isLogin ? 'WELCOME BACK' : 'JOIN AURA'}</h2>
                    <p className={styles.subtitle}>
                        {isLogin ? 'Access your exclusive collection' : 'Begin your journey with us'}
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className={styles.inputGroup}>
                                <User size={18} className={styles.icon} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className={styles.inputGroup}>
                            <Mail size={18} className={styles.icon} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <Lock size={18} className={styles.icon} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                            {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
                        </button>
                    </form>

                    <p className={styles.switch}>
                        {isLogin ? "New to AURA? " : "Already a member? "}
                        <span onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Register Now" : "Sign In"}
                        </span>
                    </p>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
