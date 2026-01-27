import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Shop = ({ category }) => {
  const { products, addToCart } = useShop();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Filters
  const [priceSort, setPriceSort] = useState('none');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Map route category to db key
    let dataKey = category;
    if (category === 'outdoor') dataKey = 'camping';
    const data = products[dataKey] || [];
    setItems(data);
    setFilteredItems(data);
  }, [category, products]);

  useEffect(() => {
    let result = [...items];
    if (priceSort === 'asc') {
      result.sort((a, b) => parseFloat(String(a.price).replace('$', '')) - parseFloat(String(b.price).replace('$', '')));
    } else if (priceSort === 'desc') {
      result.sort((a, b) => parseFloat(String(b.price).replace('$', '')) - parseFloat(String(a.price).replace('$', '')));
    }
    setFilteredItems(result);
  }, [items, priceSort]);

  // Category-specific fallback images
  const fallbacks = {
    mens: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
    womens: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    kids: "https://images.unsplash.com/photo-1519238263496-65260f3e2610?auto=format&fit=crop&w=600&q=80",
    outdoor: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
  };

  const handleImageError = (e) => {
    const target = e.target;
    if (target.src !== fallbacks[category]) {
      target.src = fallbacks[category] || fallbacks['mens'];
    }
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title"
          style={{ textTransform: 'uppercase' }}
        >
          {category === 'mens' ? "Gents' Collection" :
            category === 'womens' ? "Women's Couture" :
              category === 'kids' ? "Junior Edition" : "Outdoor Gear"}
        </motion.h1>
        <p style={{ color: 'var(--color-gold-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {filteredItems.length} Curated Styles
        </p>
      </header>

      {/* Filter and Sort Bar */}
      <div className="glass-panel" style={{
        padding: '15px 30px', margin: '0 0 40px 0', borderRadius: '50px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => setShowFilters(!showFilters)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'white', border: 'none' }}>
            <Filter size={18} /> Filters
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Sort by:</span>
          <button onClick={() => setPriceSort(prev => prev === 'asc' ? 'desc' : 'asc')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', color: 'white' }}>
            Price <ArrowUpDown size={14} />
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '40px'
      }}>
        {filteredItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              borderRadius: '16px',
            }}
          >
            {/* Image Section */}
            <div
              style={{ position: 'relative', height: '380px', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => navigate('/product', { state: { product: item } })}
            >
              <img
                src={item.img1}
                onError={handleImageError}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
              />

              {/* Overlay Actions */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
              }}>
                <div>
                  {item.jss219 && (
                    <span style={{
                      background: 'var(--color-coral-accent)', color: 'white',
                      padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold',
                      marginBottom: '8px', display: 'inline-block'
                    }}>
                      {item.jss219}
                    </span>
                  )}
                  <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '4px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    ₹{item.price}
                  </p>
                </div>

                <div
                  onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                  style={{
                    background: 'white', color: 'black', border: 'none',
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <ShoppingBag size={18} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
