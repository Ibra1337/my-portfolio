// src/components/MainView.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ArticleDetailis from './components/Portfolio';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';
import Banner from './components/Banner';
import Intro from './components/Intro';
import Nav from './components/Nav';

function PortfolioView() {
return (
    <div className="PortfolioView">
        
    <main>
    <Nav />
    <Banner />
    <Intro />
    
    <Portfolio />
        
        <header class="major"></header>
    </main>
    <Footer />
    
    </div>
);
}

export default PortfolioView;
