// src/components/ArticlesView.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';
import ArticleForm from './components/ArticleForm';

function CreateArticle() {
return ( 

    <div className="MainView">
    <Nav />
    <main>
        <ArticleForm />
    </main>
    <Footer />
    </div>
);
}

export default CreateArticle;
