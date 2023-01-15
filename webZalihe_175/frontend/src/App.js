import Header from "./components/Header";
import "./App.css";
import React from "react";
import Auth from "./components/Auth";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import Material from "./components/Material";
import EditUser from "./components/EditUser";
import { Route, Routes } from "react-router-dom";
import EditProduct from "./components/EditProduct";
import AddMaterial from "./components/AddMaterial";
import EditMaterial from "./components/EditMaterial";
import Supplier from "./components/Supplier";
import Emploeyee from "./components/Employee";
import AddSupplier from "./components/AddSupplier";
import EditSupplier from "./components/EditSupplier";
import ProductionProcess from "./components/ProductionProcess";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";

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
          <Route path="/sirovine" element={<Material />} />
          <Route path="/dobavljaci" element={<Supplier />} />
          <Route path="/zaposlenici" element={<Emploeyee />} />
          <Route path="/proizvodniProces" element={<ProductionProcess />} />

          <Route path="/proizvodi/dodaj" element={<AddProduct />} />
          <Route path="/sirovine/dodaj" element={<AddMaterial />} />
          <Route path="/dobavljaci/dodaj" element={<AddSupplier />} />
          <Route path="/zaposlenici/dodaj" element={<AddEmployee />} />

          <Route path="/proizvodi/:id" element={<EditProduct />} />
          <Route path="/sirovine/:id" element={<EditMaterial />} />
          <Route path="/dobavljaci/:id" element={<EditSupplier />} />
          <Route path="/user/:id" element={<EditUser />} />
          <Route path="/zaposlenici/:id" element={<EditEmployee />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
