"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const React = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
require("bootstrap/dist/css/bootstrap.min.css");
const Header_1 = __importDefault(require("./Header"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const CreatePost = ({ setState }) => {
    const [postState, setPostState] = React.useState({
        text: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostState((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');
        const userToken = localStorage.getItem("user");
        const user = userToken ? (0, jwt_decode_1.default)(JSON.parse(userToken).accessToken) : false;
        const userID = user ? user._id : false;
        try {
            const response = yield axios_1.default.post('http://localhost:8000/post', {
                authorID: userID,
                text: postState.text,
            });
            setState({ view: "posts" });
            console.log(response.data);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (React.createElement("div", null,
        React.createElement(Header_1.default, { setState: setState }),
        React.createElement("h1", { className: "display-6", style: {
                paddingTop: '40px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            } }, "Escreva o seu post!"),
        React.createElement("div", { style: {
                paddingTop: '15px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            } },
            React.createElement("form", { onSubmit: handleSubmit, style: { width: '45%' } },
                React.createElement("div", { style: { textAlign: "center" } },
                    React.createElement("textarea", { rows: 5, cols: 60, name: "text", value: postState.text, onChange: handleChange })),
                error && React.createElement("div", null, error),
                React.createElement("div", { className: "d-grid d-md-flex justify-content-md-center" },
                    React.createElement("button", { type: "submit", className: "btn btn-primary", disabled: isSubmitting }, "Publicar"))))));
};
exports.default = CreatePost;
//# sourceMappingURL=CreatePost.js.map