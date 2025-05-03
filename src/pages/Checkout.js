import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Checkout = () => {
  // Dummy checkout data
  const { userId, token } = useSelector((state) => state.auth);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    fetchUserDetails(userId);
  }, [])

  const fetchUserDetails = async (userId) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
      credentials : "include"
    });

    if(!response.ok) {
      window.location.href = "/";
    }

    const data = await response.json();
    setShippingAddress({
        name : data.name,
        email : data.email,
        address : data.address,
        city : data.city,
        postalCode : data.postal_code,
        country : data.country
    })
  }

  const location = useLocation();
  const {cartId, cartItems, totalPrice} = location.state || { cartId : 0, cartItems : [], totalPrice : "0.00"}

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedAddress, setSavedAddress] = useState(null);
    const [useNewAddress, setUseNewAddress] = useState(false);

    const formatAddress = (address) => {
      return [address.address, address.city, address.state, address.postalCode, address.country]
          .filter(value => value && value.trim() !== "")
          .join(", ");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const emptyCart = async (cartId) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/${cartId}/empty`, {
        method : "DELETE",
        credentials : "include"
    });

    if(!response.ok) {
      window.location.href = "/";
    }
    const data = await response.json();
  }

  const createPayment = async (createdOrderId) => {
    try {
        console.log(createdOrderId);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/payment`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            credentials : "include",
            body : JSON.stringify({
                order_id : createdOrderId,
                payment_method : paymentMethod,
                status : (paymentMethod==='creditCard' ? 'COMPLETED' : 'PENDING'),
                payment_date : (paymentMethod==='creditCard' ? new Date().toISOString() : null)
            })
        })
        if (!response.ok) {
          window.location.href = "/";
        }
    
        const data = await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (orderId) {
        createPayment(orderId);
    }
}, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
        setError("Cart is empty");
        setLoading(false);
        return;
    }

    const orderRequest = {
        user_id: userId,
        items: cartItems.map((item) => ({
            product_id: item.product_response.id,
            quantity: item.quantity
        }))
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials : "include",
            body: JSON.stringify(orderRequest)
        });

        if (!response.ok) {
          window.location.href = "/";
        }

        const data = await response.json();
        setOrderId(data.order_id);

        emptyCart(cartId);

        setOrderConfirmed(true);

    } catch (error) {
        console.error("Error placing order:", error);
        setError("Failed to place order. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="checkout-container max-w-4xl mx-auto p-8 bg-gray-50 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Checkout</h2>

      <div className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
        <p className="text-lg font-semibold">Total Items: {cartItems.length}</p>
        <p className="text-lg font-semibold">Total Price: ${totalPrice}</p>
      </div>

      {/* Shipping Address Form */}
      <div className="shipping-address bg-white p-6 rounded-md shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>

            {/* Show saved address card if available and not using new address */}
            {savedAddress && !useNewAddress ? (
                <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-100">
                    <h4 className="text-lg font-semibold mb-2">Saved Address</h4>
                    <p className="text-gray-700">{formatAddress(savedAddress)}</p>

                    <div className="mt-4 flex justify-between">
                        <button 
                            onClick={() => handleSubmit(savedAddress)} 
                            className="px-6 py-3 bg-blue-500 text-white rounded-md">
                            Deliver Here
                        </button>
                        <button 
                            onClick={() => setUseNewAddress(true)} 
                            className="px-6 py-3 bg-gray-500 text-white rounded-md">
                            Use Different Address
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={(e) => handleSubmit(e, shippingAddress)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2" htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" value={shippingAddress.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={shippingAddress.email} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={shippingAddress.address} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2" htmlFor="city">City</label>
                            <input type="text" id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" htmlFor="postalCode">Postal Code</label>
                            <input type="text" id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-semibold mb-2" htmlFor="country">Country</label>
                        <input type="text" id="country" name="country" value={shippingAddress.country} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md" />
                    </div>

                    {/* Payment Method */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                        <div>
                            <label className="inline-flex items-center mr-6">
                                <input type="radio" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={handlePaymentChange} className="mr-2" />
                                Credit Card
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" value="cashOnDelivery" checked={paymentMethod === 'cashOnDelivery'} onChange={handlePaymentChange} className="mr-2" />
                                Cash On Delivery
                            </label>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                        <button type="button" className="px-6 py-3 bg-gray-500 text-white rounded-md" onClick={() => setUseNewAddress(false)}>Cancel</button>
                        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md">Place Order</button>
                    </div>
                </form>
            )}
      </div>

      {/* Order Confirmation */}
      {orderConfirmed && (
        <div className="order-confirmation bg-green-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold">Order Placed Successfully!</h3>
          <p>Thank you for your purchase. You will receive an email with the details of your order.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
