import React from 'react';
import Home from './Routes/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddProduct from './Routes/AddProduct';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='addproduct' element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App