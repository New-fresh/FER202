import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './App.css';
import "./components/Footer/Footer.css";
import FooterPage from './pages/FooterPage';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <>
      <HomePage />
      <FooterPage />
    </>     
  );
}

export default App;
