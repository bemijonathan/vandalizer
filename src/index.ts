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
import "dotenv/config";

import { GalaContract, GalaJSONSerializer } from "@gala-chain/chaincode";

import { AppleContract, AppleTreeDto, AppleTreesDto, PagedTreesDto, Variety } from "./apples";
import { GalaChainTokenContract } from "./token";
import { PublicKeyContract } from "./pk";
import { ChainClient, ChainUser, ContractConfig, HFClientConfig, gcclient } from "@gala-chain/client";
import path from "path";

export const contracts: { new (): GalaContract }[] = [
  PublicKeyContract,
  GalaChainTokenContract,
  AppleContract
];

export const serializers = {
  transaction: "galaJsonSerializer",
  serializers: {
    galaJsonSerializer: GalaJSONSerializer
  }
};

const params: HFClientConfig = {
  orgMsp: "PartnerOrg1",
  userId: "admin",
  userSecret: "adminpw",
  connectionProfilePath: path.resolve(__dirname, "../../test-network/connection-profiles/cpp-partner.json")
};

const contract: ContractConfig = {
  channelName: "product-channel",
  chaincodeName: "basic-product",
  contractName: "AppleContract"
};

const client: ChainClient = gcclient.forConnectionProfile(params).forContract(contract);

async function setupClient() {
  try {
    const clientUser = new ChainUser({
      privateKey: process.env.DEV_ADMIN_PRIVATE_KEY ?? ""
    });

    const submitResult = await client.submitTransaction(
      "FetchTrees",
      new AppleTreesDto([new AppleTreeDto(Variety.GOLDEN_DELICIOUS, 0)]).signed(clientUser.privateKey),
      PagedTreesDto
    );
    console.log("Transaction Result:", submitResult);
  } catch (error) {
    console.error("Error setting up the Hyperledger Fabric client:", error);
    await client.disconnect(); // Disconnect the client when done
  }
}
