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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.resolveAndWrap = exports.wrapForMethod = exports.wrapMultiple = exports.Messages = exports.wrap = exports.BadResponseTypeError = exports.TypeMismatchError = exports.NoUniqueBestOverloadError = exports.NoOverloadsMatchedError = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap");
const priority_1 = require("./priority");
const errors_1 = require("./errors");
Object.defineProperty(exports, "NoOverloadsMatchedError", { enumerable: true, get: function () { return errors_1.NoOverloadsMatchedError; } });
Object.defineProperty(exports, "NoUniqueBestOverloadError", { enumerable: true, get: function () { return errors_1.NoUniqueBestOverloadError; } });
Object.defineProperty(exports, "TypeMismatchError", { enumerable: true, get: function () { return errors_1.TypeMismatchError; } });
Object.defineProperty(exports, "BadResponseTypeError", { enumerable: true, get: function () { return errors_1.BadResponseTypeError; } });
__exportStar(require("./errors"), exports);
const wrap_1 = require("./wrap");
Object.defineProperty(exports, "wrap", { enumerable: true, get: function () { return wrap_1.wrap; } });
__exportStar(require("./types"), exports);
exports.Messages = __importStar(require("./messages"));
function* wrapMultiple(types, inputs, wrapOptions) {
    //just wrap the types in a tuple and defer to wrap()
    const combinedType = {
        typeClass: "tuple",
        memberTypes: types
    };
    debug("wrapping multiple");
    const wrappedTogether = (yield* (0, wrap_1.wrap)(combinedType, inputs, wrapOptions));
    return wrappedTogether.value.map(({ value }) => value);
}
exports.wrapMultiple = wrapMultiple;
//note: turns on loose
function* wrapForMethod(method, inputs, resolveOptions) {
    const wrapped = yield* wrapForMethodRaw(method, inputs, resolveOptions, true);
    return wrappingToResolution(method, wrapped);
}
exports.wrapForMethod = wrapForMethod;
function wrappingToResolution(method, wrapped) {
    if (wrapped.length > 0 &&
        wrapped[wrapped.length - 1].type.typeClass === "options") {
        //there's options
        const wrappedArguments = wrapped.slice(0, -1); //cut off options
        const options = wrapped[wrapped.length - 1]
            .value;
        return {
            method,
            arguments: wrappedArguments,
            options
        };
    }
    else {
        //no options
        return {
            method,
            arguments: wrapped,
            options: {}
        };
    }
}
//doesn't separate out options from arguments & doesn't turn on loose
function* wrapForMethodRaw(method, inputs, { userDefinedTypes, allowOptions, allowJson, strictBooleans }, loose = false) {
    debug("wrapping for method");
    if (method.inputs.length === inputs.length) {
        //no options case
        debug("no options");
        return yield* wrapMultiple(method.inputs, inputs, {
            userDefinedTypes,
            oldOptionsBehavior: true,
            loose,
            name: "<arguments>",
            allowJson,
            strictBooleans
        });
    }
    else if (allowOptions && method.inputs.length === inputs.length - 1) {
        //options case
        debug("options");
        const inputsWithOptions = [
            ...method.inputs,
            { name: "<options>", type: { typeClass: "options" } }
        ];
        return yield* wrapMultiple(inputsWithOptions, inputs, {
            userDefinedTypes,
            oldOptionsBehavior: true,
            loose,
            name: "<arguments>",
            allowJson,
            strictBooleans
        });
    }
    else {
        //invalid length case
        const orOneMore = allowOptions
            ? ` (or ${method.inputs.length + 1} counting transaction options)`
            : "";
        throw new errors_1.TypeMismatchError({ typeClass: "tuple", memberTypes: method.inputs }, inputs, "<arguments>", 5, `Incorrect number of arguments (expected ${method.inputs.length}${orOneMore}, got ${inputs.length})`);
    }
}
function* resolveAndWrap(methods, inputs, { userDefinedTypes, allowOptions, allowJson, strictBooleans }) {
    //despite us having a good system for overload resolution, we want to
    //use it as little as possible!  That's because using it means we don't
    //get great error messages.  As such, we're going to do a bunch to filter
    //things beforehand, so that we get good error messages.
    if (methods.length === 1) {
        //if there's only one possibility, we just defer to wrapForMethod
        //if we ignore error messages this is silly... but we're not!
        //this is important for good error messages in this case
        return yield* wrapForMethod(methods[0], inputs, {
            userDefinedTypes,
            allowOptions,
            allowJson,
            strictBooleans
        });
    }
    //OK, so, there are multiple possibilities then.  let's try to filter things down by length.
    const possibleMatches = methods.filter(method => method.inputs.length === inputs.length);
    //but, we've also got to account for the possibility of options
    let possibleMatchesWithOptions = [];
    let possibleOptions = {};
    if (allowOptions && inputs.length > 0) {
        //if options are allowed, we'll have to account for that.
        //*however*, in order to minimize the number of possibilities, we won't
        //use these unless the last argument of inputs actually looks like an options!
        const lastInput = inputs[inputs.length - 1];
        let isOptionsPossible = true;
        try {
            const wrappedOptions = (yield* (0, wrap_1.wrap)({ typeClass: "options" }, lastInput, {
                name: "<options>",
                loose: true,
                oldOptionsBehavior: true,
                userDefinedTypes,
                allowJson,
                strictBooleans
            }));
            possibleOptions = wrappedOptions.value;
        }
        catch (error) {
            if (error instanceof errors_1.TypeMismatchError) {
                isOptionsPossible = false;
            }
            else {
                throw error; //rethrow unexpected errors
            }
        }
        if (isOptionsPossible) {
            possibleMatchesWithOptions = methods.filter(method => method.inputs.length === inputs.length - 1);
        }
    }
    debug("possibleMatches: %o", possibleMatches);
    debug("possibleMatchesWithOptions: %o", possibleMatchesWithOptions);
    //if there's now only one possibility, great!
    if (possibleMatches.length === 1 && possibleMatchesWithOptions.length === 0) {
        //only one possibility, no options. we can just defer to wrapMultiple.
        //(again, point is to have good error messaging)
        debug("only one possibility, no options");
        const method = possibleMatches[0];
        return {
            method,
            arguments: yield* wrapMultiple(method.inputs, inputs, {
                userDefinedTypes,
                loose: true,
                name: "<arguments>",
                allowJson,
                strictBooleans
            }),
            options: {}
        };
    }
    else if (possibleMatchesWithOptions.length === 1 &&
        possibleMatches.length === 0) {
        //only one possibility, with options.  moreover, we already determined the options
        //above, so we can once again just defer to wrapMultiple
        debug("only one possiblity, with options");
        const method = possibleMatchesWithOptions[0];
        return {
            method,
            arguments: yield* wrapMultiple(method.inputs, inputs, {
                userDefinedTypes,
                loose: true,
                name: "<arguments>",
                allowJson,
                strictBooleans
            }),
            options: possibleOptions
        };
    }
    else if (possibleMatches.length === 0 &&
        possibleMatchesWithOptions.length === 0) {
        debug("no possibilities");
        //nothing matches!
        throw new errors_1.NoOverloadsMatchedError(methods, inputs, userDefinedTypes);
    }
    //if all of our attempts to avoid it have failed, we'll have to actually use
    //our overload resolution system. note how we do *not* turn on loose in this
    //case!
    debug("attempting overload resolution");
    let resolutions = [];
    for (const method of methods) {
        let wrapped;
        try {
            //note this part takes care of options for us...
            //although yes this means options will be re-wrapped, oh well
            wrapped = yield* wrapForMethodRaw(method, inputs, {
                userDefinedTypes,
                allowOptions,
                allowJson,
                strictBooleans
            });
        }
        catch (error) {
            //if there's an error, don't add it
            debug("failed: %O", method);
            debug("because: %O", error);
            continue;
        }
        //note that options and arguments here are both not correct, but we'll
        //fix them up later!
        debug("adding: %O", method);
        resolutions.push({ method, arguments: wrapped, options: {} });
    }
    //now: narrow it down to the most specific one(s)
    debug("resolutions: %O", resolutions);
    resolutions = resolutions.filter(resolution => resolutions.every(comparisonResolution => !(0, priority_1.isMoreSpecificMultiple)(comparisonResolution.arguments, resolution.arguments, strictBooleans, userDefinedTypes) ||
        //because the comparison is nonstrict, this comparison is added to
        //effectively make it strict
        // i.e. we have !(x<=y) but we want !(x<y), i.e.,
        // !(x<=y) | x=y, i.e., !(x<=y) | (x<=y & y<=x),
        // i.e., !(x<=y) | y<=x
        (0, priority_1.isMoreSpecificMultiple)(resolution.arguments, comparisonResolution.arguments, strictBooleans, userDefinedTypes)));
    debug("resolutions remaining: %O", resolutions);
    switch (resolutions.length) {
        case 0:
            //no resolution worked
            throw new errors_1.NoOverloadsMatchedError(methods, inputs, userDefinedTypes);
        case 1:
            //there was a most specific resolution; fix up options and arguments
            //before returning
            const { method, arguments: wrapped } = resolutions[0];
            return wrappingToResolution(method, wrapped);
        default:
            //no unique most-specific resolution
            throw new errors_1.NoUniqueBestOverloadError(resolutions);
    }
}
exports.resolveAndWrap = resolveAndWrap;
//# sourceMappingURL=index.js.map