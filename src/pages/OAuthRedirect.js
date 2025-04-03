import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const OAuthRedirect = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    useEffect(() => {
        navigate("/home", {replace : true});
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(login());
    }, []);
}

export default OAuthRedirect;