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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegionDB = exports.initializeRegionDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
const mongooseConnectOptions = {
    serverSelectionTimeoutMS: 30000, // Time out after 30s if MongoDB is unreachable
    maxPoolSize: 50, // Limit the number of concurrent connections
    minPoolSize: 5, // Maintain at least 5 connections
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};
const initializeRegionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (global._regionDB) {
        return global._regionDB;
    }
    try {
        const regionDB = mongoose_1.default.createConnection(process.env.MONGODB_URI || "", mongooseConnectOptions);
        yield regionDB.asPromise();
        global._regionDB = regionDB;
        return regionDB;
    }
    catch (error) {
        throw new Error(error.toString());
    }
});
exports.initializeRegionDB = initializeRegionDB;
const getRegionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!global._regionDB) {
        console.warn("RegionDB is not initialized. Reinitializing...");
        yield (0, exports.initializeRegionDB)();
    }
    if (((_a = global._regionDB) === null || _a === void 0 ? void 0 : _a.readyState) !== 1) {
        console.warn("RegionDB connection is not open. Reconnecting...");
        yield ((_b = global._regionDB) === null || _b === void 0 ? void 0 : _b.asPromise());
    }
    return global._regionDB;
});
exports.getRegionDB = getRegionDB;
//# sourceMappingURL=dbConnectionManager.js.map