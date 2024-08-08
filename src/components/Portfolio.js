// src/components/Portfolio.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Portfolio = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/article');
                console.log(response.data)
                setArticles(response.data);
                setLoading(false);  
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section>
            <header className="major">
                <h2>My Portfolio</h2>
            </header>
            <div className="row">
                {articles.map(article => (
                    <div key={article.id} className="col-4 col-6-medium col-12-small">
                        <section className="box">
                            <Link to={`/articles/${article.id}`} className="image featured">
                                <img src="images/pic02.jpg" alt="" className="featured-image" />
                            </Link>
                            <header>
                                <h3>{article.title}</h3>
                            </header>
                            <p>
                                <img src={article.coverImg} alt={article.title} className="cover-image" />
                            </p>
                            <p>{article.description}</p>
                            <footer>
                                <ul className="actions">
                                    <li><Link to={`/articles/${article.id}`} className="button alt">Find out more</Link></li>
                                </ul>
                            </footer>
                        </section>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
