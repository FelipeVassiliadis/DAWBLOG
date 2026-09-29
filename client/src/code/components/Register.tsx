// Importações necessárias do React e Axios
import * as React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header";

// Interface para o estado do formulário de registo
interface FormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Componente de Registo
const Register = ({setState}) => {
    // Estado do componente
    const [formState, setFormState] = React.useState<FormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Manipulador de mudanças nos campos do formulário
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Manipulador de submissão do formulário
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Expressão regular para validar o formato do email
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
            // Validação dos campos do formulário
            if (formState.name.length < 1 || formState.email.length < 1 || formState.password.length < 1 || formState.confirmPassword.length < 1) {
                throw new Error('Please, fill in all fields');
            }
            if (!formState.email.match(validRegex)) {
                throw new Error('Incorrect email format');
            }
            if (formState.password !== formState.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Envia uma solicitação para registar um novo utilizador
            const response = await axios.post('http://localhost:8000/register', {
                username: formState.name,
                email: formState.email,
                password: formState.password,
            });

            // Verifica se o utilizador foi registado com sucesso
            if (response.data !== "ok") {
                throw new Error("There is already a user with the same email address");
            } else {
                // Redireciona para a página de login após o registo bem-sucedido
                setState({view: "login"});
            }

            // Faz algo com os dados de resposta
            console.log(response.data);
        } catch (error) {
            // Trata erros durante o registo
            setError(error.message);
        } finally {
            // Define isSubmitting como falso, independentemente do resultado da solicitação
            setIsSubmitting(false);
        }
    };

    // Renderização do componente Register
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
            }}>Registo</h1>
            
            {/* Formulário de registo */}
            <div style={{
                paddingTop: '15px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <form onSubmit={handleSubmit} style={{width: '45%'}}>
                    {/* Campo do nome */}
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="Nome"
                            type="text"
                            id="floatingName"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}/>
                        <label htmlFor="floatingName">UserName</label>
                        <br/>
                    </div>
                    
                    {/* Campo do email */}
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="Email"
                            type="email"
                            id="floatingInput"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}/>
                        <label htmlFor="floatingInput">Email Address</label>
                        <br/>
                    </div>
                    
                    {/* Campo da password */}
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="Password"
                            type="password"
                            id="floatingPassword"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}/>
                        <label htmlFor="floatingPassword">Password</label>
                        <br/>
                    </div>
                    
                    {/* Campo de confirmação da password */}
                    <div className="form-floating mb-2">
                        <input
                            className="form-control"
                            placeholder="ConfirmPassword"
                            type="password"
                            id="floatingConfirmPassword"
                            name="confirmPassword"
                            value={formState.confirmPassword}
                            onChange={handleChange}/>
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        <br/>
                    </div>
                    
                    {/* Exibe mensagens de erro, se houver */}
                    {error && <div>{error}</div>}
                    
                    {/* Botão de submissão do formulário */}
                    <div className="d-grid d-md-flex justify-content-md-center">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Exporta o componente Register
export default Register;
