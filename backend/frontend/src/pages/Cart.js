import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          throw new Error("User email not found in localStorage");
        }

        const response = await fetch(`http://localhost:5000/cart/getItems?email=${email}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Fetched cart data is not an array");
        }

        // Assign random discount percentages between 10% and 40% to each item
        const itemsWithDiscounts = data.map(item => ({
          ...item,
          discountPercent: Math.floor(Math.random() * 31) + 10 // Generates random discount between 10% and 40%
        }));

        setCartItems(itemsWithDiscounts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Function to calculate the discount amount in monetary value
  const calculateDiscountAmount = (price, discountPercent) => {
    return (price * discountPercent) / 100;
  };

  // Function to calculate the subtotal of all items in the cart before applying discounts
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Function to calculate the total discount across all items in the cart
  const calculateTotalDiscount = () => {
    return cartItems.reduce(
      (acc, item) => acc + calculateDiscountAmount(item.price, item.discountPercent) * item.quantity,
      0
    );
  };

  // Function to calculate the total price after applying discounts
  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const totalDiscount = calculateTotalDiscount();
    return subtotal - totalDiscount;
  };

  // Add item to cart (for demo purposes)
  const addItem = (title) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity in cart (for demo purposes)
  const deleteItem = (title) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.title === title && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Remove all quantities of an item from the cart
  const removeItems = (title) => {
    setCartItems(prevItems => prevItems.filter(item => item.title !== title));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {cartItems.length === 0 ? (
        <h2 className="text-xl font-semibold">Cart is empty</h2>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Your items are:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="border rounded-lg p-4 shadow-md">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-2" />
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                <p className="text-green-600">
                  Discount: {item.discountPercent}% (${calculateDiscountAmount(item.price, item.discountPercent).toFixed(2)})
                </p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => deleteItem(item.title)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => addItem(item.title)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-700"
                  onClick={() => removeItems(item.title)}
                >
                  Remove All
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4">
            <h3 className="text-xl font-semibold">Cart Summary</h3>
            <p className="text-gray-700 mt-2">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
            <p className="text-gray-700 mt-2">Total Discount: ${calculateTotalDiscount().toFixed(2)}</p>
            <p className="text-gray-700 mt-2 font-semibold">
              Total: ${calculateTotalPrice().toFixed(2)}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
              onClick={() => alert('Proceeding to checkout...')}
            >
              Checkout
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-red-800"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
