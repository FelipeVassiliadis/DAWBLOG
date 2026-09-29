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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Register_1 = __importDefault(require("./components/Register"));
const Login_1 = __importDefault(require("./components/Login"));
const Posts_1 = __importDefault(require("./components/Posts"));
const CreatePost_1 = __importDefault(require("./components/CreatePost"));
const UpdatePost_1 = __importDefault(require("./components/UpdatePost"));
const CreateComment_1 = __importDefault(require("./components/CreateComment"));
function App() {
    const [state, setState] = (0, react_1.useState)({ view: "home", postID: "" });
    if (state.view == "home")
        return react_1.default.createElement(Posts_1.default, { setState: setState });
    else if (state.view == "register")
        return react_1.default.createElement(Register_1.default, { setState: setState });
    else if (state.view == "login")
        return react_1.default.createElement(Login_1.default, { setState: setState });
    else if (state.view == "posts")
        return react_1.default.createElement(Posts_1.default, { setState: setState });
    else if (state.view == "createPost")
        return react_1.default.createElement(CreatePost_1.default, { setState: setState });
    else if (state.view == "updatePost") {
        return react_1.default.createElement(UpdatePost_1.default, { postID: state.postID, setState: setState });
    }
    else if (state.view == "createComment") {
        return react_1.default.createElement(CreateComment_1.default, { postID: state.postID, setState: setState });
    }
}
const root = react_dom_1.default.createRoot(document.getElementById('root'));
root.render(react_1.default.createElement(App, null));
//# sourceMappingURL=main.js.map