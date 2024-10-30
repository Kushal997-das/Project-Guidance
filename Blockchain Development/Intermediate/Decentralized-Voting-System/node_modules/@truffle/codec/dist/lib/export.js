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
exports.formatFunctionLike = exports.ReturndataDecodingInspector = exports.LogDecodingInspector = exports.containsDeliberateReadError = exports.CalldataDecodingInspector = exports.nativizeEventArgs = exports.nativizeReturn = exports.nativize = exports.stringValueInfoToStringLossy = exports.nativizeAccessList = exports.unsafeNativizeVariables = exports.unsafeNativize = exports.ResultInspector = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:export");
const os_1 = __importDefault(require("os"));
const util_1 = __importDefault(require("util"));
const Format = __importStar(require("./format"));
const Conversion = __importStar(require("./conversion"));
const inspect_1 = require("./format/utils/inspect");
Object.defineProperty(exports, "ResultInspector", { enumerable: true, get: function () { return inspect_1.ResultInspector; } });
Object.defineProperty(exports, "unsafeNativize", { enumerable: true, get: function () { return inspect_1.unsafeNativize; } });
Object.defineProperty(exports, "unsafeNativizeVariables", { enumerable: true, get: function () { return inspect_1.unsafeNativizeVariables; } });
Object.defineProperty(exports, "nativizeAccessList", { enumerable: true, get: function () { return inspect_1.nativizeAccessList; } });
Object.defineProperty(exports, "stringValueInfoToStringLossy", { enumerable: true, get: function () { return inspect_1.stringValueInfoToStringLossy; } });
/**
 * This function is similar to
 * [[Format.Utils.Inspect.unsafeNativize|unsafeNativize]], but is intended to
 * be safe, and also allows for different output formats.  The only currently
 * supported format is "ethers", which is intended to match the way that
 * Truffle Contract currently returns values (based on the Ethers decoder).  As
 * such, it only handles ABI types, and in addition does not handle the types
 * fixed, ufixed, or function.  Note that in these cases it returns `undefined`
 * rather than throwing, as we want this function to be used in contexts where
 * it had better not throw.  It also does not handle circularities, for similar
 * reasons.
 *
 * To handle numeric types, this function takes an optional numberFormatter
 * option that tells it how to handle numbers; this function should take a
 * BigInt as input.  By default, this function will be the identity, and so
 * numbers will be represented as BigInts.
 *
 * Note that this function begins by calling abify, so out-of-range enums (that
 * aren't so out-of-range as to be padding errors) will not return `undefined`.
 * Out-of-range booleans similarly will return true rather than `undefined`.
 * However, other range errors may return `undefined`; this may technically be a
 * slight incompatibility with existing behavior, but should not be relevant
 * except in quite unusual cases.
 *
 * In order to match the behavior for tuples, tuples will be transformed into
 * arrays, but named entries will additionally be keyed by name.  Moreover,
 * indexed variables of reference type will be nativized to an undecoded hex
 * string.
 */
function nativize(result, options = {}) {
    const numberFormatter = options.numberFormatter || (x => x);
    const format = options.format || "ethers";
    switch (format) {
        case "ethers":
            return ethersCompatibleNativize(result, numberFormatter);
    }
}
exports.nativize = nativize;
function ethersCompatibleNativize(result, numberFormatter = x => x) {
    //note: the original version of this function began by calling abify,
    //but we don't do that here because abify requires a userDefinedTypes
    //parameter and we don't want that.
    //However, it only needs that to handle getting the types right.  Since
    //we don't care about that here, we instead do away with abify and handle
    //such matters ourselves (which is less convenient, yeah).
    switch (result.kind) {
        case "error":
            switch (result.error.kind) {
                case "IndexedReferenceTypeError":
                    //strictly speaking for arrays ethers will fail to decode
                    //rather than do this, but, eh
                    return result.error.raw;
                case "EnumOutOfRangeError":
                    return numberFormatter(Conversion.toBigInt(result.error.rawAsBN));
                default:
                    return undefined;
            }
        case "value":
            switch (result.type.typeClass) {
                case "uint":
                case "int":
                    const asBN = (result).value.asBN;
                    return numberFormatter(Conversion.toBigInt(asBN));
                case "enum":
                    const numericAsBN = result.value
                        .numericAsBN;
                    return numberFormatter(Conversion.toBigInt(numericAsBN));
                case "bool":
                    return result.value.asBoolean;
                case "bytes":
                    const asHex = result.value.asHex;
                    return asHex !== "0x" ? asHex : null;
                case "address":
                    return result.value.asAddress;
                case "contract":
                    return result.value.address;
                case "string":
                    return (0, inspect_1.stringValueInfoToStringLossy)(result.value);
                case "userDefinedValueType":
                    return ethersCompatibleNativize(result.value, numberFormatter);
                case "array":
                    return result.value.map(value => ethersCompatibleNativize(value, numberFormatter));
                case "tuple":
                case "struct":
                    //in this case, we need the result to be an array, but also
                    //to have the field names (where extant) as keys
                    const nativized = [];
                    const pairs = (result).value;
                    for (const { name, value } of pairs) {
                        const nativizedValue = ethersCompatibleNativize(value, numberFormatter);
                        nativized.push(nativizedValue);
                        if (name) {
                            nativized[name] = nativizedValue;
                        }
                    }
                    return nativized;
                case "function":
                    switch (result.type.visibility) {
                        case "external":
                            const coercedResult = result;
                            //ethers per se doesn't handle this, but web3's hacked version will
                            //sometimes decode these as just a bytes24, so let's do that
                            return (coercedResult.value.contract.address.toLowerCase() +
                                coercedResult.value.selector.slice(2));
                        case "internal":
                            return undefined;
                    }
                case "fixed":
                case "ufixed":
                default:
                    return undefined;
            }
    }
}
/**
 * This function is similar to [[nativize]], but takes
 * a [[ReturndataDecoding]].  If there's only one returned value, it
 * will be run through compatibleNativize but otherwise unaltered;
 * otherwise the results will be put in an object.
 *
 * Note that if the ReturndataDecoding is not a [[ReturnDecoding]],
 * this will just return `undefined`.
 */
function nativizeReturn(decoding, options = {}) {
    const numberFormatter = options.numberFormatter || (x => x);
    const format = options.format || "ethers";
    switch (format) {
        case "ethers":
            return ethersCompatibleNativizeReturn(decoding, numberFormatter);
    }
}
exports.nativizeReturn = nativizeReturn;
function ethersCompatibleNativizeReturn(decoding, numberFormatter = x => x) {
    if (decoding.kind !== "return") {
        return undefined;
    }
    if (decoding.arguments.length === 1) {
        return ethersCompatibleNativize(decoding.arguments[0].value, numberFormatter);
    }
    const result = {};
    for (let i = 0; i < decoding.arguments.length; i++) {
        const { name, value } = decoding.arguments[i];
        const nativized = ethersCompatibleNativize(value, numberFormatter);
        result[i] = nativized;
        if (name) {
            result[name] = nativized;
        }
    }
    return result;
}
/**
 * This function is similar to [[compatibleNativize]], but takes
 * a [[LogDecoding]], and puts the results in an object.  Note
 * that this does not return the entire event info, but just the
 * `args` for the event.
 */
function nativizeEventArgs(decoding, options = {}) {
    const numberFormatter = options.numberFormatter || (x => x);
    const format = options.format || "ethers";
    switch (format) {
        case "ethers":
            return ethersCompatibleNativizeEventArgs(decoding, numberFormatter);
    }
}
exports.nativizeEventArgs = nativizeEventArgs;
function ethersCompatibleNativizeEventArgs(decoding, numberFormatter = x => x) {
    const result = {};
    for (let i = 0; i < decoding.arguments.length; i++) {
        const { name, value } = decoding.arguments[i];
        const nativized = ethersCompatibleNativize(value, numberFormatter);
        result[i] = nativized;
        if (name) {
            result[name] = nativized;
        }
    }
    //note: if you have an argument named __length__, what ethers
    //actually does is... weird.  we're just going to do this instead,
    //which is simpler and probably more useful, even if it's not strictly
    //the same (I *seriously* doubt anyone was relying on the old behavior,
    //because it's, uh, not very useful)
    result.__length__ = decoding.arguments.length;
    return result;
}
/**
 * Similar to [[ResultInspector]], but for a [[CalldataDecoding]].
 * See [[ResultInspector]] for more information.
 */
class CalldataDecodingInspector {
    constructor(decoding, options) {
        this.decoding = decoding;
        this.options = options || {};
    }
    /**
     * @dev non-standard alternative interface name used by browser-util-inspect
     *      package
     */
    inspect(depth, options) {
        return this[util_1.default.inspect.custom].bind(this)(depth, options);
    }
    [util_1.default.inspect.custom](depth, options) {
        switch (this.decoding.kind) {
            case "function":
                const fullName = `${this.decoding.class.typeName}.${this.decoding.abi.name}`;
                if (this.decoding.interpretations.multicall) {
                    return formatMulticall(fullName, this.decoding.interpretations.multicall, options, this.options);
                }
                else if (this.decoding.interpretations.aggregate) {
                    return formatAggregate(fullName, this.decoding.interpretations.aggregate, options, this.options);
                }
                else if (this.decoding.interpretations.tryAggregate) {
                    const { requireSuccess, calls } = this.decoding.interpretations.tryAggregate;
                    return formatAggregate(fullName, calls, options, this.options, "requireSuccess", options.stylize(requireSuccess.toString(), "number"), true //including try here would be redundant, so suppress it
                    );
                }
                else if (this.decoding.interpretations.tryAggregate) {
                    const { requireSuccess, calls } = this.decoding.interpretations.tryAggregate;
                    return formatAggregate(fullName, calls, options, this.options, "requireSuccess", options.stylize(requireSuccess.toString(), "number"));
                }
                else if (this.decoding.interpretations.deadlinedMulticall) {
                    const { deadline, calls: decodings } = this.decoding.interpretations.deadlinedMulticall;
                    return formatMulticall(fullName, decodings, options, this.options, "deadline", options.stylize(deadline.toString(), "number"));
                }
                else if (this.decoding.interpretations.specifiedBlockhashMulticall) {
                    const { specifiedBlockhash, calls: decodings } = this.decoding.interpretations.specifiedBlockhashMulticall;
                    return formatMulticall(fullName, decodings, options, this.options, "previousBlockhash", options.stylize(specifiedBlockhash, "number"));
                }
                return formatFunctionLike(fullName, this.decoding.arguments, options, this.options);
            case "constructor":
                return formatFunctionLike(`new ${this.decoding.class.typeName}`, this.decoding.arguments, options, this.options);
            case "message":
                const { data, abi } = this.decoding;
                //we'll set up a value and inspect that :)
                const codecValue = {
                    kind: "value",
                    type: {
                        typeClass: "bytes",
                        kind: "dynamic"
                    },
                    value: {
                        asHex: data
                    },
                    interpretations: {}
                };
                if (abi) {
                    return formatFunctionLike(`${this.decoding.class.typeName}.${abi.type}`, [{ value: codecValue }], options, this.options, true // we don't need to see the type here!
                    );
                }
                else {
                    return `Sent raw data to ${this.decoding.class.typeName}: ${util_1.default.inspect(new inspect_1.ResultInspector(codecValue, this.options), options)}`;
                }
            case "unknown":
                return "Receiving contract could not be identified.";
            case "create":
                return "Created contract could not be identified.";
        }
    }
}
exports.CalldataDecodingInspector = CalldataDecodingInspector;
function containsDeliberateReadError(result) {
    switch (result.kind) {
        case "value":
            switch (result.type.typeClass) {
                case "struct":
                    //this is currently only intended for use with storage variables, so I
                    //won't bother with handling tuple, magic, options
                    return result.value.some(({ value }) => containsDeliberateReadError(value));
                case "array":
                    return result.value.some(containsDeliberateReadError);
                case "mapping":
                    return result.value.some(({ value }) => containsDeliberateReadError(value));
                default:
                    return false;
            }
        case "error":
            switch (result.error.kind) {
                case "StorageNotSuppliedError":
                case "CodeNotSuppliedError":
                    return true;
                default:
                    return false;
            }
    }
}
exports.containsDeliberateReadError = containsDeliberateReadError;
/**
 * Similar to [[ResultInspector]], but for a [[LogDecoding]].
 * See [[ResultInspector]] for more information.
 */
class LogDecodingInspector {
    constructor(decoding, options) {
        this.decoding = decoding;
        this.options = options || {};
    }
    /**
     * @dev non-standard alternative interface name used by browser-util-inspect
     *      package
     */
    inspect(depth, options) {
        return this[util_1.default.inspect.custom].bind(this)(depth, options);
    }
    [util_1.default.inspect.custom](depth, options) {
        const eventName = this.decoding.abi.name;
        let fullName;
        if (this.decoding.definedIn) {
            fullName = `${this.decoding.definedIn}.${eventName}`;
        }
        else if (this.decoding.definedIn === null) {
            //file-level event
            fullName = eventName;
        }
        else {
            //event of unknown definition location
            fullName = `${this.decoding.class.typeName}.${eventName}`;
        }
        switch (this.decoding.kind) {
            case "event":
                return formatFunctionLike(fullName, this.decoding.arguments, options, this.options);
            case "anonymous":
                return formatFunctionLike(`<anonymous> ${fullName}`, this.decoding.arguments, options, this.options);
        }
    }
}
exports.LogDecodingInspector = LogDecodingInspector;
/**
 * Similar to [[ResultInspector]], but for a [[ReturndataDecoding]].
 * See [[ResultInspector]] for more information.
 */
class ReturndataDecodingInspector {
    constructor(decoding, options) {
        this.decoding = decoding;
        this.options = options || {};
    }
    /**
     * @dev non-standard alternative interface name used by browser-util-inspect
     *      package
     */
    inspect(depth, options) {
        return this[util_1.default.inspect.custom].bind(this)(depth, options);
    }
    [util_1.default.inspect.custom](depth, options) {
        switch (this.decoding.kind) {
            case "return":
                return formatFunctionLike("Returned values: ", this.decoding.arguments, options, this.options);
            case "returnmessage":
                const { data } = this.decoding;
                //we'll just set up a value and inspect that :)
                const codecValue = {
                    kind: "value",
                    type: {
                        typeClass: "bytes",
                        kind: "dynamic"
                    },
                    value: {
                        asHex: data
                    },
                    interpretations: {}
                };
                const dataString = util_1.default.inspect(new inspect_1.ResultInspector(codecValue, this.options), options);
                return `Returned raw data: ${dataString}`;
            case "selfdestruct":
                return "The contract self-destructed.";
            case "failure":
                return "The transaction reverted without a message.";
            case "revert":
                const name = this.decoding.definedIn
                    ? `${this.decoding.definedIn.typeName}.${this.decoding.abi.name}`
                    : this.decoding.abi.name;
                return formatFunctionLike(`Error thrown:${os_1.default.EOL}${name}`, this.decoding.arguments, options, this.options);
            case "bytecode":
                //this one gets custom handling :P
                const contractKind = this.decoding.class.contractKind || "contract";
                const firstLine = this.decoding.address !== undefined
                    ? `Returned bytecode for a ${contractKind} ${this.decoding.class.typeName} at ${this.decoding.address}.`
                    : `Returned bytecode for a ${contractKind} ${this.decoding.class.typeName}.`;
                if (this.decoding.immutables && this.decoding.immutables.length > 0) {
                    const prefixes = this.decoding.immutables.map(({ name, class: { typeName } }) => `${typeName}.${name}: `);
                    const maxLength = Math.max(...prefixes.map(prefix => prefix.length));
                    const paddedPrefixes = prefixes.map(prefix => prefix.padStart(maxLength));
                    const formattedValues = this.decoding.immutables.map((value, index) => {
                        const prefix = paddedPrefixes[index];
                        const formatted = indentExcludingFirstLine(util_1.default.inspect(new inspect_1.ResultInspector(value.value, this.options), options), maxLength);
                        return prefix + formatted;
                    });
                    return `Immutable values:${os_1.default.EOL}${formattedValues.join(os_1.default.EOL)}`;
                }
                else {
                    return firstLine;
                }
            case "unknownbytecode":
                return "Bytecode was returned, but it could not be identified.";
        }
    }
}
exports.ReturndataDecodingInspector = ReturndataDecodingInspector;
//copied from TestRunner, but simplified for our purposes :)
function indentArray(input, indentation) {
    return input.map(line => " ".repeat(indentation) + line);
}
function indentExcludingFirstLine(input, indentation) {
    const lines = input.split(/\r?\n/);
    return [lines[0], ...indentArray(lines.slice(1), indentation)].join(os_1.default.EOL);
}
function indentMiddleLines(input, indentation) {
    const lines = input.split(/\r?\n/);
    if (lines.length < 2) {
        return input;
    }
    return [
        lines[0],
        ...indentArray(lines.slice(1, -1), indentation),
        lines[lines.length - 1]
    ].join(os_1.default.EOL);
}
//used for formatting things that look like function calls:
//events (including anonymous events), identifiable transactions,
//and revert messages
//"header" param should include everything before the initial parenthesis
/**
 * @hidden
 */
function formatFunctionLike(header, values, options, inspectorOptions, suppressType = false, indent = 2 //for use by debug-utils
) {
    if (values.length === 0) {
        return `${header}()`;
    }
    let formattedValues = values.map(({ name, indexed, value }, index) => {
        const namePrefix = name ? `${name}: ` : "";
        const indexedPrefix = indexed ? "<indexed> " : "";
        const prefix = namePrefix + indexedPrefix;
        const displayValue = util_1.default.inspect(new inspect_1.ResultInspector(value, inspectorOptions), options);
        const typeString = suppressType
            ? ""
            : ` (type: ${Format.Types.typeStringWithoutLocation(value.type)})`;
        return indentMiddleLines(prefix +
            displayValue +
            typeString +
            (index < values.length - 1 ? "," : ""), indent);
    });
    return indentMiddleLines(`${header}(${os_1.default.EOL}${formattedValues.join(os_1.default.EOL)}${os_1.default.EOL})`, indent);
}
exports.formatFunctionLike = formatFunctionLike;
function formatMulticall(fullName, decodings, options, inspectorOptions, additionalParameterName, additionalParameterValue) {
    if (decodings.length === 0) {
        return `${fullName}()`;
    }
    const indent = 2;
    let formattedDecodings = decodings.map((decoding, index) => {
        const formattedDecoding = decoding === null
            ? "<decoding error>"
            : util_1.default.inspect(new CalldataDecodingInspector(decoding, inspectorOptions), options);
        return formattedDecoding + (index < decodings.length - 1 ? "," : "");
    });
    if (additionalParameterName) {
        formattedDecodings.unshift(`${additionalParameterName}: ${additionalParameterValue},`);
    }
    return indentMiddleLines(`${fullName}(${os_1.default.EOL}${formattedDecodings.join(os_1.default.EOL)}${os_1.default.EOL})`, indent);
}
function formatAggregate(fullName, calls, options, inspectorOptions, additionalParameterName, additionalParameterValue, suppressTry = false) {
    if (calls.length === 0) {
        return `${fullName}()`;
    }
    const indent = 2;
    let formattedCalls = calls.map(({ address, allowFailure, value, decoding }, index) => {
        let formattedCall = decoding === null
            ? "<decoding error>"
            : util_1.default.inspect(new CalldataDecodingInspector(decoding, inspectorOptions), options);
        if (value !== null && value.gtn(0)) {
            formattedCall = formattedCall.replace(".", `{value: ${options.stylize(value.toString(), "number")}}.` //HACK: splice in the value
            );
        }
        if (address !== null) {
            formattedCall = formattedCall.replace(".", `(${options.stylize(address, "number")}).`); //HACK: splice in the address
        }
        if (allowFailure && !suppressTry && decoding !== null) {
            formattedCall = "[try] " + formattedCall;
        }
        return formattedCall + (index < calls.length - 1 ? "," : "");
    });
    if (additionalParameterName) {
        formattedCalls.unshift(`${additionalParameterName}: ${additionalParameterValue},`);
    }
    return indentMiddleLines(`${fullName}(${os_1.default.EOL}${formattedCalls.join(os_1.default.EOL)}${os_1.default.EOL})`, indent);
}
//# sourceMappingURL=export.js.map