import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import jwt from "jwt-decode";

interface MyToken {
    createdAt: string;
    email: string;
    exp: number;
    iat: number;
    password: string;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
}

const Posts = ({ setState }) => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [activeKey, setActiveKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        axios.get('http://localhost:8000/post')
            .then((res) => res.data)
            .then((data) => {
                const sortedData = data.sort((a, b) => sortOrder === 'asc' ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setPosts(sortedData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [sortOrder]);

    const userToken = localStorage.getItem("user");
    const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;
    const userID = user ? user._id : false;

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleAccordionToggle = (postId) => {
        const newActiveKey = activeKey === postId ? null : postId;
        setActiveKey(newActiveKey);

        if (newActiveKey !== null) {
            fetchComments(newActiveKey);
        }
    };

    const fetchComments = (postId) => {
        axios.get(`http://localhost:8000/post/${postId}/comments`)
            .then((res) => {
                setComments({ ...comments, [postId]: res.data });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <Header setState={setState} />

            <div className="posts-header" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '40px'
            }}>
                <h1 className="display-6">Posts</h1>
                <select onChange={handleSortChange} value={sortOrder} style={{ marginLeft: '20px' }}>
                    <option value="desc">Sort by Recent Posts</option>
                    <option value="asc">Sort by Older Posts</option>
                </select>
            </div>

            <div className="container mt-4">
                <Accordion activeKey={activeKey} onSelect={handleAccordionToggle}>
                    {posts?.map((post) => (
                        <Accordion.Item eventKey={post._id} key={post._id}>
                            <Accordion.Header style={{ backgroundColor: '#006400', color: 'white' }}>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={require("/public/images/" + post.authorImage)}
                                        alt={post.author}
                                        className="rounded-circle me-3"
                                        style={{ maxWidth: "50px", width: "100%", height: "auto" }}
                                    />
                                    <div>
                                        <b>{post.author}</b>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>{post.text}</p>
                                <p>
                                    <small>Created at: {post.createdAt.split('T')[0]} {post.createdAt.split('T')[1].slice(0, -2)}</small><br />
                                    <small>Updated at: {post.updatedAt.split('T')[0]} {post.updatedAt.split('T')[1].slice(0, -2)}</small>
                                </p>
                                <div className="comments-section">
                                    {comments[post._id]?.map((comment) => (
                                        <div key={comment._id} className="comment-box" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                                            <p><strong>{comment.author}:</strong> {comment.text}</p>
                                            <p style={{ fontSize: "smaller" }}>Commented at: {new Date(comment.createdAt).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => setState({ view: "createComment", postID: post._id })}
                                >
                                    Comment
                                </Button>
                                {post.authorID === userID && (
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => setState({ view: "updatePost", postID: post._id })} 
                                        style={{ marginLeft: '10px' }} 
                                    > 
                                        Update 
                                    </Button>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Posts;