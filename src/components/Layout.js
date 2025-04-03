import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Navbar/> {/* Navbar remains on top */}
      <Outlet /> {/* This renders the current route's component */}
      <Footer/>
    </div>
  );
};

export default Layout;
