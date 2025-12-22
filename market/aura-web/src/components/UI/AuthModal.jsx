import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

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

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div className={styles.inputGroup}>
                                <User size={18} className={styles.icon} />
                                <input type="text" placeholder="Full Name" />
                            </div>
                        )}
                        <div className={styles.inputGroup}>
                            <Mail size={18} className={styles.icon} />
                            <input type="email" placeholder="Email Address" />
                        </div>
                        <div className={styles.inputGroup}>
                            <Lock size={18} className={styles.icon} />
                            <input type="password" placeholder="Password" />
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
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
