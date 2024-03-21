"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.getFabricClient = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@gala-chain/client");
const path_1 = tslib_1.__importDefault(require("path"));
function getFabricClient() {
    const params = {
        orgMsp: "PartnerOrg1",
        userId: "admin",
        userSecret: "adminpw",
        connectionProfilePath: path_1.default.resolve(__dirname, "../../test-network/connection-profiles/cpp-partner.json")
    };
    const contract = {
        channelName: "product-channel",
        chaincodeName: "basic-product",
        contractName: "AppleContract"
    };
    const client = client_1.gcclient.forConnectionProfile(params).forContract(contract);
    return client;
}
exports.getFabricClient = getFabricClient;
exports.client = getFabricClient();
