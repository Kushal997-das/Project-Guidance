"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webFragments = void 0;
const UriQueryOrFragmentArbitraryBuilder_1 = require("./_internals/builders/UriQueryOrFragmentArbitraryBuilder");
function webFragments(constraints = {}) {
    return (0, UriQueryOrFragmentArbitraryBuilder_1.buildUriQueryOrFragmentArbitrary)(constraints.size);
}
exports.webFragments = webFragments;
