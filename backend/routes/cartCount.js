const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types; // Import ObjectId


// get cart count
router.get('/countCart', async (req, res) => {
  console.log('GET /cart request received');
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const cart = await Cart.findOne({ userEmail: email });

    if (!cart) {
      return res.status(200).json({ count: 0 });
    }

    const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    res.status(200).json({ count });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;