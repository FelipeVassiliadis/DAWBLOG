"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const js_sha256_1 = require("js-sha256");
const cors = require('cors');
const jwt = require("jwt-then");
require("dotenv").config();
// Conexão com a base de dados
mongoose_1.default.connect("mongodb://0.0.0.0:27017").then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log(err);
});
// Criação de app com a utilização do express
const app = (0, express_1.default)();
// Utilizar o módulo cors
app.use(cors());
// Serve para reconhecer objetos do body http como JSON
app.use(express_1.default.json());
// Utilização do cliente
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
// Importação dos modelos criados
require("./models/user");
require("./models/posts");
require("./models/comments");
const User = mongoose_1.default.model("User");
const Post = mongoose_1.default.model("Post");
const Comment = mongoose_1.default.model("Comment");
// Rota para registrar um novo usuário
app.post("/register", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = inRequest.body;
        // Verifica se o usuário com o mesmo e-mail já existe
        const userExists = yield User.findOne({ email });
        // Se o usuário já existe, retorna uma mensagem
        if (userExists)
            inResponse.send("User with the same email already exists.");
        else {
            // Cria um novo usuário com senha hash (SHA256) e uma imagem padrão
            const user = new User({
                username,
                email,
                password: (0, js_sha256_1.sha256)(password + process.env.SALT),
                image: `anon.jpg`
            });
            // Guarda o novo usuário no base de dados
            yield user.save();
            inResponse.send("ok");
        }
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para autenticar um usuário e gerar tokens de acesso e atualização
app.post("/login", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = inRequest.body;
    // Procura um usuário na base de dados com o e-mail e a senha fornecidos
    const user = yield User.findOne({
        email,
        password: (0, js_sha256_1.sha256)(password + process.env.SALT),
    });
    // Se o usuário existe, gera tokens de acesso e atualização
    if (user) {
        const accessToken = yield jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
        const refreshToken = yield jwt.sign(user.toObject(), process.env.REFRESH_TOKEN_SECRET, { expiresIn: "15m" });
        inResponse.json({ accessToken, refreshToken });
    }
    else
        inResponse.send("Wrong");
}));
// Rota para obter informações de um usuário com base no ID
app.get("/user/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(inRequest.params.id);
        if (user)
            inResponse.json(user);
        else
            inResponse.send("DB error");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para criar um post no blog
app.post("/post", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorID, text } = inRequest.body;
        const user = yield User.findById(authorID);
        // Cria um novo post associado ao usuário
        const post = new Post({
            author: user.username,
            authorID: authorID,
            text: text,
            authorImage: user.image
        });
        // Guarda novo post na base de dados
        if (yield post.save())
            inResponse.send("done");
        else
            inResponse.send("DB error");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para atualizar um post no blog com base no ID
app.post("/post/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorID, text } = inRequest.body;
        // Encontra o post pelo ID e atualiza as informações
        const post = yield Post.findByIdAndUpdate(inRequest.params.id, {
            authorID: authorID,
            text: text,
        });
        // Salva ao post atualizado na base de dados
        if (yield post.save())
            inResponse.send("done");
        else
            inResponse.send("DB error");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para obter todos os posts no blog
app.get("/post", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtém todas os posts na base de dados
        const posts = yield Post.find({});
        if (posts)
            inResponse.json(posts);
        else
            inResponse.send("DB error");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para obter informações de um post no blog com base no ID
app.get("/post/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Encontra o post pelo ID
        const post = yield Post.findById(inRequest.params.id);
        if (post)
            inResponse.json(post);
        else
            inResponse.send("DB error");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
// Rota para obter comentários de um post específico
app.get("/post/:id/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment.find({ postId: req.params.id }).populate('authorID', 'username image');
        res.json(comments);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// Rota para criar um novo comentário
app.post("/post/:id/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, authorID, text, authorImage } = req.body;
        const newComment = new Comment({
            author,
            postId: req.params.id,
            authorID,
            text,
            authorImage
        });
        yield newComment.save();
        res.status(201).send(newComment);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// O servidor fica à escuta na porta 8000
app.listen(8000, "0.0.0.0");
