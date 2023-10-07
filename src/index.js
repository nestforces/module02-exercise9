import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NavLink from './Cart/Navbar'
import Keranjang from './Cart/Keranjang'
import { ChakraProvider } from '@chakra-ui/react'
import reportWebVitals from './reportWebVitals';
import {Routes, Route} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/keranjang" element={<Keranjang />}/>
      </Routes>
      </BrowserRouter>
    {/* <App /> */}
    </ChakraProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
