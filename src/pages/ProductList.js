import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Dummy Data (Replace with API data in real implementation)

const ProductList = () => {
  const { token } = useSelector((state) => state.auth);
    const { categoryId } = useParams();
    const[products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    if(categoryId) {
        fetchProducts(categoryId);
    }
  }, [categoryId]);

  const fetchProducts = async (categoryId) => {
    fetch(`http://localhost:8019/product/category/${categoryId}`, {
      credentials : "include"
    })
    .then((response) => {
      if(!response.ok) window.location.href = "/";
      return response.json()})
    .then((data) => setProducts(data))
    .catch((err) => {
        console.error("Error fetching products"+err);
    })
  }

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        { products.length > 0 ? (products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500 mt-2">${product.price}</p>
              <button
                onClick={() => handleProductClick(product.id)}
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                View
              </button>
            </div>
          </div>
        ))) : (
            <p>
                Loading products...
            </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
