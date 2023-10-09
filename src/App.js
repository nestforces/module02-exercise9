// import logo from './logo.svg';
// import './App.css';
// import { ImCart } from "react-icons/im"; 

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <ImCart />
//           {/* <FaCart/> */}
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, {useState} from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Cart/Navbar'
import Home from './Cart/Home'
import Keranjang from './Cart/Keranjang'

function App() {
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/keranjang" element={<Keranjang />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;