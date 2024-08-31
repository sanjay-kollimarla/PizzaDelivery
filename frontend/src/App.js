import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/home';
import Default from './layouts/default';
import OrderPizza from './pages/OrderPizza/orderPizza';
import BuildYourPizza from './pages/BuildYourPizza/buildYourPizza';
import ShoppingCart from './pages/ShoppingCart/shoppingCart';
import { useState, useEffect } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="" element={<Default  cartItems={cartItems}/>}>
            <Route path="" element={<Home/>}/>
            <Route path="order-pizza" element={<OrderPizza cartItems={cartItems} setCartItems={setCartItems}/>}/>
            <Route path="build-your-pizza" element={<BuildYourPizza selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients}/>}/>
            <Route path="shopping-cart" element={<ShoppingCart cartItems={cartItems} selectedIngredients={selectedIngredients} setCartItems={setCartItems} setSelectedIngredients={setSelectedIngredients}/>}/>
          </Route>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
