const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Cart schema
const cartSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
    trim: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product' // Assumes you have a Product model
      },
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      dateAdded: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
