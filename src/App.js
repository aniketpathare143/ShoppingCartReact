import './App.css';
import HomeComponent from './Home/Home';
import NavigationBar from './Home/Navbar';
import LoginComponent from './Login/Login';
import Registration from './Login/Registration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Category from './ShoppingCart/Category';
import PlaceOrder from './ShoppingCart/PlaceOrder';
import Product from './ShoppingCart/Product';
import Cart from './ShoppingCart/Cart';
import ShowOrder from './ShoppingCart/ShowOrder';
import AddCategory from './ShoppingCart/AddCategory';
import AddProduct from './ShoppingCart/AddProduct';

function App() {

  return (
    <div className="background-container">
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<LoginComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/showorder" element={<ShowOrder />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
