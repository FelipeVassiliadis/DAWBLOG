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
const React = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
require("bootstrap/dist/css/bootstrap.min.css");
const Header_1 = __importDefault(require("./Header"));
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Button_1 = __importDefault(require("react-bootstrap/Button"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const Posts = ({ setState }) => {
    const [posts, setPosts] = (0, react_1.useState)([]);
    const [comments, setComments] = (0, react_1.useState)({});
    const [activeKey, setActiveKey] = (0, react_1.useState)(null);
    const [sortOrder, setSortOrder] = (0, react_1.useState)('desc');
    (0, react_1.useEffect)(() => {
        axios_1.default.get('http://localhost:8000/post')
            .then((res) => res.data)
            .then((data) => {
            const sortedData = data.sort((a, b) => sortOrder === 'asc' ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setPosts(sortedData);
        })
            .catch((err) => {
            console.log(err.message);
        });
    }, [sortOrder]);
    const userToken = localStorage.getItem("user");
    const user = userToken ? (0, jwt_decode_1.default)(JSON.parse(userToken).accessToken) : false;
    const userID = user ? user._id : false;
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };
    const handleAccordionToggle = (postId) => {
        const newActiveKey = activeKey === postId ? null : postId;
        setActiveKey(newActiveKey);
        if (newActiveKey !== null) {
            fetchComments(newActiveKey);
        }
    };
    const fetchComments = (postId) => {
        axios_1.default.get(`http://localhost:8000/post/${postId}/comments`)
            .then((res) => {
            setComments(Object.assign(Object.assign({}, comments), { [postId]: res.data }));
        })
            .catch((err) => {
            console.log(err.message);
        });
    };
    return (React.createElement("div", null,
        React.createElement(Header_1.default, { setState: setState }),
        React.createElement("div", { className: "posts-header", style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '40px'
            } },
            React.createElement("h1", { className: "display-6" }, "Posts"),
            React.createElement("select", { onChange: handleSortChange, value: sortOrder, style: { marginLeft: '20px' } },
                React.createElement("option", { value: "desc" }, "Sort by Recent Posts"),
                React.createElement("option", { value: "asc" }, "Sort by Older Posts"))),
        React.createElement("div", { className: "container mt-4" },
            React.createElement(react_bootstrap_1.Accordion, { activeKey: activeKey, onSelect: handleAccordionToggle }, posts === null || posts === void 0 ? void 0 : posts.map((post) => {
                var _a;
                return (React.createElement(react_bootstrap_1.Accordion.Item, { eventKey: post._id, key: post._id },
                    React.createElement(react_bootstrap_1.Accordion.Header, { style: { backgroundColor: '#006400', color: 'white' } },
                        React.createElement("div", { className: "d-flex align-items-center" },
                            React.createElement("img", { src: require("/public/images/" + post.authorImage), alt: post.author, className: "rounded-circle me-3", style: { maxWidth: "50px", width: "100%", height: "auto" } }),
                            React.createElement("div", null,
                                React.createElement("b", null, post.author)))),
                    React.createElement(react_bootstrap_1.Accordion.Body, null,
                        React.createElement("p", null, post.text),
                        React.createElement("p", null,
                            React.createElement("small", null,
                                "Created at: ",
                                post.createdAt.split('T')[0],
                                " ",
                                post.createdAt.split('T')[1].slice(0, -2)),
                            React.createElement("br", null),
                            React.createElement("small", null,
                                "Updated at: ",
                                post.updatedAt.split('T')[0],
                                " ",
                                post.updatedAt.split('T')[1].slice(0, -2))),
                        React.createElement("div", { className: "comments-section" }, (_a = comments[post._id]) === null || _a === void 0 ? void 0 : _a.map((comment) => (React.createElement("div", { key: comment._id, className: "comment-box", style: { border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" } },
                            React.createElement("p", null,
                                React.createElement("strong", null,
                                    comment.author,
                                    ":"),
                                " ",
                                comment.text),
                            React.createElement("p", { style: { fontSize: "smaller" } },
                                "Commented at: ",
                                new Date(comment.createdAt).toLocaleString()))))),
                        React.createElement(Button_1.default, { variant: "secondary", onClick: () => setState({ view: "createComment", postID: post._id }) }, "Comment"),
                        post.authorID === userID && (React.createElement(Button_1.default, { variant: "secondary", onClick: () => setState({ view: "updatePost", postID: post._id }), style: { marginLeft: '10px' } }, "Update")))));
            })))));
};
exports.default = Posts;
//# sourceMappingURL=Posts.js.map