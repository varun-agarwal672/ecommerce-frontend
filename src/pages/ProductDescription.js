import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // To fetch product ID from the URL
import { useSelector } from 'react-redux';

const ProductDescription = () => {
    const { productId } = useParams();
    const { userId, token } = useSelector((state) => state.auth);
    const [product, setProduct] = useState();
    const [cartId, setCartId] = useState();
    const [isProductAdded, setIsProductAdded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            fetchProductDetail(productId);
            fetchCartOfUser(userId);
        }
    }, []);

    useEffect(() => {
        if(cartId) {
            isProductAddedToCart(cartId);
        }
    }, [cartId]);

    const fetchCartOfUser = async (userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/user`, {
                credentials : "include"
              })
            if (!response.ok) {
                window.location.href = "/";
                return false;
            }
            const data = await response.json();
            setCartId(data.id);
        } catch(err) {
            throw new Error("Error occurred "+err);
        }
    }

    const fetchProductDetail = async (productId) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/product/${productId}`, {
            credentials : "include"
          })
            .then((res) => {
                if(!res.ok) window.location.href = "/";
                return res.json()})
            .then((data) => setProduct(data))
            .catch((err) => {
                console.log("error occurred " + err);
            })
    }

    const isProductAddedToCart = async (cartId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/${cartId}?product-id=${encodeURIComponent(productId)}`, {
                credentials : "include"
              })
            if (!response.ok) {
                window.location.href = "/";
                return false;
            }
            const data = await response.json();
            setIsProductAdded(data);
            return true;
        } catch(err) {
            throw new Error("Error occurred "+err);
        }
    }

    // Function to handle Add to Cart (can be connected to cart system)
    const addToCart = async (cartItem) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials : "include",
                body: JSON.stringify(cartItem)
            });

            if (!response.ok) {
                window.location.href = "/";
                throw new Error("Error while adding product to cart");
            }
            
            setIsProductAdded(true);

        } catch (err) {
            console.log("Error occurred " + err);
        }
    };

    const handleCartClick = () => {
        navigate(`/cart`);
    }
    

    // Show loading message while fetching product
    //   if (!product) {
    //     return <div className="text-center mt-12 text-2xl">Loading Product Details...</div>;
    //   }

    return (
        product != null ?
            (<div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div>
                        <img src={product.image_url} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="text-4xl font-semibold">{product.name}</h1>
                        <p className="text-gray-600 text-lg mt-2">{product.description}</p>
                        <div className="mt-4">
                            <span className="text-2xl font-bold">${product.price}</span>
                        </div>

                        {/* Add to Cart Button */}
                        {!isProductAdded ? (<button
                            onClick={() => addToCart({
                                user_id: userId,
                                product_id: product.id,
                                quantity: 1
                            })}
                            className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>) : (
                            <button
                            onClick={() => handleCartClick()}
                            className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                        >
                            Go to Cart
                        </button>
                        )}
                    </div>
                </div>

                {/* Product Specifications (Optional) */}
                <div className="mt-12 bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Product Specifications</h2>
                    <ul className="list-disc pl-5">
                        <li>Size: Medium</li>
                        <li>Material: High-quality material</li>
                        <li>Color: Available in Black and White</li>
                    </ul>
                </div>
            </div>) : (
                <p>Loading categories...</p>
            )
    );
};

export default ProductDescription;
