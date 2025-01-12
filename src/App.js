import NavBar from "./components/user/header/Header";
import Home from "./pages/user/Home";
import ProductMoreInfo from './components/user/productmore-info/ProductMoreInfo'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Cart from "./pages/user/Cart";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes> 
          <Route path="/" element={<Home/>} />
          <Route path="/ProductMoreInfo" element={<ProductMoreInfo/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path='/Cart' element={<Cart/>}/>
        </Routes>
      </div>
    </Router>);
}

export default App;