import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import eventEmitter from "../utils/eventEmitter";

export default function Header() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }

    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

  }, []);

  useEffect(() => {
    if (userEmail) {
      const fetchCartCount = async () => {
        try {
          const response = await fetch(`https://ecart-wybs.onrender.com/cart/countCart?email=${userEmail}`);
          const data = await response.json();
          setCartCount(data.count);
        } catch (error) {
          console.error('Error fetching cart count:', error);
        }
      };

      fetchCartCount();

      // Listen for cart updates
      eventEmitter.on('cartUpdated', fetchCartCount);

      // Cleanup listener on component unmount
      return () => {
        eventEmitter.off('cartUpdated', fetchCartCount);
      };
    }
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail'); // Optionally clear userEmail as well
    console.log('Logout successful');
    navigate('/home');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Links */}
        <div className="flex space-x-4">
          <Link to="/home" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/cart" className="flex items-center space-x-2 hover:text-gray-300">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
              {cartCount}
            </span>
          </Link>
        </div>

        {/* Right side - Logout and Greeting */}
        <div className="flex space-x-4 items-center">
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 focus:outline-none"
          >
            Logout
          </button>
          <span className="font-medium">Welcome!   {userName}</span>
        </div>
      </div>
    </nav>
  );
}
