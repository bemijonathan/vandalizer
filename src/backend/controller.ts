import { AppleTreeDto, AppleTreesDto, PagedTreesDto, Variety } from "src/apples";

import { client } from "./fabric-client";

export class ImageNFTController {
  static async getAllImages(req: any, res: any) {
    try {
      const clientUser = req.user;
      const submitResult = await client.submitTransaction(
        "FetchTrees",
        new AppleTreesDto([new AppleTreeDto(Variety.GOLDEN_DELICIOUS, 0)]).signed(clientUser.privateKey),
        PagedTreesDto
      );

      res.send(submitResult);
    } catch (error) {
      console.error("Error getting all images:", error);
    }
  }
}
