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
exports.wrapWithCases = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap:dispatch");
const Format = __importStar(require("../format"));
const errors_1 = require("./errors");
function* wrapWithCases(dataType, input, wrapOptions, cases) {
    let bestError;
    const specificityFloor = wrapOptions.specificityFloor || 0;
    for (const caseFn of cases) {
        try {
            return yield* caseFn(dataType, input, Object.assign(Object.assign({}, wrapOptions), { specificityFloor: 0 }));
        }
        catch (error) {
            if (!(error instanceof errors_1.TypeMismatchError)) {
                //rethrow unexpected errors
                throw error;
            }
            else if (!bestError || error.specificity > bestError.specificity) {
                bestError = error;
            }
        }
    }
    //if we've made it this far, no case has matched
    if (bestError && bestError.specificity < specificityFloor) {
        bestError.specificity = specificityFloor; //mutating this should be fine, right?
    }
    throw bestError || new errors_1.TypeMismatchError(//last-resort error
    dataType, input, wrapOptions.name, specificityFloor, //it doesn't matter, but we'll make this error lowest specificity
    `Input for ${wrapOptions.name} was not recognizable as type ${Format.Types.typeStringWithoutLocation(dataType)}`);
    //(note: we don't actually want to rely on the last-resort error, we'll
    //instead prefer last-resort cases that just throw an error so we can get
    //more specific messages, but I'm including this anyway just to be certain)
}
exports.wrapWithCases = wrapWithCases;
//# sourceMappingURL=dispatch.js.map