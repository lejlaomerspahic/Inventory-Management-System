import Header from './components/Header';
import './App.css';
import React from 'react';
import Auth from './components/Auth';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import ProductDetail from './components/ProductDetail';
import Materials from './components/Materials';
import {Route, Routes} from 'react-router-dom'


function App() {


  return  (<React.Fragment>
    <header>
      <Header/>
      </header>
      <main>
        <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/proizvodi" element={<Product/>}/>
            <Route path="/proizvodi/dodaj" element={<AddProduct/>}/>
            <Route path="/proizvodi/detalji" element={<ProductDetail/>}/>
            <Route path="/sirovine" element={<Materials/>}/>
        </Routes>
      </main>
    </React.Fragment>
  )
};

export default App;
