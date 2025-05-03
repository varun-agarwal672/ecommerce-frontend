import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setCredentials } from "../store/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setAuthenticated } from "../actions/authAction";

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [searchParams] = useSearchParams();
    const isOauth2 = searchParams.get("oauth") === "true";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if(isOauth2) {
            dispatch(login());
            navigate("/home", { replace: true });
        }
    }, [isOauth2]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignup && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const formDataLogin = new URLSearchParams();
        formDataLogin.append("username", formData.email); // Must be "username"
        formDataLogin.append("password", formData.password);

        console.log(formDataLogin);

        const url = isSignup ? `${process.env.REACT_APP_BASE_URL}/auth/signup` : `${process.env.REACT_APP_BASE_URL}/auth/login`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: isSignup ? { "Content-Type": "application/json" } : {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: isSignup ? JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }) : formDataLogin.toString(),
                credentials: "include"
            });
            console.log(response);
            if (!response.ok) window.location.href = "/";
            else {
                if (isSignup) {
                    // alert("Signup successful! Please log in.");
                    setIsSignup(false);
                } else {
                    dispatch(login());
                }
            }
        } catch (err) {
            console.log(err);
            alert("Error: " + err.message);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/google`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isSignup ? "Create an Account" : "Login to Your Account"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignup && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    {isSignup && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    )}

                    <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>
                <button
                    onClick={() => handleGoogleLogin()}
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 mt-4"
                >
                    Login with Google
                </button>


                <p className="text-center mt-4">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button onClick={() => setIsSignup(!isSignup)} className="text-blue-500 hover:underline">
                        {isSignup ? "Login" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
