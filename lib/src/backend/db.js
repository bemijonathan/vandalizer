"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const dbServer = "http://localhost:3000";
class Users {
    async createUser(user) {
        axios_1.default.post(dbServer + "/users", user);
    }
    async getUser(key) {
        return axios_1.default.get(dbServer + `/users/${key}`);
    }
}
exports.userModel = new Users();
