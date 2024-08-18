import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Subscribed with email:", email);
    setEmail(""); // Clear the input after submission
  };

  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-wrap justify-between items-start">
        {/* Left side - Contact Information */}
        <div className="flex flex-col space-y-2">
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-gray-400">1234 Street Name, City, Country</p>
            <p className="text-gray-400">Email: contact@example.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Right side - Newsletter Subscription */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <p className="text-gray-400">Subscribe to our newsletter for the latest updates.</p>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-600 pt-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}
