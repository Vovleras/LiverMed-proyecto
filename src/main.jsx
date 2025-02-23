//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/home/Home.jsx";
//import App from "./App.jsx";
import Layout from "./layout/Layout.jsx";
import Liver from "./pages/liver/Liver.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enfermedades" element={<Liver />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
