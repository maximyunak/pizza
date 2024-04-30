import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";

import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
