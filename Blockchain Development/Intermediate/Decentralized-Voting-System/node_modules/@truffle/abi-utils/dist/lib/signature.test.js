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
const Signature = __importStar(require("./signature"));
const assert_1 = __importDefault(require("assert"));
describe("signature computation", () => {
    it("computes simple signatures", () => {
        const entry = {
            type: "event",
            anonymous: false,
            name: "ThingsDone",
            inputs: [
                {
                    name: "a",
                    indexed: false,
                    type: "uint256",
                    internalType: "uint256"
                },
                {
                    name: "b",
                    indexed: false,
                    type: "bytes32",
                    internalType: "bytes32"
                },
                {
                    name: "c",
                    indexed: true,
                    type: "address",
                    internalType: "address payable"
                }
            ]
        };
        const expected = "ThingsDone(uint256,bytes32,address)";
        const signature = Signature.abiSignature(entry);
        assert_1.default.equal(signature, expected);
    });
    it("computes signatures with empty inputs", () => {
        const entry = {
            type: "error",
            name: "ThingsNotDone",
            inputs: []
        };
        const expected = "ThingsNotDone()";
        const signature = Signature.abiSignature(entry);
        assert_1.default.equal(signature, expected);
    });
    it("computes signatures with arrays", () => {
        const entry = {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "doThings",
            inputs: [
                {
                    name: "a",
                    type: "uint256[2]",
                    internalType: "uint256"
                },
                {
                    name: "b",
                    type: "bytes32[4][4]",
                    internalType: "bytes32"
                },
                {
                    name: "c",
                    type: "string[]",
                    internalType: "string[]"
                }
            ]
        };
        const expected = "doThings(uint256[2],bytes32[4][4],string[])";
        const signature = Signature.abiSignature(entry);
        assert_1.default.equal(signature, expected);
    });
    it("computes signatures with tuples", () => {
        const entry = {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "doSillyThings",
            inputs: [
                {
                    name: "a",
                    type: "tuple",
                    internalType: "struct Contract.Struct1",
                    components: [
                        {
                            name: "aa",
                            type: "bool",
                            internalType: "bool"
                        },
                        {
                            name: "ab",
                            type: "address[]",
                            internalType: "address payable[]"
                        }
                    ]
                },
                {
                    name: "b",
                    type: "tuple",
                    internalType: "struct Contract.Struct2",
                    components: [
                        {
                            name: "ba",
                            type: "function",
                            internalType: "function(bytes memory) external pure returns (bytes)"
                        },
                        {
                            name: "ab",
                            type: "tuple",
                            internalType: "struct Contract.Struct3",
                            components: [
                                {
                                    name: "aba",
                                    type: "string",
                                    internalType: "string"
                                },
                                {
                                    name: "abb",
                                    type: "bytes[2]",
                                    internalType: "bytes[2]"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const expected = "doSillyThings((bool,address[]),(function,(string,bytes[2])))";
        const signature = Signature.abiSignature(entry);
        assert_1.default.equal(signature, expected);
    });
    it("computes signatures with arrays of tuples", () => {
        const entry = {
            type: "function",
            stateMutability: "nonpayable",
            outputs: [],
            name: "doVerySillyThings",
            inputs: [
                {
                    name: "a",
                    type: "tuple[2][][2]",
                    internalType: "struct Contract.Struct1",
                    components: [
                        {
                            name: "aa",
                            type: "bool",
                            internalType: "bool"
                        },
                        {
                            name: "ab",
                            type: "address[]",
                            internalType: "address payable[]"
                        }
                    ]
                },
                {
                    name: "b",
                    type: "tuple[][2][]",
                    internalType: "struct Contract.Struct1",
                    components: [
                        {
                            name: "ba",
                            type: "string",
                            internalType: "string"
                        },
                        {
                            name: "bb",
                            type: "int256",
                            internalType: "int256"
                        }
                    ]
                }
            ]
        };
        const expected = "doVerySillyThings((bool,address[])[2][][2],(string,int256)[][2][])";
        const signature = Signature.abiSignature(entry);
        assert_1.default.equal(signature, expected);
    });
});
//# sourceMappingURL=signature.test.js.map