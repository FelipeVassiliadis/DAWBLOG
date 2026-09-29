import path from "path";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { sha256 } from "js-sha256";
const cors = require('cors');
const jwt = require("jwt-then");
require("dotenv").config();

// Conexão com a base de dados
mongoose.connect("mongodb://0.0.0.0:27017").then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log(err);
});

// Criação de app com a utilização do express
const app: Express = express();

// Utilizar o módulo cors
app.use(cors());

// Serve para reconhecer objetos do body http como JSON
app.use(express.json());

// Utilização do cliente
app.use("/", express.static(path.join(__dirname, "../../client/dist")));

// Importação dos modelos criados
require("./models/user");
require("./models/posts");
require("./models/comments");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

// Rota para registrar um novo usuário
app.post("/register", async (inRequest: Request, inResponse: Response) => {
    try {
        const { username, email, password } = inRequest.body;

        // Verifica se o usuário com o mesmo e-mail já existe
        const userExists = await User.findOne({ email });

        // Se o usuário já existe, retorna uma mensagem
        if (userExists) inResponse.send("User with the same email already exists.");
        else {
            // Cria um novo usuário com senha hash (SHA256) e uma imagem padrão
            const user = new User({
                username,
                email,
                password: sha256(password + process.env.SALT),
                image: `anon.jpg`
            });

            // Guarda o novo usuário no base de dados
            await user.save();
            inResponse.send("ok");
        }
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para autenticar um usuário e gerar tokens de acesso e atualização
app.post("/login", async (inRequest: Request, inResponse: Response) => {
    const { email, password } = inRequest.body;

    // Procura um usuário na base de dados com o e-mail e a senha fornecidos
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    });

    // Se o usuário existe, gera tokens de acesso e atualização
    if (user) {
        const accessToken = await jwt.sign(
            user.toObject(),
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        );

        const refreshToken = await jwt.sign(
            user.toObject(),
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        inResponse.json({ accessToken, refreshToken });
    } else inResponse.send("Wrong");
});

// Rota para obter informações de um usuário com base no ID
app.get("/user/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const user = await User.findById(inRequest.params.id);
        if (user) inResponse.json(user);
        else inResponse.send("DB error");
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para criar um post no blog
app.post("/post", async (inRequest: Request, inResponse: Response) => {
    try {
        const { authorID, text } = inRequest.body;
        const user = await User.findById(authorID);

        // Cria um novo post associado ao usuário
        const post = new Post({
            author: user.username,
            authorID: authorID,
            text: text,
            authorImage: user.image
        });

        // Guarda novo post na base de dados
        if (await post.save()) inResponse.send("done");
        else inResponse.send("DB error");
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para atualizar um post no blog com base no ID
app.post("/post/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        const { authorID, text } = inRequest.body;

        // Encontra o post pelo ID e atualiza as informações
        const post = await Post.findByIdAndUpdate(inRequest.params.id, {
            authorID: authorID,
            text: text,
        });

        // Salva ao post atualizado na base de dados
        if (await post.save()) inResponse.send("done");
        else inResponse.send("DB error");
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para obter todos os posts no blog
app.get("/post", async (inRequest: Request, inResponse: Response) => {
    try {
        // Obtém todas os posts na base de dados
        const posts = await Post.find({});
        if (posts) inResponse.json(posts);
        else inResponse.send("DB error");
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para obter informações de um post no blog com base no ID
app.get("/post/:id", async (inRequest: Request, inResponse: Response) => {
    try {
        // Encontra o post pelo ID
        const post = await Post.findById(inRequest.params.id);
        if (post) inResponse.json(post);
        else inResponse.send("DB error");
    } catch (inError) {
        inResponse.send("error");
    }
});

// Rota para obter comentários de um post específico
app.get("/post/:id/comments", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id }).populate('authorID', 'username image');
        res.json(comments);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

// Rota para criar um novo comentário
app.post("/post/:id/comments", async (req, res) => {
    try {
        const { author,authorID, text, authorImage } = req.body;
        const newComment = new Comment({
            author,
            postId: req.params.id,
            authorID,
            text,
            authorImage
        });
        await newComment.save();
        res.status(201).send(newComment);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

// O servidor fica à escuta na porta 8000
app.listen(8000, "0.0.0.0");

