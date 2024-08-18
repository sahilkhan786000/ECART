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

        const response = await fetch(`http://localhost:5000/cart/getCart?email=${email}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Fetched cart data is not an array");
        }

        const groupedItems = groupItemsByTitle(data);

        setCartItems(groupedItems); // Set the grouped items to state
        setIsLoading(false); // Stop the loading state
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError(error.message);
        setIsLoading(false); // Stop the loading state even on error
      }
    };

    fetchCartItems();
  }, []);

  // Function to group items by title and sum the quantities
  const groupItemsByTitle = (items) => {
    const groupedItems = {};

    items.forEach((item) => {
      if (groupedItems[item.title]) {
        groupedItems[item.title].quantity += item.quantity;
      } else {
        groupedItems[item.title] = { ...item };
      }
    });

    return Object.values(groupedItems); // Return array of unique items
  };

  // Function to handle item removal
  const removeItem = async (productTitle) => {
    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:5000/cart/deleteItem`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, productTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Update the cart after removing the item
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.title !== productTitle)
      );
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Function to handle clearing the entire cart
  const clearCart = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:5000/cart/deleteAll`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to clear the cart");
      }

      // Clear the cart in the state
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Render loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render empty cart message or items
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
                <p className="text-gray-700">Quantity: {item.quantity}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-700"
                  onClick={() => removeItem(item.title)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            className="bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-800"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
