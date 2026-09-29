# DAWBLOG

Blog web desenvolvido como projeto da unidade curricular **Desenvolvimento de Aplicações para a Web (DAW)**, feito por um grupo de **4 pessoas**.

A aplicação permite que os utilizadores se registem, iniciem sessão, criem e editem publicações e comentem nas publicações de outros utilizadores.

## Funcionalidades

- Registo e login de utilizadores (password com hash SHA-256 + salt)
- Autenticação com tokens JWT
- Criar, listar, ver e editar publicações (posts)
- Comentar publicações
- Perfil de utilizador com imagem por omissão
- Service Worker (Workbox) para funcionamento como PWA / cache offline

## Tecnologias utilizadas

### Frontend (`client/`)
- **React 18** com **TypeScript**
- **React Router** para navegação
- **Material UI (MUI)**, **Emotion**, **Bootstrap / React-Bootstrap** e **Font Awesome** para a interface
- **Axios** para comunicação com a API
- **jwt-decode** para ler os tokens de autenticação
- **Webpack 5** (ts-loader, css-loader, style-loader, html-loader, HtmlWebpackPlugin)
- **Babel**, **PostCSS** e **Autoprefixer**
- **Workbox** (workbox-webpack-plugin) para o Service Worker
- **normalize.css**, **Prettier**

### Backend (`server/`)
- **Node.js** com **Express** e **TypeScript**
- **MongoDB** com **Mongoose** (modelos `User`, `Post` e `Comment`)
- **jwt-then** para geração e validação de tokens JWT
- **js-sha256** para hash das passwords
- **dotenv** para variáveis de ambiente
- **CORS**
- **Nodemon** para desenvolvimento

## Estrutura

```
client/            Aplicação React (frontend)
  src/code/        Componentes (Login, Register, Posts, CreatePost, UpdatePost, CreateComment, Header)
  dist/            Build de produção servido pelo servidor
server/            API REST (backend)
  src/main.ts      Rotas da API
  src/models/      Modelos Mongoose
Relatório.odt      Relatório do projeto
```

## API

| Método | Rota                  | Descrição                    |
|--------|-----------------------|------------------------------|
| POST   | `/register`           | Registar utilizador          |
| POST   | `/login`              | Iniciar sessão               |
| GET    | `/user/:id`           | Obter utilizador             |
| POST   | `/post`               | Criar publicação             |
| POST   | `/post/:id`           | Editar publicação            |
| GET    | `/post`               | Listar publicações           |
| GET    | `/post/:id`           | Obter publicação             |
| GET    | `/post/:id/comments`  | Listar comentários           |
| POST   | `/post/:id/comments`  | Adicionar comentário         |

## Como executar

Pré-requisitos: Node.js e MongoDB a correr em `localhost:27017`.

1. Configurar o servidor: copiar `server/.env.example` para `server/.env` e preencher os valores (`DB`, `SALT`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`).
2. Compilar o cliente:
   ```bash
   cd client
   npm install
   npm run build
   ```
3. Iniciar o servidor:
   ```bash
   cd server
   npm install
   npm run dev
   ```
4. Abrir `http://localhost:8000` no browser.
