import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
// Leaflet icon fix
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const stores = [
    { id: 1, name: "Aura Flagship - Mumbai", position: [19.0760, 72.8777], address: "High Street Phoenix, Lower Parel, Mumbai" },
    { id: 2, name: "Aura Boutique - Delhi", position: [28.6139, 77.2090], address: "Select Citywalk, Saket, New Delhi" },
    { id: 3, name: "Aura Studio - Bangalore", position: [12.9716, 77.5946], address: "UB City, Vittal Mallya Road, Bangalore" },
    { id: 4, name: "Aura Heritage - Jaipur", position: [26.9124, 75.7873], address: "MI Road, Jaipur" },
];

const Stores = () => {
    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Our Indian Boutiques</h1>
                <p style={{ textAlign: 'center', marginBottom: '60px', color: 'var(--color-text-secondary)' }}>
                    Visit our exclusive locations worldwide to experience the collection in person.
                </p>

                <div className="glass-panel" style={{ height: '600px', borderRadius: '16px', overflow: 'hidden' }}>
                    <MapContainer
                        center={[20.5937, 78.9629]}
                        zoom={5}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                        {stores.map(store => (
                            <Marker key={store.id} position={store.position}>
                                <Popup>
                                    <div style={{ color: 'black' }}>
                                        <strong>{store.name}</strong><br />
                                        {store.address}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '60px' }}>
                    {stores.map(store => (
                        <div key={store.id} className="glass-panel" style={{ padding: '20px', borderRadius: '12px' }}>
                            <h3 style={{ color: 'var(--color-gold-primary)', marginBottom: '10px' }}>{store.name}</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{store.address}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Stores;
