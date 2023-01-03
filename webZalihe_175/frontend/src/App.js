import Header from "./components/Header";
import "./App.css";
import React from "react";
import Auth from "./components/Auth";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import Material from "./components/Material";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/proizvodi" element={<Product />} />
          <Route path="/proizvodi/dodaj" element={<AddProduct />} />
          <Route path="/sirovine" element={<Material />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
