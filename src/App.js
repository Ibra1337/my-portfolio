// src/App.js
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider as OidcAuthProvider } from 'oidc-react';
import ArticleDetails from './ArticleDetails';
import PortfolioView from './PortfolioView';
import CreateArticle from './CreateArticle';
import Callback from './Callback';
import PrivateRoute from './PrivateRoute';
import ArticleCreatedDialog from './ArticleCreatedDialog';
import oidcConfig from './config';

function App() {
  return (
    <Router>
      <OidcAuthProvider {...oidcConfig}>
        <Routes>
          <Route path="/" element={<PortfolioView />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/article-created" element={<ArticleCreatedDialog />} />
          <Route path="/new-article" element={
          <PrivateRoute>
              <CreateArticle />
          </PrivateRoute>} />
        </Routes>
      </OidcAuthProvider>
    </Router>
  );
}

export default App;
