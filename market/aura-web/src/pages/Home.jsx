import React from 'react';
import Hero from '../components/UI/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    const categories = [
        { title: "GENTS' COLLECTION", img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49a91?auto=format&fit=crop&w=600&q=80", link: "/mens" },
        { title: "WOMEN'S COUTURE", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", link: "/womens" },
        { title: "JUNIOR EDITION", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80", link: "/kids" },
        { title: "OUTDOOR GEAR", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80", link: "/outdoor" }
    ];

    return (
        <div>
            <Hero />

            <section className="container" style={{ padding: '80px 24px' }}>
                <h2 className="section-title">CURATED COLLECTIONS</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {categories.map((cat, idx) => (
                        <Link to={cat.link} key={idx}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                style={{ position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                            >
                                <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.4s' }} />
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '24px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                                }}>
                                    <h3 style={{ color: 'var(--color-gold-primary)', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
                                        {cat.title}
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
