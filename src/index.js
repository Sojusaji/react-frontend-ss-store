import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import FetchProvider  from'./components/user/context/FetchContex'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FetchProvider>
    <App />
    </FetchProvider>
  </React.StrictMode>
);

