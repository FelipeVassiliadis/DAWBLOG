// Importações necessárias do React e Axios
import * as React from 'react';
import axios from 'axios';
import Header from "./Header";

// Interface para o estado do formulário de login
interface FormState {
    email: string;
    password: string;
}

// Componente de Login
const Login = ({ setState }) => {
    // Estado do componente
    const [formState, setFormState] = React.useState<FormState>({
        email: '',
        password: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Manipulador de mudanças nos campos do formulário
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Função chamada quando o formulário de login é submetido
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Envia uma solicitação para autenticar o utilizador
            const response = await axios.post("http://localhost:8000/login", {
                email: formState.email,
                password: formState.password,
            });

            // Verifica se o utilizador foi autenticado com sucesso
            if (formState.email.length < 1 || formState.password.length < 1) {
                throw new Error('Por favor, preencha todos os campos');
            }
            if (response.data.accessToken) {
                // Armazena o token no armazenamento local e redireciona para a página de posts
                localStorage.setItem("user", JSON.stringify(response.data));
                setState({ view: "posts" });
            }
        } catch (error) {
            // Trata erros durante a autenticação
            setError(error.message);
        } finally {
            // Define isSubmitting como falso, independentemente do resultado da solicitação
            setIsSubmitting(false);
        }
    };

    // Função para redirecionar para a página de registro
    const redirectToRegister = () => {
        setState({ view: "register" });
    };

    // Renderização do componente Login
    return (
        <div>
            {/* Componente de cabeçalho */}
            <Header setState={setState} />

            {/* Título da página */}
            <h1 className="display-6" style={{
                paddingTop: '40px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>Login</h1>

            {/* Formulário de login */}
            <div style={{
                paddingTop: '15px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <form onSubmit={handleSubmit} style={{ width: '45%' }}>
                    {/* Campo de email */}
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="Email"
                            type="email"
                            id="floatingInput"
                            name="email"
                            value={formState.email}
                            onChange={handleChange} />
                        <label htmlFor="floatingInput">Email Address</label>
                        <br />
                    </div>

                    {/* Campo de password */}
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="Password"
                            type="password"
                            id="floatingPassword"
                            name="password"
                            value={formState.password}
                            onChange={handleChange} />
                        <label htmlFor="floatingPassword">Password</label>
                        <br />
                    </div>

                    {/* Exibe mensagens de erro, se houver */}
                    {error && <div>{error}</div>}

                    {/* Botão de submissão do formulário */}
                    <div className="d-grid d-md-flex justify-content-md-center">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Login
                        </button>
                    </div>

                    {/* Botão para redirecionar para a página de registro */}
                    <div className="d-grid d-md-flex justify-content-md-center mt-2">
                        <button type="button" className="btn btn-secondary" onClick={redirectToRegister}>
                            Create an account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Exporta o componente Login
export default Login;
