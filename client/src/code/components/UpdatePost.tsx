import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { useEffect } from "react";
import jwt from "jwt-decode";

// Interface para o estado do post
interface PostState {
    text: string,
    authorID: string,
}

// Interface para o token decodificado
interface MyToken {
    createdAt: string,
    email: string,
    exp: number,
    iat: number,
    password: string,
    updatedAt: string,
    username: string,
    __v: number,
    _id: string,
}

// Componente de atualização de post
const UpdatePost = (props) => {
    // Estado para armazenar o estado do post
    const [postState, setPostState] = React.useState<PostState>({
        text: '',
        authorID: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Obtém o token de utilizador do armazenamento local
    const userToken = localStorage.getItem("user");

    // Decodifica o token para obter informações do utilizador, se existir
    const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;

    // Obtém o ID do utilizador, se existir
    const userID = user ? user._id : false;

    // Efeito para carregar o conteúdo do post quando o componente é montado
    useEffect(() => {
        axios.get('http://localhost:8000/post/' + props.postID)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setPostState(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [props.postID]);

    // Função chamada quando o conteúdo do campo de texto do post é alterado
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPostState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Função chamada quando o formulário de atualização do post é enviado
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        //Verifica se o usuário logado é o autor do post
        if (userID !== postState.authorID) {
            setError("You are not authorized to edit this post.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Envia uma solicitação para atualizar o post
            const response = await axios.post('http://localhost:8000/post/' + props.postID, {
                authorID: userID,
                text: postState.text,
            });

            // Redireciona para a página de posts após a atualização bem-sucedida
            props.setState({ view: "posts" });

            // Faz algo com os dados de resposta
            console.log(response.data);
        } catch (error) {
            // Trata erros durante a atualização do post
            setError(error.message);
        } finally {
            // Define isSubmitting como falso, independentemente do resultado da solicitação
            setIsSubmitting(false);
        }
    };

    // Renderização do componente UpdatePost
    return (
        <div>
            <Header setState={props.setState} />
            <h1 className="display-6" style={{
                paddingTop: '40px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>Edit your Post!</h1>
            <div style={{
                paddingTop: '15px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <form onSubmit={handleSubmit} style={{ width: '45%' }}>
                    <div style={{ textAlign: "center" }}>
                        <textarea
                            rows={5}
                            cols={60}
                            name="text"
                            value={postState.text}
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    {error && <div>{error}</div>}
                    <div className="d-grid d-md-flex justify-content-md-center">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Updating
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;
