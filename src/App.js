import './App.css';
import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import ProductDescription from './pages/ProductDescription';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import OAuthRedirect from './pages/OAuthRedirect';
import UserProfile from './pages/UserProfile';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Check if user is logged in via cookies
  //   const token = document.cookie.includes("auth_token");
  //   if (token) dispatch(login());
  // }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Auth/>} />
          <Route path="/oauth" element = {<OAuthRedirect/>} />
          <Route path="profile" element={<ProtectedRoute element={<UserProfile />} />} />
          <Route path="home" element={<ProtectedRoute element={<HomePage/>}/>} />
          <Route path="product/:categoryId" element={<ProtectedRoute element={<ProductList/>}/>} />
          <Route path="product-detail/:productId" element={<ProtectedRoute element={<ProductDescription/>}/>} />
          <Route path="cart" element={<ProtectedRoute element={<Cart/>}/>} />
          <Route path="place-order" element={<ProtectedRoute element={<Checkout/>} />}  />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
