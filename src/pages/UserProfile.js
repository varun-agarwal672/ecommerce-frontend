import React, { useState, useEffect } from "react";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: ""
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const generateAddress = (address, city, state, postalCode, country) => {
        return [address, city, state, postalCode, country]
            .filter(value => value && value.trim() !== "")
            .join(", ");
    };
    
 
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
                method: "GET",
                credentials: "include", // Include cookies/session for auth
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setFormData({ name: data.name, email: data.email, address: data.address, city: data.city, state: data.state, postal_code: data.postal_code.toString(), country: data.country });
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setEditMode(false);
            } else {
                console.error("Failed to update user details");
            }
        } catch (error) {
            console.error("Error updating user profile", error);
        }
    };

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">User Profile</h2>

        {!editMode ? (
            <div className="text-gray-700 space-y-3">
                <p><strong className="text-gray-900">Name:</strong> {user.name}</p>
                <p><strong className="text-gray-900">Email:</strong> {user.email}</p>
                <p><strong className="text-gray-900">Address:</strong> {generateAddress(user.address,user.city,user.state,user.postal_code.toString(),user.country) || "Not provided"}</p>
                <button 
                    onClick={() => setEditMode(true)} 
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition">
                    Edit Profile
                </button>
            </div>
        ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input 
                            type="text" name="name" value={formData.name} 
                            onChange={handleChange} required 
                            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input 
                            type="email" name="email" value={formData.email} disabled 
                            className="w-full bg-gray-100 border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Address Fields */}
                    <div>
                        <label className="block text-gray-700 font-medium">Address</label>
                        <input 
                            type="text" name="address" value={formData.address} 
                            onChange={handleChange} required 
                            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">City</label>
                        <input 
                            type="text" name="city" value={formData.city} 
                            onChange={handleChange} required 
                            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">State</label>
                        <input 
                            type="text" name="state" value={formData.state} 
                            onChange={handleChange} required 
                            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Postal Code</label>
                        <input 
                            type="text" name="postal_code" value={formData.postal_code} 
                            onChange={handleChange} required 
                            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Country</label>
                        <input 
                            type="text" name="country" value={formData.country} 
                            onChange={handleChange} required 
                            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" 
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition">
                            Save Changes
                        </button>
                        <button type="button" onClick={() => setEditMode(false)} 
                            className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md transition">
                            Cancel
                        </button>
                    </div>
                </form>
        )}
    </div>
    );
};

export default UserProfile;
