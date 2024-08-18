// server.js
const express = require('express');
const mongoDB = require('./db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const getCartCount = require('./routes/cartCount');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use('/auth', authRoutes.router);
app.use('/cart', cartRoutes);
app.use('/cart', getCartCount);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"), function (err) {
    res.status(500).send(err);
  });
});

const PORT = process.env.PORT || 5000;
mongoDB();
app.listen(PORT, () => {
  console.log(`Server is started on PORT ${PORT}`);
});
