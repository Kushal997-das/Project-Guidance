"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-extended");
const jest_1 = require("@fast-check/jest");
const Arbitrary = __importStar(require("./arbitrary"));
const normalize_1 = require("./normalize");
describe("normalize", () => {
    (0, jest_1.testProp)(`fills in "type" property for function entries`, [Arbitrary.Abi()], looseAbi => {
        const abi = (0, normalize_1.normalize)(looseAbi);
        expect(abi).toSatisfyAll(entry => "type" in entry);
    });
    (0, jest_1.testProp)(`never includes "payable" or "constant"`, [Arbitrary.Abi()], looseAbi => {
        const abi = (0, normalize_1.normalize)(looseAbi);
        expect(abi).toSatisfyAll(entry => !("payable" in entry));
        expect(abi).toSatisfyAll(entry => !("constant" in entry));
    });
    (0, jest_1.testProp)(`always includes "outputs" for function entries`, [Arbitrary.Abi()], looseAbi => {
        const abi = (0, normalize_1.normalize)(looseAbi);
        expect(abi.filter(({ type }) => type === "function")).toSatisfyAll(entry => "outputs" in entry);
        expect(abi).toSatisfyAll(entry => !("constant" in entry));
    });
    (0, jest_1.testProp)(`always includes "stateMutability" for entries that aren't events or errors`, [Arbitrary.Abi()], looseAbi => {
        const abi = (0, normalize_1.normalize)(looseAbi);
        expect(abi.filter(({ type }) => type !== "event" && type !== "error")).toSatisfyAll(entry => "stateMutability" in entry);
    });
    (0, jest_1.testProp)("is idempotent", [Arbitrary.Abi()], looseAbi => {
        const abi = (0, normalize_1.normalize)(looseAbi);
        expect((0, normalize_1.normalize)(abi)).toEqual(abi);
    });
});
//# sourceMappingURL=normalize.test.js.map