"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statesByCountryCode = void 0;
const _utils_1 = require("../../_utils");
const statesByCountryCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regionDB = (0, _utils_1.getRegionDB)();
        const { iso2CountryCode } = req.params;
        const statesCollection = (yield regionDB).collection("states");
        const statesList = yield statesCollection.find({ country_code: iso2CountryCode }).toArray();
        (0, _utils_1.responseHelper)(res, _utils_1.status.success, _utils_1.message.onlySuccess, statesList);
    }
    catch (error) {
        (0, _utils_1.responseHelper)(res, _utils_1.status.errorServer, _utils_1.message.errorServer, error.toString());
    }
});
exports.statesByCountryCode = statesByCountryCode;
//# sourceMappingURL=statesByCountryCode.js.map