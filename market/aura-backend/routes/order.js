const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public (for now)
router.post('/', async (req, res) => {
    try {
        const { shippingDetails, items, totalAmount } = req.body;

        // Validations can go here

        const newOrder = new Order({
            shippingDetails,
            items,
            totalAmount
            // user: req.user.id // Add this if authentication is middleware is used
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/orders
// @desc    Get all orders (Admin view)
// @access  Public (should be private/admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
