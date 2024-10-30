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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-extended");
const jest_1 = require("@fast-check/jest");
const Arbitrary = __importStar(require("./arbitrary"));
const assert_1 = __importDefault(require("assert"));
const Parse = __importStar(require("./parse"));
const Signature = __importStar(require("./signature"));
describe("Signature parsing (property-based tests)", () => {
    (0, jest_1.testProp)("abiSignature undoes parseFunctionSignature", [Arbitrary.FunctionEntry()], entry => {
        const correctSignature = Signature.abiSignature(entry); //sorry
        const reparsedEntry = Parse.parseFunctionSignature(correctSignature);
        const regeneratedSignature = Signature.abiSignature(reparsedEntry);
        assert_1.default.equal(regeneratedSignature, correctSignature);
    });
    (0, jest_1.testProp)("abiSignature undoes parseErrorSignature", [Arbitrary.ErrorEntry()], entry => {
        const correctSignature = Signature.abiSignature(entry); //sorry
        const reparsedEntry = Parse.parseErrorSignature(correctSignature);
        const regeneratedSignature = Signature.abiSignature(reparsedEntry);
        assert_1.default.equal(regeneratedSignature, correctSignature);
    });
    (0, jest_1.testProp)("abiSignature undoes parseEventSignature", [Arbitrary.EventEntry()], entry => {
        const correctSignature = Signature.abiSignature(entry); //sorry
        const reparsedEntry = Parse.parseEventSignature(correctSignature);
        const regeneratedSignature = Signature.abiSignature(reparsedEntry);
        assert_1.default.equal(regeneratedSignature, correctSignature);
    });
});
describe("Signature parsing (manual tests)", () => {
    it("Parses simple signature", () => {
        const signature = "ThingsDone(uint256,bytes32,address)";
        const computed = Parse.parseEventSignature(signature);
        const expected = {
            type: "event",
            anonymous: false,
            name: "ThingsDone",
            inputs: [
                {
                    name: "",
                    indexed: false,
                    type: "uint256"
                },
                {
                    name: "",
                    indexed: false,
                    type: "bytes32"
                },
                {
                    name: "",
                    indexed: false,
                    type: "address"
                }
            ]
        };
        assert_1.default.deepStrictEqual(computed, expected);
    });
    it("Parses signature with no inputs", () => {
        const signature = "ThingsNotDone()";
        const computed = Parse.parseErrorSignature(signature);
        const expected = {
            type: "error",
            name: "ThingsNotDone",
            inputs: []
        };
        assert_1.default.deepStrictEqual(computed, expected);
    });
    it("Parses signature with arrays", () => {
        const signature = "doThings(uint256[2],bytes32[4][4],string[])";
        const computed = Parse.parseFunctionSignature(signature);
        const expected = {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "doThings",
            inputs: [
                {
                    name: "",
                    type: "uint256[2]"
                },
                {
                    name: "",
                    type: "bytes32[4][4]"
                },
                {
                    name: "",
                    type: "string[]"
                }
            ]
        };
        assert_1.default.deepStrictEqual(computed, expected);
    });
    it("Parses signature with tuples", () => {
        const signature = "doSillyThings((bool,address[]),(function,(string,bytes[2])))";
        const computed = Parse.parseFunctionSignature(signature);
        const expected = {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "doSillyThings",
            inputs: [
                {
                    name: "",
                    type: "tuple",
                    components: [
                        {
                            name: "",
                            type: "bool"
                        },
                        {
                            name: "",
                            type: "address[]"
                        }
                    ]
                },
                {
                    name: "",
                    type: "tuple",
                    components: [
                        {
                            name: "",
                            type: "function"
                        },
                        {
                            name: "",
                            type: "tuple",
                            components: [
                                {
                                    name: "",
                                    type: "string"
                                },
                                {
                                    name: "",
                                    type: "bytes[2]"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        assert_1.default.deepStrictEqual(computed, expected);
    });
    it("Parses signature with arrays of tuples", () => {
        const signature = "doVerySillyThings((bool,address[])[2][][2],(string,int256)[][2][])";
        const computed = Parse.parseFunctionSignature(signature);
        const expected = {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "doVerySillyThings",
            inputs: [
                {
                    name: "",
                    type: "tuple[2][][2]",
                    components: [
                        {
                            name: "",
                            type: "bool"
                        },
                        {
                            name: "",
                            type: "address[]"
                        }
                    ]
                },
                {
                    name: "",
                    type: "tuple[][2][]",
                    components: [
                        {
                            name: "",
                            type: "string"
                        },
                        {
                            name: "",
                            type: "int256"
                        }
                    ]
                }
            ]
        };
        assert_1.default.deepStrictEqual(computed, expected);
    });
});
//# sourceMappingURL=parse.test.js.map