//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/home/Home.jsx";
//import App from "./App.jsx";
import Layout from "./layout/Layout.jsx";
import Liver from "./pages/liver/Liver.jsx";
import Quiz from "./pages/quiz/Quiz.jsx";
import Us from "./pages/sobreNosotros/Us.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enfermedades" element={<Liver />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/nosotros" element={<Us />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
