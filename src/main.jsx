//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/home/Home.jsx";
import Layout from "./layout/Layout.jsx";
import Disease from "./pages/disease/Disease.jsx";
import Quiz from "./pages/quiz/Quiz.jsx";
import Us from "./pages/sobreNosotros/Us.jsx";
import Login from "./pages/login/Login.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/enfermedades/:nombre" element={<Disease />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/nosotros" element={<Us />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  </BrowserRouter>
);
