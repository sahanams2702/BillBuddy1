import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/css/style.css";
import NavBar from "./components/NavBar";
import GlobalRoutes from "./GlobalRoutes/GlobalRoutes";
import Footer from "./components/Footer";


const App = () => {
  return (
    <Router>
      <NavBar />
      <GlobalRoutes />
      
      <Footer />
    </Router>
  );
};

export default App;
