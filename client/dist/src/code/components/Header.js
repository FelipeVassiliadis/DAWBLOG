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
const Container_1 = __importDefault(require("react-bootstrap/Container"));
const Navbar_1 = __importDefault(require("react-bootstrap/Navbar"));
const Nav_1 = __importDefault(require("react-bootstrap/Nav"));
const React = __importStar(require("react"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
require("bootstrap/dist/css/bootstrap.min.css");
const Header = ({ setState }) => {
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };
    const userToken = localStorage.getItem("user");
    const user = userToken ? (0, jwt_decode_1.default)(JSON.parse(userToken).accessToken) : false;
    const username = user ? user.username : false;
    return (React.createElement(Navbar_1.default, { bg: "primary", variant: "dark" },
        React.createElement(Container_1.default, { className: "justify-content-between" },
            React.createElement(Navbar_1.default.Brand, null, "Web Forum"),
            React.createElement(Nav_1.default, null,
                React.createElement(Nav_1.default.Link, { onClick: () => setState({ view: "posts" }) }, "Home"),
                user &&
                    React.createElement("div", { style: { display: "flex", justifyContent: "right" } },
                        React.createElement(Nav_1.default.Link, { onClick: () => setState({ view: "home" }) },
                            "Welcome, ",
                            username),
                        React.createElement(Nav_1.default.Link, { onClick: () => setState({ view: "createPost" }) }, "Create Post"),
                        React.createElement(Nav_1.default.Link, { onClick: logout }, "Logout")),
                !user &&
                    React.createElement("div", { style: { display: "flex", justifyContent: "right" } },
                        React.createElement(Nav_1.default.Link, { onClick: () => setState({ view: "register" }) }, "Register"),
                        React.createElement(Nav_1.default.Link, { onClick: () => setState({ view: "login" }) }, "Login"))))));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map