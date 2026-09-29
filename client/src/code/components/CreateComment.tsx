import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import jwt from "jwt-decode";

interface CommentState {
    text: string;
}

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

interface CreateCommentProps {
    setState: any;
    postID: string;
}

const CreateComment: React.FC<CreateCommentProps> = ({ setState, postID }) => {
    const [commentState, setCommentState] = React.useState<CommentState>({ text: '' });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCommentState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        const userToken = localStorage.getItem("user");
        const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : null;
        const userID = user ? user._id : null;

        if (!userID) {
            setError('You must be logged in to post a comment.');   
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/post/${postID}/comments`, {
                author: user.username,
                authorID: userID,  // Certifica-te de que estás a usar 'authorID' aqui
                text: commentState.text,
            });

            setState({ view: "posts" });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(`An error occurred: ${error.response.data}`);
            } else {
                setError('An unexpected error occurred while creating the comment.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Header setState={setState} />
            <h1 className="display-6" style={{ paddingTop: '40px', textAlign: 'center' }}>
                Comment on the Post!
            </h1>
            <div style={{ paddingTop: '15px', display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{ width: '45%' }}>
                    <div style={{ textAlign: "center" }}>
                        <textarea
                            rows={5}
                            cols={60}
                            name="text"
                            value={commentState.text}
                            onChange={handleChange}
                            required>
                        </textarea>
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Submit Comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateComment;
