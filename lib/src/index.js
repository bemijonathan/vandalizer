"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializers = exports.contracts = void 0;
const tslib_1 = require("tslib");
// sort-imports-ignore
/*
 * Copyright (c) Gala Games Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
require("dotenv/config");
const chaincode_1 = require("@gala-chain/chaincode");
const apples_1 = require("./apples");
const token_1 = require("./token");
const pk_1 = require("./pk");
const client_1 = require("@gala-chain/client");
const path_1 = tslib_1.__importDefault(require("path"));
exports.contracts = [
    pk_1.PublicKeyContract,
    token_1.GalaChainTokenContract,
    apples_1.AppleContract
];
exports.serializers = {
    transaction: "galaJsonSerializer",
    serializers: {
        galaJsonSerializer: chaincode_1.GalaJSONSerializer
    }
};
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
async function setupClient() {
    var _a;
    try {
        const clientUser = new client_1.ChainUser({
            privateKey: (_a = process.env.DEV_ADMIN_PRIVATE_KEY) !== null && _a !== void 0 ? _a : ""
        });
        const submitResult = await client.submitTransaction("FetchTrees", new apples_1.AppleTreesDto([new apples_1.AppleTreeDto(apples_1.Variety.GOLDEN_DELICIOUS, 0)]).signed(clientUser.privateKey), apples_1.PagedTreesDto);
        console.log("Transaction Result:", submitResult);
    }
    catch (error) {
        console.error("Error setting up the Hyperledger Fabric client:", error);
        await client.disconnect(); // Disconnect the client when done
    }
}
