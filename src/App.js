import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './sec/AuthProvider';
import ProtectedRoute from './sec/ProtectedRoute';
import ArticleDetails from './ArticleDetails';
import PortfolioView from './PortfolioView';
import CreateArticle from './CreateArticle';
import ArticleCreatedDialog from './ArticleCreatedDialog';
import Callback from './sec/Callback'
function App() {
  return (
    
      <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PortfolioView />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/article-created" element={<ArticleCreatedDialog />} />
          <Route
            path="/new-article"
            element={
              <ProtectedRoute>
                <CreateArticle />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>

      </Router>
  );
}

export default App;
