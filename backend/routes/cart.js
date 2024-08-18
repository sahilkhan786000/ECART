const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types; // Import ObjectId

// Add item to cart
router.post('/addCart', async (req, res) => {
  try {
    const { email, productId, image, title, price, quantity } = req.body;

    // Convert productId to ObjectId
    const productObjectId = new ObjectId(productId);

    // Verify email and check if cart exists for the user
    let cart = await Cart.findOne({ userEmail: email });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ userEmail: email, items: [] });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productObjectId.toString());

    if (itemIndex !== -1) {
      // Update quantity and price if item already exists
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = price;
      cart.items[itemIndex].dateAdded = new Date(); // Update the date
    } else {
      // Add new item to cart
      cart.items.push({ productId: productObjectId, image, title, price, quantity, dateAdded: new Date() });
    }

    await cart.save();

    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get cart items by email
router.get('/getCart', async (req, res) => {
  console.log('GET /cart request received');
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const cart = await Cart.findOne({ userEmail: email });

    if (!cart) {
      return res.status(200).json([]);
    }

    res.status(200).json(cart.items);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an individual cart item by email and product title
router.delete('/deleteItem', async (req, res) => {
  try {
    const { email, productTitle } = req.body;

    if (!email || !productTitle) {
      return res.status(400).json({ error: 'Email and productTitle are required' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userEmail: email });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item with the matching title
    cart.items = cart.items.filter(item => item.title !== productTitle);

    await cart.save();

    res.json({ message: 'Item removed successfully', cart });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete all cart items for a user by email
router.delete('/deleteAll', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find the user's cart and clear all items
    let cart = await Cart.findOne({ userEmail: email });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = []; // Clear all items

    await cart.save();

    res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
