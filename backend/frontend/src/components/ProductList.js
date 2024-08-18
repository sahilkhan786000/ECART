import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import eventEmitter from '../utils/eventEmitter'; // Adjust the path as needed

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState(null); // State to store the user's email
  const [token, setToken] = useState(null); // State to store the token

  useEffect(() => {
    // Fetch products from the API
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));

    // Retrieve the email and token from local storage or authentication
    // const storedEmail = localStorage.getItem('userEmail');
    const storedToken = localStorage.getItem('authToken');
    
    // if (storedEmail) setEmail(storedEmail);
    if (storedToken) setToken(storedToken);
     
    // console.log('User email:', storedEmail);
    console.log('Auth token:', storedToken);
    if (storedToken) {
      try {
        // Decode the token to get the payload (including the email)
        const decoded = jwtDecode(storedToken);
        console.log("Decoded Token: ", decoded);
        
        // Extract the email from the decoded token
        setEmail(decoded.email);
        //store this email in local storage
        localStorage.setItem('userEmail', decoded.email);
      } catch (error) {
        console.error('Error decoding the token:', error);
      }
    } else {
      console.log('No token found');
    }
  }, []);

  // Handle the "Add to Cart" action
  const handleAddToCart = (product) => {
    if (!email) {
      alert('Please log in to add items to the cart.');
      return;
    }

    const { id: productId, image, title, price } = product;
    const quantity = 1; // Default quantity for new items added to the cart

    fetch('https://ecart-wybs.onrender.com/cart/addCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, productId, image, title, price, quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Cart updated successfully') {

          alert('Product added to cart successfully!');
            // Emit an event to update cart count
          eventEmitter.emit('cartUpdated');
          if (addToCart) {
            addToCart(product);
          }
        } else {
          alert('Error adding to cart: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart');
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg flex flex-col bg-white shadow-md">
          <div className="relative overflow-hidden w-full h-96 mb-4 rounded">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 truncate">{product.title}</h2>
          <p className="text-lg text-gray-600 mb-2">${product.price.toFixed(2)}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
