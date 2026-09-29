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
const Register = ({ setState }) => {
    const [formState, setFormState] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (formState.name.length < 1 || formState.email.length < 1 || formState.password.length < 1 || formState.confirmPassword.length < 1) {
                throw new Error('Por favor, preencha todos os campos');
            }
            if (!formState.email.match(validRegex)) {
                throw new Error('Formato de email incorreto');
            }
            if (formState.password !== formState.confirmPassword) {
                throw new Error('As passwords não coincidem');
            }
            const response = yield axios_1.default.post('http://localhost:8000/register', {
                username: formState.name,
                email: formState.email,
                password: formState.password,
            });
            if (response.data !== "ok") {
                throw new Error("Já existe um(a) utilizador(a) com o mesmo email.");
            }
            else {
                setState({ view: "login" });
            }
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
            } }, "Registo"),
        React.createElement("div", { style: {
                paddingTop: '15px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            } },
            React.createElement("form", { onSubmit: handleSubmit, style: { width: '45%' } },
                React.createElement("div", { className: "form-floating mb-2" },
                    React.createElement("input", { className: "form-control", placeholder: "Nome", type: "text", id: "floatingName", name: "name", value: formState.name, onChange: handleChange }),
                    React.createElement("label", { htmlFor: "floatingName" }, "Nome"),
                    React.createElement("br", null)),
                React.createElement("div", { className: "form-floating mb-2" },
                    React.createElement("input", { className: "form-control", placeholder: "Email", type: "email", id: "floatingInput", name: "email", value: formState.email, onChange: handleChange }),
                    React.createElement("label", { htmlFor: "floatingInput" }, "Endere\u00E7o de Email"),
                    React.createElement("br", null)),
                React.createElement("div", { className: "form-floating mb-2" },
                    React.createElement("input", { className: "form-control", placeholder: "Password", type: "password", id: "floatingPassword", name: "password", value: formState.password, onChange: handleChange }),
                    React.createElement("label", { htmlFor: "floatingPassword" }, "Palavra-passe"),
                    React.createElement("br", null)),
                React.createElement("div", { className: "form-floating mb-2" },
                    React.createElement("input", { className: "form-control", placeholder: "ConfirmPassword", type: "password", id: "floatingConfirmPassword", name: "confirmPassword", value: formState.confirmPassword, onChange: handleChange }),
                    React.createElement("label", { htmlFor: "floatingConfirmPassword" }, "Confirmar Palavra-passe"),
                    React.createElement("br", null)),
                error && React.createElement("div", null, error),
                React.createElement("div", { className: "d-grid d-md-flex justify-content-md-center" },
                    React.createElement("button", { type: "submit", className: "btn btn-primary", disabled: isSubmitting }, "Registar"))))));
};
exports.default = Register;
//# sourceMappingURL=Register.js.map