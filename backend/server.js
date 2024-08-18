// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const getCartCount = require('./routes/cartCount');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Routes
app.use('/auth', authRoutes.router);
app.use('/cart', cartRoutes);
app.use('/cart', getCartCount);


app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
