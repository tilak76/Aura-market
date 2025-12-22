import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={`container ${styles.content}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.subtitle}>ELEVATE YOUR STYLE</h2>
                    <h1 className={styles.title}>AURA</h1>
                    <p className={styles.description}>
                        Experience the pinnacle of fashion with our exclusive collections.
                        Premium quality, timeless design.
                    </p>

                    <div className={styles.buttons}>
                        <Link to="/mens">
                            <button className="btn-primary">
                                Shop Men <ChevronRight size={18} style={{ marginLeft: 8, verticalAlign: 'middle' }} />
                            </button>
                        </Link>
                        <Link to="/womens">
                            <button className={styles.btnOutline}>
                                Shop Women
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
