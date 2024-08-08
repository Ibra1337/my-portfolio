import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./ArticleDetails"; // Ensure you have appropriate styling

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/article/${id}`);
                setArticle(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section className="ArticleDisplay">
            <header>
                <h1>{article.title}</h1>
            </header>
            {article.coverImg && (
                <div className="cover-image">
                    <img src={article.coverImg} alt="Cover" />
                </div>
            )}
            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }}></div>
            {article.gitUrl && (
                <div className="github-url">
                    <a href={article.gitUrl} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </a>
                </div>
            )}
            {article.tags && (
                <div className="tags">
                    <strong>Tags: </strong>
                    {article.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ArticleDetails;
