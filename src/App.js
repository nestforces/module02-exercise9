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
import Navbar from './Cart/Navbar'
import Home from './Cart/Home'
import './App.css';

function App() {
  return (
    <>
    <Navbar/>
    <Home/>
    </>
  )
}

export default App;