// Importações necessárias do React e do Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import * as React from "react";
import jwt from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css'

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

// Componente Header
const Header = ({ setState }) => {
   
    // Função para efetuar logout
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    // Obtém o token de utilizador do armazenamento local
    const userToken = localStorage.getItem("user");

    // Decodifica o token para obter informações do utilizador, se existir
    const user = userToken ? jwt<MyToken>(JSON.parse(userToken).accessToken) : false;

    // Obtém o nome de utilizador, se existir
    const username = user ? user.username : false;

    // Renderização do componente Navbar
    return (
        <Navbar bg="primary" variant="dark">
            <Container className="justify-content-between">
                {/* Título do Navbar */}
                <Navbar.Brand>Web Forum</Navbar.Brand>
                
                {/* Links do Navbar */}
                <Nav>
                    
                    <Nav.Link onClick={() => setState({view: "posts"})}>Home</Nav.Link>

                    {/* Se o utilizador estiver autenticado */}
                    {user &&
                        <div style={{ display:"flex", justifyContent:"right"}}>
                            <Nav.Link onClick={() => setState({view: "home"})}>Welcome, {username}</Nav.Link>
                            <Nav.Link onClick={() => setState({view: "createPost"})}>Create Post</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </div>
                    }
                    
                    {/* Se o utilizador não estiver autenticado */}
                    {!user &&
                        <div style={{ display:"flex", justifyContent:"right"}}>
                            <Nav.Link onClick={() => setState({view: "register"})}>Register</Nav.Link>
                            <Nav.Link onClick={() => setState({view: "login"})}>Login</Nav.Link>
                        </div>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
};

// Exporta o componente Header
export default Header;
