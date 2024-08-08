import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCreatedComponent = () => {
  return (
    <div className="article-created-container">
      <section className="ArticleDisplay">
        <div className="article-created">
          <h1>Article Created Successfully!</h1>
          <p>Your article has been created and published.</p>
          <div className="go-home">
            <Link to="/" className="button alt">
              Go back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleCreatedComponent;
