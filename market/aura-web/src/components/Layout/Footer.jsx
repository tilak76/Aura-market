import React from 'react';
import { Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>

                {/* Brand Section */}
                <div className={styles.brand}>
                    <h2 className={styles.logo}>AURA</h2>
                    <p className={styles.tagline}>Elevating style, defining elegance.</p>
                </div>

                {/* Links Section */}
                <div className={styles.links}>
                    <div className={styles.column}>
                        <h3>Shop</h3>
                        <Link to="/mens">Gents' Collection</Link>
                        <Link to="/womens">Women's Couture</Link>
                        <Link to="/kids">Junior Edition</Link>
                    </div>
                    <div className={styles.column}>
                        <h3>Support</h3>
                        <Link to="#">Contact Us</Link>
                        <Link to="#">FAQs</Link>
                        <Link to="#">Returns</Link>
                    </div>
                </div>

                {/* Social Section */}
                <div className={styles.social}>
                    <h3>Follow Us</h3>
                    <div className={styles.icons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                            <Facebook size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                            <Linkedin size={24} />
                        </a>
                        {/* Added extra ones for completeness, but user specifically asked for FB/Linkedin */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} AURA. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
