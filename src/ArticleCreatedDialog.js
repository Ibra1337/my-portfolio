// src/components/ArticlesView.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';
import ArticleCreatedComponent from './components/ArticleCreatedComponent';
function CreateArticle() {
    return (
      <div className="MainView">
        
        <Nav />
        <main>
          <ArticleCreatedComponent />
        </main>
        <Footer />
      </div>
    );
  }
  
  export default CreateArticle; 