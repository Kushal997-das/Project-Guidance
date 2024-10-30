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
exports.stringValueInfoToStringLossy = exports.nativizeAccessList = exports.unsafeNativize = exports.unsafeNativizeVariables = exports.ResultInspector = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:format:utils:inspect");
const util_1 = __importDefault(require("util"));
const Format = __importStar(require("../common"));
const Conversion = __importStar(require("../../conversion"));
const EvmUtils = __importStar(require("../../evm/utils"));
const Exception = __importStar(require("./exception"));
//HACK?
function cleanStylize(options) {
    const clonedOptions = Object.assign({}, options);
    delete clonedOptions.stylize;
    return clonedOptions;
}
/**
 * This class is meant to be used with Node's
 * [util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_object_options)
 * function.  Given a [[Format.Values.Result]] `value`, one can use
 * `new ResultInspector(value)` to create a ResultInspector for that value,
 * which can be used with util.inspect() to create a human-readable string
 * representing the value.
 *
 * @example
 * Suppose `value` is a Result.  In Node, the following would print to the
 * console a human-readable representation of `value`, with colors enabled,
 * no maximum depth, and no maximum array length, and lines (usually) no
 * longer than 80 characters:
 * ```javascript
 * console.log(
 *   util.inspect(
 *     new ResultInspector(value),
 *     {
 *       colors: true,
 *       depth: null,
 *       maxArrayLength: null,
 *       breakLength: 80
 *     }
 *   )
 * );
 * ```
 * Of course, there are many other ways to use util.inspect; see Node's
 * documentation, linked above, for more.
 */
class ResultInspector {
    constructor(result, options) {
        this.result = result;
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
        switch (this.result.kind) {
            case "value":
                switch (this.result.type.typeClass) {
                    case "uint":
                    case "int":
                        return options.stylize((this.result).value.asBN.toString(), "number");
                    case "fixed":
                    case "ufixed":
                        //note: because this is just for display, we don't bother adjusting the magic values Big.NE or Big.PE;
                        //we'll trust those to their defaults
                        return options.stylize((this.result).value.asBig.toString(), "number");
                    case "bool":
                        return util_1.default.inspect(this.result.value.asBoolean, options);
                    case "bytes":
                        let hex = this.result.value.asHex;
                        switch (this.result.type.kind) {
                            case "static":
                                return options.stylize(hex, "number");
                            case "dynamic":
                                return options.stylize(`hex'${hex.slice(2)}'`, "string");
                        }
                    case "address": {
                        const coercedValue = this.result;
                        //the address/contract distinction has gotten pretty silly!
                        //so we're just going to convert to the contract case and
                        //use the existing code there.
                        const contractValueInfo = coercedValue.interpretations.contractClass
                            ? {
                                kind: "known",
                                address: coercedValue.value.asAddress,
                                class: coercedValue.interpretations.contractClass
                            }
                            : {
                                kind: "unknown",
                                address: coercedValue.value.asAddress
                            };
                        return util_1.default.inspect(new ContractInfoInspector(contractValueInfo, coercedValue.interpretations.ensName, this.options), options);
                    }
                    case "string":
                        return util_1.default.inspect(stringValueInfoToStringLossy(this.result.value), options);
                    case "array": {
                        let coercedResult = this.result;
                        if (coercedResult.reference !== undefined) {
                            return formatCircular(coercedResult.reference, options);
                        }
                        return util_1.default.inspect(coercedResult.value.map(element => new ResultInspector(element, this.options)), options);
                    }
                    case "mapping":
                        if (!this.options.renderMappingsViaObjects) {
                            //normal case
                            return util_1.default.inspect(new Map(this.result.value.map(({ key, value }) => [
                                new ResultInspector(key, this.options),
                                new ResultInspector(value, this.options)
                            ])), options);
                        }
                        else {
                            //compatibility case
                            return util_1.default.inspect(Object.assign({}, ...this.result.value.map(({ key, value }) => ({
                                //need to stringify key
                                [util_1.default.inspect(new ResultInspector(key, this.options), options)]: new ResultInspector(value, this.options)
                            }))), options);
                        }
                    case "struct": {
                        let coercedResult = this.result;
                        if (coercedResult.reference !== undefined) {
                            return formatCircular(coercedResult.reference, options);
                        }
                        return util_1.default.inspect(Object.assign({}, ...coercedResult.value.map(({ name, value }) => ({
                            [name]: new ResultInspector(value, this.options)
                        }))), options);
                    }
                    case "userDefinedValueType": {
                        const typeName = Format.Types.typeStringWithoutLocation(this.result.type);
                        const coercedResult = (this.result);
                        const inspectOfUnderlying = util_1.default.inspect(new ResultInspector(coercedResult.value, this.options), options);
                        return `${typeName}.wrap(${inspectOfUnderlying})`; //note only the underlying part is stylized
                    }
                    case "tuple": {
                        let coercedResult = this.result;
                        //if everything is named, do same as with struct.
                        //if not, just do an array.
                        //(good behavior in the mixed case is hard, unfortunately)
                        if (coercedResult.value.every(({ name }) => name)) {
                            return util_1.default.inspect(Object.assign({}, ...coercedResult.value.map(({ name, value }) => ({
                                [name]: new ResultInspector(value, this.options)
                            }))), options);
                        }
                        else {
                            return util_1.default.inspect(coercedResult.value.map(({ value }) => new ResultInspector(value, this.options)), options);
                        }
                    }
                    case "type": {
                        switch (this.result.type.type.typeClass) {
                            case "contract":
                                //same as struct case but w/o circularity check
                                return util_1.default.inspect(Object.assign({}, ...this.result.value.map(({ name, value }) => ({
                                    [name]: new ResultInspector(value, this.options)
                                }))), options);
                            case "enum": {
                                return enumTypeName(this.result.type.type);
                            }
                        }
                    }
                    case "magic":
                        return util_1.default.inspect(Object.assign({}, ...Object.entries(this.result.value).map(([key, value]) => ({
                            [key]: new ResultInspector(value, this.options)
                        }))), options);
                    case "enum": {
                        return enumFullName(this.result); //not stylized
                    }
                    case "contract": {
                        const coercedValue = this.result;
                        return util_1.default.inspect(new ContractInfoInspector(coercedValue.value, coercedValue.interpretations.ensName, this.options), options);
                    }
                    case "function":
                        switch (this.result.type.visibility) {
                            case "external": {
                                const coercedResult = this
                                    .result;
                                const contractString = util_1.default.inspect(new ContractInfoInspector(coercedResult.value.contract, coercedResult.interpretations.contractEnsName, this.options), Object.assign(Object.assign({}, cleanStylize(options)), { colors: false }));
                                let firstLine;
                                switch (coercedResult.value.kind) {
                                    case "known":
                                        firstLine = `[Function: ${coercedResult.value.abi.name} of`;
                                        break;
                                    case "invalid":
                                    case "unknown":
                                        firstLine = `[Function: Unknown selector ${coercedResult.value.selector} of`;
                                        break;
                                }
                                let secondLine = `${contractString}]`;
                                let breakingSpace = firstLine.length + secondLine.length + 1 > options.breakLength
                                    ? "\n"
                                    : " ";
                                //now, put it together
                                return options.stylize(firstLine + breakingSpace + secondLine, "special");
                            }
                            case "internal": {
                                let coercedResult = (this.result);
                                switch (coercedResult.value.kind) {
                                    case "function":
                                        if (coercedResult.value.definedIn) {
                                            return options.stylize(`[Function: ${coercedResult.value.definedIn.typeName}.${coercedResult.value.name}]`, "special");
                                        }
                                        else {
                                            return options.stylize(`[Function: ${coercedResult.value.name}]`, "special");
                                        }
                                    case "exception":
                                        switch (coercedResult.value.rawInformation.kind) {
                                            case "index":
                                                return options.stylize(`[Function: <uninitialized>]`, "special");
                                            case "pcpair":
                                                //see above for discussion of this distinction
                                                return coercedResult.value.rawInformation
                                                    .deployedProgramCounter === 0
                                                    ? options.stylize(`[Function: <zero>]`, "special")
                                                    : options.stylize(`[Function: <uninitialized>]`, "special");
                                        }
                                    case "unknown":
                                        let firstLine = `[Function: could not decode (raw info:`;
                                        let secondLine = `${formatInternalFunctionRawInfo(coercedResult.value.rawInformation)})]`;
                                        let breakingSpace = firstLine.length + secondLine.length + 1 >
                                            options.breakLength
                                            ? "\n"
                                            : " ";
                                        //now, put it together
                                        return options.stylize(firstLine + breakingSpace + secondLine, "special");
                                }
                            }
                        }
                }
            case "error": {
                debug("this.result: %O", this.result);
                let errorResult = this.result; //the hell?? why couldn't it make this inference??
                switch (errorResult.error.kind) {
                    case "WrappedError":
                        return util_1.default.inspect(new ResultInspector(errorResult.error.error, this.options), options);
                    case "UintPaddingError":
                        return `Uint has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "IntPaddingError":
                        return `Int has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "UintPaddingError":
                        return `Ufixed has (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "FixedPaddingError":
                        return `Fixed has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "BoolOutOfRangeError":
                        return `Invalid boolean (numeric value ${errorResult.error.rawAsBN.toString()})`;
                    case "BoolPaddingError":
                        return `Boolean has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "BytesPaddingError":
                        return `Bytestring has extra trailing bytes (padding error) (raw value ${errorResult.error.raw})`;
                    case "AddressPaddingError":
                        return `Address has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "EnumOutOfRangeError":
                        return `Invalid ${enumTypeName(errorResult.error.type)} (numeric value ${errorResult.error.rawAsBN.toString()})`;
                    case "EnumPaddingError":
                        return `Enum ${enumTypeName(errorResult.error.type)} has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "EnumNotFoundDecodingError":
                        return `Unknown enum type ${enumTypeName(errorResult.error.type)} of id ${errorResult.error.type.id} (numeric value ${errorResult.error.rawAsBN.toString()})`;
                    case "ContractPaddingError":
                        return `Contract address has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "FunctionExternalNonStackPaddingError":
                        return `External function has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "FunctionExternalStackPaddingError":
                        return `External function address or selector has extra leading bytes (padding error) (raw address ${errorResult.error.rawAddress}, raw selector ${errorResult.error.rawSelector})`;
                    case "FunctionInternalPaddingError":
                        return `Internal function has incorrect padding (expected padding: ${errorResult.error.paddingType}) (raw value ${errorResult.error.raw})`;
                    case "NoSuchInternalFunctionError":
                        return `Invalid function (${formatInternalFunctionRawInfo(errorResult.error.rawInformation)}) of contract ${errorResult.error.context.typeName}`;
                    case "DeployedFunctionInConstructorError":
                        return `Deployed-style function (PC=${errorResult.error.rawInformation.deployedProgramCounter}) in constructor`;
                    case "MalformedInternalFunctionError":
                        return `Malformed internal function w/constructor PC only (value: ${errorResult.error.rawInformation.constructorProgramCounter})`;
                    case "IndexedReferenceTypeError": //for this one we'll bother with some line-wrapping
                        let firstLine = `Cannot decode indexed parameter of reference type ${errorResult.error.type.typeClass}`;
                        let secondLine = `(raw value ${errorResult.error.raw})`;
                        let breakingSpace = firstLine.length + secondLine.length + 1 > options.breakLength
                            ? "\n"
                            : " ";
                        return firstLine + breakingSpace + secondLine;
                    case "OverlongArraysAndStringsNotImplementedError":
                        return `Array or string is too long (length ${errorResult.error.lengthAsBN.toString()}); decoding is not supported`;
                    case "OverlargePointersNotImplementedError":
                        return `Pointer is too large (value ${errorResult.error.pointerAsBN.toString()}); decoding is not supported`;
                    case "UserDefinedTypeNotFoundError":
                    case "UnsupportedConstantError":
                    case "UnusedImmutableError":
                    case "ReadErrorStack":
                    case "ReadErrorStorage":
                    case "ReadErrorBytes":
                        return Exception.message(errorResult.error); //yay, these five are already defined!
                    case "StorageNotSuppliedError":
                    case "CodeNotSuppliedError": //this latter one is not used at present
                        //these ones have a message, but we're going to special-case it
                        return options.stylize("?", "undefined");
                }
            }
        }
    }
}
exports.ResultInspector = ResultInspector;
//these get their own class to deal with a minor complication
class ContractInfoInspector {
    constructor(value, ensName, options) {
        this.value = value;
        this.ensName = ensName;
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
        const { noHideAddress } = this.options;
        const addressString = options.stylize(this.value.address, "number");
        let mainIdentifier = addressString;
        if (this.ensName) {
            //replace address with name
            mainIdentifier = options.stylize(stringValueInfoToStringLossy(this.ensName), "special");
        }
        let withClass;
        switch (this.value.kind) {
            case "known":
                withClass = `${mainIdentifier} (${this.value.class.typeName})`;
                break;
            case "unknown":
                withClass = `${mainIdentifier} of unknown class`;
                break;
        }
        if (this.ensName && noHideAddress) {
            //this might get a bit long, so let's break it up if needed
            const breakingSpace = withClass.length + addressString.length + 3 > options.breakLength
                ? "\n"
                : " ";
            return `${withClass}${breakingSpace}[${addressString}]`;
        }
        else {
            return withClass;
        }
    }
}
function enumTypeName(enumType) {
    return ((enumType.kind === "local" ? enumType.definingContractName + "." : "") +
        enumType.typeName);
}
function formatInternalFunctionRawInfo(info) {
    switch (info.kind) {
        case "pcpair":
            return `Deployed PC=${info.deployedProgramCounter}, Constructor PC=${info.constructorProgramCounter}`;
        case "index":
            return `Index=${info.functionIndex}`;
    }
}
//this function will be used in the future for displaying circular
//structures
function formatCircular(loopLength, options) {
    return options.stylize(`[Circular (=up ${loopLength})]`, "special");
}
function enumFullName(value) {
    switch (value.type.kind) {
        case "local":
            return `${value.type.definingContractName}.${value.type.typeName}.${value.value.name}`;
        case "global":
            return `${value.type.typeName}.${value.value.name}`;
    }
}
/**
 * WARNING! Do NOT use this function in real code unless you
 * absolutely have to!  Using it in controlled tests is fine,
 * but do NOT use it in real code if you have any better option!
 * See [[unsafeNativize]] for why!
 */
function unsafeNativizeVariables(variables) {
    return Object.assign({}, ...Object.entries(variables).map(([name, value]) => {
        try {
            return { [name]: unsafeNativize(value) };
        }
        catch (_) {
            return undefined; //I guess??
        }
    }));
}
exports.unsafeNativizeVariables = unsafeNativizeVariables;
//HACK! Avoid using!
/**
 * WARNING! Do NOT use this function in real code unless you absolutely have
 * to!  Using it in controlled tests is fine, but do NOT use it in real code if
 * you have any better option!
 *
 * This function is a giant hack.  It will throw exceptions on numbers that
 * don't fit in a Javascript number.  It loses various information.  It was
 * only ever written to support our hacked-together watch expression system,
 * and later repurposed to make testing easier.
 *
 * If you are not doing something as horrible as evaluating user-inputted
 * Javascript expressions meant to operate upon Solidity variables, then you
 * probably have a better option than using this in real code!
 *
 * (For instance, if you just want to nicely print individual values, without
 * attempting to first operate on them via Javascript expressions, we have the
 * [[ResultInspector]] class, which can be used with Node's
 * [util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_object_options)
 * to do exactly that.)
 *
 * Remember, the decoder output format was made to be machine-readable.  It
 * shouldn't be too hard for you to process.  If it comes to it, copy-paste
 * this code and dehackify it for your use case, which hopefully is more
 * manageable than the one that caused us to write this.
 */
function unsafeNativize(result) {
    return unsafeNativizeWithTable(result, []);
}
exports.unsafeNativize = unsafeNativize;
function unsafeNativizeWithTable(result, seenSoFar) {
    if (result.kind === "error") {
        debug("ErrorResult: %O", result);
        switch (result.error.kind) {
            case "BoolOutOfRangeError":
                return true;
            default:
                return undefined;
        }
    }
    //NOTE: for simplicity, only arrays & structs will call unsafeNativizeWithTable;
    //other containers will just call unsafeNativize because they can get away with it
    //(only things that can *be* circular need unsafeNativizeWithTable, not things that
    //can merely *contain* circularities)
    switch (result.type.typeClass) {
        case "uint":
        case "int":
            return (result).value.asBN.toNumber(); //WARNING
        case "bool":
            return result.value.asBoolean;
        case "bytes":
            return result.value.asHex;
        case "address":
            return result.value.asAddress;
        case "string":
            return stringValueInfoToStringLossy(result.value);
        case "fixed":
        case "ufixed":
            //HACK: Big doesn't have a toNumber() method, so we convert to string and then parse with Number
            //NOTE: we don't bother setting the magic variables Big.NE or Big.PE first, as the choice of
            //notation shouldn't affect the result (can you believe I have to write this? @_@)
            return Number((result).value.asBig.toString()); //WARNING
        case "array": {
            let coercedResult = result;
            if (coercedResult.reference === undefined) {
                //we need to do some pointer stuff here, so let's first create our new
                //object we'll be pointing to
                //[we don't want to alter the original accidentally so let's clone a bit]
                let output = [...coercedResult.value];
                //now, we can't use a map here, or we'll screw things up!
                //we want to *mutate* output, not replace it with a new object
                for (let index = 0; index < output.length; index++) {
                    output[index] = unsafeNativizeWithTable(output[index], [
                        output,
                        ...seenSoFar
                    ]);
                }
                return output;
            }
            else {
                return seenSoFar[coercedResult.reference - 1];
            }
        }
        case "userDefinedValueType": {
            return unsafeNativize(result.value);
        }
        case "mapping":
            return Object.assign({}, ...result.value.map(({ key, value }) => ({
                [unsafeNativize(key).toString()]: unsafeNativize(value)
            })));
        case "struct": {
            let coercedResult = result;
            if (coercedResult.reference === undefined) {
                //we need to do some pointer stuff here, so let's first create our new
                //object we'll be pointing to
                let output = Object.assign({}, ...result.value.map(({ name, value }) => ({
                    [name]: value //we *don't* nativize yet!
                })));
                //now, we can't use a map here, or we'll screw things up!
                //we want to *mutate* output, not replace it with a new object
                for (let name in output) {
                    output[name] = unsafeNativizeWithTable(output[name], [
                        output,
                        ...seenSoFar
                    ]);
                }
                return output;
            }
            else {
                return seenSoFar[coercedResult.reference - 1];
            }
        }
        case "type":
            switch (result.type.type.typeClass) {
                case "contract":
                    return Object.assign({}, ...result.value.map(({ name, value }) => ({
                        [name]: unsafeNativize(value)
                    })));
                case "enum":
                    return Object.assign({}, ...result.value.map(enumValue => ({
                        [enumValue.value.name]: unsafeNativize(enumValue)
                    })));
            }
        case "tuple":
            return result.value.map(({ value }) => unsafeNativize(value));
        case "magic":
            return Object.assign({}, ...Object.entries(result.value).map(([key, value]) => ({ [key]: unsafeNativize(value) })));
        case "enum":
            return enumFullName(result);
        case "contract":
            return result.value.address; //we no longer include additional info
        case "function":
            switch (result.type.visibility) {
                case "external": {
                    let coercedResult = result;
                    switch (coercedResult.value.kind) {
                        case "known":
                            return `${coercedResult.value.contract.class.typeName}(${coercedResult.value.contract.address}).${coercedResult.value.abi.name}`;
                        case "invalid":
                            return `${coercedResult.value.contract.class.typeName}(${coercedResult.value.contract.address}).call(${coercedResult.value.selector}...)`;
                        case "unknown":
                            return `${coercedResult.value.contract.address}.call(${coercedResult.value.selector}...)`;
                    }
                }
                case "internal": {
                    let coercedResult = result;
                    switch (coercedResult.value.kind) {
                        case "function":
                            if (coercedResult.value.definedIn) {
                                return `${coercedResult.value.definedIn.typeName}.${coercedResult.value.name}`;
                            }
                            else {
                                return coercedResult.value.name;
                            }
                        case "exception":
                            switch (coercedResult.value.rawInformation.kind) {
                                case "index":
                                    return `<uninitialized>`;
                                case "pcpair":
                                    //in this case, we'll distinguish between "zero" and "uninitialized",
                                    //on the basis that uninitialized internal function pointers in non-storage
                                    //locations are not zero.  in the index case this distinction doesn't come up.
                                    return coercedResult.value.rawInformation
                                        .deployedProgramCounter === 0
                                        ? `<zero>`
                                        : `<uninitialized>`;
                            }
                        case "unknown":
                            return `<could not decode>`;
                    }
                }
            }
    }
}
/**
 * Turns a wrapped access list into a usable form.
 * Will fail if the input is not a wrapped access list!
 * Note that the storage keys must be given as uint256, not bytes32.
 * Primarily meant for internal use.
 */
function nativizeAccessList(wrappedAccessList //this should really be a more specific type
) {
    return wrappedAccessList.value.map(wrappedAccessListForAddress => {
        //HACK: we're just going to coerce all over the place here
        const addressStorageKeysPair = (wrappedAccessListForAddress.value);
        const wrappedAddress = (addressStorageKeysPair[0].value);
        const wrappedStorageKeys = (addressStorageKeysPair[1].value);
        const wrappedStorageKeysArray = (wrappedStorageKeys.value);
        return {
            address: wrappedAddress.value.asAddress,
            storageKeys: wrappedStorageKeysArray.map(wrappedStorageKey => Conversion.toHexString(wrappedStorageKey.value.asBN, EvmUtils.WORD_SIZE))
        };
    });
}
exports.nativizeAccessList = nativizeAccessList;
//turns a StringValueInfo into a string in a lossy fashion,
//by turning malformed utf-8 into replacement characters (U+FFFD)
function stringValueInfoToStringLossy(info) {
    switch (info.kind) {
        case "valid":
            return info.asString;
        case "malformed":
            return Buffer.from(info.asHex.slice(2), // note we need to cut off the 0x prefix
            "hex").toString();
    }
}
exports.stringValueInfoToStringLossy = stringValueInfoToStringLossy;
//# sourceMappingURL=inspect.js.map