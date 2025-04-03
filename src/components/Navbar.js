import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const handleCartClick = () => {
        navigate("/cart");
    }
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <nav className="bg-gray-800 text-white shadow-md p-1">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-semibold">
                    <a href="/" className="text-white hover:text-gray-400">
                        E-Shop
                    </a>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    {isAuthenticated && <a href="/home" className="text-white hover:text-gray-400">Home</a>}
                    {isAuthenticated && <a href="/products" className="text-white hover:text-gray-400">Products</a>}
                    <a href="/about" className="text-white hover:text-gray-400">About Us</a>
                    <a href="/contact" className="text-white hover:text-gray-400">Contact</a>
                </div>

                {/* Shopping Cart Icon */}
                {isAuthenticated && <div className="relative flex items-center gap-4">
                    <ProfileDropdown />
                    <a onClick={() => handleCartClick()} className="text-white hover:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                        </svg>
                    </a>
                    {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        3
                    </span> */}
                </div>}

                {/* Mobile Menu Toggle */}
                {isAuthenticated && <div className="md:hidden">
                    <button className="text-white hover:text-gray-400">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>}
            </div>

            {/* Mobile Menu (Dropdown) */}
            <div className="md:hidden mt-2 space-y-4">
                {isAuthenticated && <a href="/home" className="block text-white hover:text-gray-400">Home</a>}
                {isAuthenticated && <a href="/products" className="block text-white hover:text-gray-400">Products</a>}
                <a href="/about" className="block text-white hover:text-gray-400">About Us</a>
                <a href="/contact" className="block text-white hover:text-gray-400">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;
