"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const regionDataRouter_1 = __importDefault(require("./regionDataRouter"));
const router = express_1.default.Router();
exports.default = () => {
    (0, regionDataRouter_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map