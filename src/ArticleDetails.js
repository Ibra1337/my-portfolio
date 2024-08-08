// src/components/ArticlesView.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleDetailis from './components/ArticleDetails';
import Nav from './components/Nav';

function ArticleView() {
return (    
    <div className="MainView">
    <Nav />
    <main>
        <ArticleDetailis />
    </main>
    <Footer />
    </div>
);
}

export default ArticleView;
