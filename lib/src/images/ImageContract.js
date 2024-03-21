"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageContract = void 0;
const tslib_1 = require("tslib");
const chaincode_1 = require("@gala-chain/chaincode");
const package_json_1 = require("../../package.json");
class ImageContract extends chaincode_1.GalaContract {
    constructor() {
        super("ImageContract", package_json_1.version);
    }
    async PlantTree(ctx, dto) {
        await plantTree(ctx, dto);
    }
}
exports.ImageContract = ImageContract;
tslib_1.__decorate([
    (0, chaincode_1.Submit)({
        in: AppleTreeDto
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [chaincode_1.GalaChainContext, typeof (_a = typeof AppleTreeDto !== "undefined" && AppleTreeDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageContract.prototype, "PlantTree", null);
