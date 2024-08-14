import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/homeComponent";
import ClientComponent from "./components/client/clientComponent";
import BookComponent from "./components/book/bookComponent";
import SaleComponent from "./components/sale/saleComponent";
import SaleDetailComponent from "./components/sale/saleDetailComponent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/client" element={<ClientComponent />} />
        <Route path="/book" element={<BookComponent />} />
        <Route path="/sale" element={<SaleComponent />} />
        <Route path="/saleDetail" element={<SaleDetailComponent />} />
      </Routes>
    </div>
  );
}

export default App;
