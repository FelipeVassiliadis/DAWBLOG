// Importações necessárias
import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";
import jwt from "jwt-decode";

// Interface para o estado do post
interface PostState {
    text: string,
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

// Componente CreatePost
const CreatePost = ({setState}) => {
    // Estado do componente
    const [postState, setPostState] = React.useState<PostState>({
        text: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Manipulador de mudanças no campo de texto
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setPostState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

   // Esta função é chamada quando o formulário de atualização do post é enviado
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        // Obtém o token de utilizador do armazenamento local
        const userToken = localStorage.getItem("user");
        
        // Decodifica o token para obter informações do utilizador
        const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;
      
        // Obtém o ID do utilizador, se existir
        const userID = user ? user._id : false;

        try {
            // Envia uma solicitação para criar um novo post
            const response = await axios.post('http://localhost:8000/post', {
                authorID: userID,
                text: postState.text,
            });

            // Atualiza o estado para exibir a lista de posts após a criação bem-sucedida
            setState({view: "posts"})
            console.log(response.data);
        } catch (error) {
            // Trata erros durante a solicitação
            setError(error.message);
        } finally {
            // Define isSubmitting como falso, independentemente do resultado da solicitação
            setIsSubmitting(false);
        }
    };

    // Renderização do componente
    return (
        <div>
            {/* Componente de cabeçalho */}
            <Header setState={setState}/>
            
            {/* Título da página */}
            <h1 className="display-6" style={{
                paddingTop: '40px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>Creat your Post!</h1>
            
            {/* Formulário de criação de post */}
            <div style={{
                paddingTop: '15px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <form onSubmit={handleSubmit} style={{width: '45%'}}>
                    <div style={{textAlign: "center"}}>
                        {/* Campo de texto para o post */}
                        <textarea
                            rows={5}
                            cols={60}
                            name="text"
                            value={postState.text}
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    {error && <div>{error}</div>}
                    {/* Botão de submissão do formulário */}
                    <div className="d-grid d-md-flex justify-content-md-center">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Submit Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Exporta o componente CreatePost
export default CreatePost;
