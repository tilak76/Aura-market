const mongoose = require('mongoose');
const User = require('./market/aura-backend/models/User'); // Adjust path as needed
const dotenv = require('dotenv');

dotenv.config({ path: './market/aura-backend/.env' });

const setAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aura_market');
        console.log('MongoDB Connected');

        const email = 'tilakmishra.76@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`SUCCESS: User ${email} is now an ADMIN.`);
        } else {
            console.log(`User ${email} not found. Please register first.`);
        }

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

setAdmin();
