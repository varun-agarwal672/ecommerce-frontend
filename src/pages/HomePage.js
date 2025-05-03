import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AutoScrollCarousel from "../components/AutoScrollCarousel";

const HomePage = () => {
  const { token } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log("token : ", token);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/category`, {
        method : "GET",
        headers : {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      if (!response.ok) {
        window.location.href = "/";
      }
      const data = await response.json();
      setCategories(data); // Ensure the API returns an array
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const products = [
    { id: 1, name: "Smartphone", price: "$499", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Headphones", price: "$99", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Smartwatch", price: "$199", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Gaming Console", price: "$299", image: "https://via.placeholder.com/150" }
  ];

  const navigate = useNavigate(); // Hook to navigate

  const handleCategoryClick = (categoryId) => {
    navigate(`/product/${categoryId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="sticky top-0 z-10 bg-white shadow-md">
  <div className="flex justify-center items-center gap-10 px-6 py-2 overflow-x-auto">
    {categories.length > 0 ? (
      categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-gray-100 px-4 py-1 rounded-md shadow-sm hover:bg-gray-200 transition cursor-pointer"
          onClick={() => handleCategoryClick(category.id)}
        >
          <img
            src={category.icon_url}
            alt={category.name}
            className="w-7 h-7 object-cover"
          />
          <span className="mt-2 text-sm font-medium">{category.name}</span>
        </div>
      ))
    ) : (
      <p className="text-gray-500">Loading categories...</p>
    )}
  </div>
</section>

      <AutoScrollCarousel/>
      

      {/* Banner */}
      <section className="bg-blue-500 text-white text-center p-10">
        <h2 className="text-3xl font-semibold">Big Sale - Up to 50% Off!</h2>
        <p className="mt-2">Shop now and grab the best deals on your favorite items.</p>
      </section>

      {/* Categories */}
      {/* <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </section> */}

      {/* Featured Products */}
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded" />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-blue-600">{product.price}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
