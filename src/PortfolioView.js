// src/components/MainView.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ArticleDetailis from './components/Portfolio';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';


function PortfolioView() {
return (
    <div className="PortfolioView">
        <Header />
    <main>
        <Portfolio />
        <header class="major"></header>
    </main>
    <Footer />
    
    </div>
);
}

export default PortfolioView;
