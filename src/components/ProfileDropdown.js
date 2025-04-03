import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthenticated } from "../actions/authAction";
import { logout } from "../store/authSlice";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8019/auth/logout", {
            method: "POST",
            credentials: "include"  // Ensures cookies are sent
        });

        console.log(response.headers);
        // Redirect to login page
        if(response.ok) {
          dispatch(logout());
          window.location.href = "/";
        }
    } catch (error) {
        console.error("Logout failed", error);
    }
};

  return (
    <div className="relative z-50">
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        onBlur={(e) => {
          if (e.relatedTarget === null) {
            setOpen(false);
          }
        }}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      >
        <span className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm">
          U
        </span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div tabIndex={0} className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
          <ul className="py-2 text-gray-700">
            <li
              onClick={() => {
                setOpen(false);
                navigate("/profile")
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              View Profile
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
