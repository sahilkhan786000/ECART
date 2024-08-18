import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="relative w-full h-72 mx-auto mt-8"> {/* Carousel container */}
      <div className="relative overflow-hidden w-full h-full rounded-lg">
        {products.length > 0 && (
          <div
            className="carousel-wrapper flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
             // Ensure the width is enough to display all items
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="carousel-item flex-shrink-0 w-full h-full flex items-center justify-center" // Center images
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className=" h-72 object-cover" // Ensure the image scales properly
                />
              </div>
            ))}
          </div>
        )}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full z-10"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
