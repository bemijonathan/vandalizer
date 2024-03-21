import { ChainClient, ContractConfig, HFClientConfig, gcclient } from "@gala-chain/client";
import path from "path";

export function getFabricClient(): ChainClient {
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

  const client = gcclient.forConnectionProfile(params).forContract(contract);
  return client;
}

export const client = getFabricClient();
