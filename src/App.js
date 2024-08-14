import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit'; // Import from 'react-auth-kit'
import ArticleDetails from './ArticleDetails';
import PortfolioView from './PortfolioView';
import CreateArticle from './CreateArticle';
import PrivateRoute from './PrivateRoute';
import ArticleCreatedDialog from './ArticleCreatedDialog';
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false
});

function App() {


  
  return (
    <AuthProvider store={store}    >
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioView />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/article-created" element={<ArticleCreatedDialog />} />
          <Route path="/new-article" element={
            <PrivateRoute element={<CreateArticle />} />
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
