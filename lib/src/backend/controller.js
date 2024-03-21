"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageNFTController = void 0;
const apples_1 = require("src/apples");
const fabric_client_1 = require("./fabric-client");
class ImageNFTController {
    static async getAllImages(req, res) {
        try {
            const clientUser = req.user;
            const submitResult = await fabric_client_1.client.submitTransaction("FetchTrees", new apples_1.AppleTreesDto([new apples_1.AppleTreeDto(apples_1.Variety.GOLDEN_DELICIOUS, 0)]).signed(clientUser.privateKey), apples_1.PagedTreesDto);
            res.send(submitResult);
        }
        catch (error) {
            console.error("Error getting all images:", error);
        }
    }
}
exports.ImageNFTController = ImageNFTController;
