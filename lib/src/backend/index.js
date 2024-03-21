"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// create simple express server
const client_1 = require("@gala-chain/client");
const express_1 = tslib_1.__importDefault(require("express"));
const controller_1 = require("./controller");
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 4000;
const authenticated = async (req, res, next) => {
    var _a;
    const user = new client_1.ChainUser({
        privateKey: (_a = process.env.DEV_ADMIN_PRIVATE_KEY) !== null && _a !== void 0 ? _a : ""
    });
    req.user = user;
    next();
};
app.get("/", authenticated, async (req, res) => {
    return controller_1.ImageNFTController.getAllImages(req, res);
});
app.get("/plant-apple", async (req, res) => {
    // create new nft
    res.send("createNFT");
});
app.get("/:id", (req, res) => {
    // get image from description
});
app.post("/sign-up", async (req, res) => {
    var _a;
    const { username } = req.body;
    const user = new client_1.ChainUser({
        name: username,
        privateKey: (_a = process.env.DEV_ADMIN_PRIVATE_KEY) !== null && _a !== void 0 ? _a : ""
    });
    await db_1.userModel.createUser(user);
    res.send(user.publicKey);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
