import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from 'oidc-react';
import { useNavigate } from 'react-router-dom';
import Editor from './Editor'; // Ensure correct path
import { uploadImage } from './utils/imageUpload'; // Import the shared image upload function

const ArticleForm = () => {
    const { userData } = useAuth();
    const token = userData?.access_token;
    const navigate = useNavigate(); // Add the useNavigate hook

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        gitUrl: '',
        tags: '',
        coverImg: ''
    });

    const [artId, setArticleId] = useState('');
    const [message, setMessage] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchArticleId = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:9000/api/v1/uuid');
                setArticleId(response.data);
            } catch (error) {
                console.error('Error fetching article ID:', error);
            }
        };

        fetchArticleId();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleQuillChange = (value) => {
        setFormData({
            ...formData,
            content: value
        });
    };

    const handleCoverImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file && token && artId) {
            try {
                const { url } = await uploadImage(file, token);
                console.log('Image uploaded, URL:', url); // Debugging line
                setFormData({
                    ...formData,
                    coverImg: url
                });
                setCoverImagePreview(url);
                setMessage('Cover image uploaded successfully!');
            } catch (error) {
                setMessage(`Error uploading image: ${error.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage('Error: No authentication token found');
            return;
        }

        if (!formData.coverImg) {
            setMessage('Error: Cover image URL is missing');
            return;
        }

        setLoading(true);

        const tagsArray = formData.tags.split(',').map(tag => tag.trim());

        const data = {
            ...formData,
            tags: tagsArray,
            articleId: artId
        };

        console.log('Submitting article data:', data); // Debugging line

        try {
            await axios.post('http://localhost:9000/api/v1/article', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Article created successfully!');
            navigate('/article-created'); // Redirect to success page
        } catch (error) {
            setMessage(`Error: ${error.response ? error.response.data : error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="ArticleDisplay">
            <div className="article-form">
                <h2>Create a New Article</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                    </label>
                    <label>
                        Content:
                        <Editor value={formData.content} onChange={handleQuillChange} />
                    </label>
                    <label>
                        GitHub URL:
                        <input type="url" name="gitUrl" value={formData.gitUrl} onChange={handleChange} required />
                    </label>
                    <label>
                        Tags (comma separated):
                        <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
                    </label>
                    <label>
                        Cover Image:
                        <input type="file" accept="image/*" onChange={handleCoverImageUpload} />
                        {coverImagePreview && (
                            <div>
                                <img src={coverImagePreview} alt="Cover Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                            </div>
                        )}
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Article'}
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </section>
    );
};

export default ArticleForm;
