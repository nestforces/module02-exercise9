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

function App() {
  // Array of objects containing our fruit data
  let fruits = [
    { label: "Apple", value: "🍎" },
    { label: "Banana", value: "🍌" },
    { label: "Orange", value: "🍊" }
]

// Using state to keep track of what the selected fruit is
let [fruit, setFruit] = useState("⬇️ Select a fruit ⬇️")

// Using this function to update the state of fruit
// whenever a new option is selected from the dropdown
let handleFruitChange = (e) => {
  setFruit(e.target.value)
}

  return (
    <div className="App">
    {/* Displaying the value of fruit */}
    {fruit}
    <br />

    <select onChange={handleFruitChange}> 
      <option value="⬇️ Select a fruit ⬇️"> -- Select a fruit -- </option>
            {/* Mapping through each fruit object in our fruits array
          and returning an option element with the appropriate attributes / values.
         */}
      {fruits.map((fruit) => <option value={fruit.value}>{fruit.value}{fruit.label}</option>)}
    </select>
    </div>
  );
}

export default App;