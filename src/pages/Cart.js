import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = () => {
    const { userId, token } = useSelector((state) => state.auth);
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState();

    useEffect(() => {
        fetchCartDetails(userId);
    }, [])

    const fetchCartDetails = async (userId) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/cart/user`, {
            credentials : "include"
          })
            .then((res) => {
                if(!res.ok) window.location.href = "/";
                return res.json()})
            .then((data) => {
                setCartId(data.id)
                setCartItems(data.cart_item_response_list)
            })
            .catch((err) => console.log("Error occurred while fetching cart details " + err));
    }

    const navigate = useNavigate();

    // Update item quantity in the cart
    const handleQuantityChange = async (cartItem) => {
        if (cartItem.quantity < 0) return; // Prevents negative or zero quantity

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/${cartId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials : "include",
                body: JSON.stringify(cartItem)
            });

            if (!response.ok) {
                window.location.href = "/";
            }

            const data = await response.json();
            const updatedItem = data.cart_item_response_list[0];

            if (!updatedItem) {
                console.error("Updated item not found in response");
                return;
            }

            // Update cart items state with the modified item
            const updatedItems = cartItems.map((item) =>
                item.id === updatedItem.id ? { ...updatedItem } : item
            );

            setCartItems(updatedItems);

        } catch (err) {
            console.error("Error occurred while updating quantity:", err);
        }
    };


    // Remove an item from the cart
    const handleRemoveItem = async (cartItem) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/${cartId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials : "include",
                body: JSON.stringify(cartItem)
            })

            if (!response.ok) {
                window.location.href = "/";
            }

            const updatedItems = cartItems.filter((item) => item.id !== cartItem.cart_item_id);
            setCartItems(updatedItems);
        } catch (error) {
            console.log("Error occurred " + error);
        }
    };

    // Calculate the total price of the cart
    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.product_response.price * item.quantity,
            0
        );
    };

    const handleOrderClick = () => {
        const totalPrice = calculateTotal().toFixed(2);

        navigate("/place-order", { state: { cartId, cartItems, totalPrice } });
    }

    return (
        cartItems == null || cartItems.length == 0 ? (
            <p>Your cart is empty!</p>
        ) : (
            <div className="cart-container p-4 bg-gray-100 rounded-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

                {/* Cart items */}
                <div>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="cart-item flex justify-between items-center p-4 mb-4 bg-white rounded-md shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                {/* Product Image */}
                                <img
                                    src={item.product_response.image_url}
                                    alt={item.product_response.name}
                                    className="w-28 h-28 object-contain"
                                />

                                {/* Product Details */}
                                <div className="flex flex-col justify-between">
                                    <h3 className="font-semibold">{item.product_response.name}</h3>
                                    <p className="mt-2 text-gray-600">${item.product_response.price} each</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="p-2 text-white bg-red-500 rounded-md"
                                    onClick={() => handleRemoveItem({
                                        cart_item_id: item.id
                                    })}
                                >
                                    Remove
                                </button>
                                <div className="flex items-center ml-4">
                                    <button
                                        className={`p-2 rounded-l-md ${item.quantity <= 1 ? "bg-gray-400" : "bg-blue-500 text-white"
                                            }`}
                                        onClick={() =>
                                            handleQuantityChange({
                                                cart_item_id: item.id,
                                                quantity: item.quantity - 1
                                            })
                                        }
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>

                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        className="p-2 text-white bg-blue-500 rounded-r-md"
                                        onClick={() =>
                                            handleQuantityChange({
                                                cart_item_id: item.id,
                                                quantity: item.quantity + 1
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart total */}
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold">
                        Total: ${calculateTotal().toFixed(2)}
                    </p>
                    <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md" onClick={handleOrderClick}>
                        Place Order
                    </button>
                </div>
            </div>)
    );
};

export default Cart;
