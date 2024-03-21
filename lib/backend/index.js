"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// create simple express server
const client_1 = require("@gala-chain/client");
const express_1 = tslib_1.__importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const authorizedMiddleware = (req, res, next) => {
    // check if user is authorized
    next();
};
app.get("/", (req, res) => {
    // get all created nfts
});
app.post("/", (req, res) => {
    // create new nft
});
app.get("/:id", (req, res) => {
    // get image from description
});
app.post("/sign-up", (req, res) => {
    // create new user
    const user = new client_1.ChainUser();
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
