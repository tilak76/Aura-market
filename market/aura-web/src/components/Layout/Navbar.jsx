import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, MapPin, LayoutDashboard } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import AuthModal from '../UI/AuthModal';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { cart, searchQuery, setSearchQuery, searchResults, setIsCartOpen, userRole } = useShop();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <nav className={styles.navbar}>
                <div className={`container ${styles.navContainer}`}>
                    {/* Mobile Menu Toggle */}
                    <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Logo */}
                    <Link to="/" className={styles.logo}>
                        AURA
                    </Link>

                    {/* Desktop Links */}
                    <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
                        <Link to="/mens" className={styles.link}>GENTS' COLLECTION</Link>
                        <Link to="/womens" className={styles.link}>WOMEN'S COUTURE</Link>
                        <Link to="/kids" className={styles.link}>JUNIOR EDITION</Link>
                        <Link to="/outdoor" className={styles.link}>OUTDOOR GEAR</Link>
                        <Link to="/stores" className={styles.link} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <MapPin size={16} /> STORES
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        {/* Smart Search */}
                        <div className={styles.searchWrapper}>
                            <div className={styles.searchBar}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                            {/* Search Dropdown */}
                            {searchQuery && (
                                <div className={styles.searchResults}>
                                    {searchResults.length > 0 ? (
                                        searchResults.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={styles.resultItem}
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    navigate('/product', { state: { product: item } });
                                                }}
                                            >
                                                <img src={item.img1} alt="" />
                                                <div>
                                                    <p className={styles.resultTitle}>{item.title}</p>
                                                    <p className={styles.resultPrice}>₹{item.price}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.noResults}>No matches found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Admin Link only for admins */}
                        {userRole === 'admin' && (
                            <Link to="/admin" className={styles.actionBtn} title="Admin Dashboard">
                                <LayoutDashboard size={20} />
                            </Link>
                        )}

                        <button className={styles.actionBtn} onClick={() => setIsAuthOpen(true)}>
                            <User size={20} />
                        </button>

                        <button className={styles.actionBtn} onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag size={20} />
                            {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
