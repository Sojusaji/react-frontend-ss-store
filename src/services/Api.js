
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5002', 
  withCredentials: true, 
});


export const getAllProducts = () => API.get('/products'); 
export const sentOtp = (data) => API.post('/send-otp', {data});
export const signup=(data)=>API.post('/signup',{data});
export const login=(data)=>API.post('/login',{data});
export const logout=()=>API.get('/logout');
export const getCart=()=>API.get('/cart')
export const addToCart=(data)=>API.post('/add-to-cart',{data});
export const removeProduct=(data)=>API.post('/remove-product',{data})
export const changeQuantity=(data)=>API.post('/change-product-quantity',{data})
