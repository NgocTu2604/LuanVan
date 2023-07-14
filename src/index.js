import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './Pages/Header';
import Navbar from './Pages/Navbar';
import Container from './Pages/Container';
import FooterPage from './Pages/FooterPage';
import FooterBottom from './Pages/FooterBottom';
import reportWebVitals from './reportWebVitals';
{/* <script src="https://kit.fontawesome.com/71ad0b4309.js" crossorigin="anonymous"></script>  */}

const root = ReactDOM.createRoot(document.querySelector('.root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Header />
    <Navbar />
    <Container />
    <FooterPage />
    <FooterBottom /> */}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();