"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webUrl = void 0;
const constantFrom_1 = require("./constantFrom");
const constant_1 = require("./constant");
const option_1 = require("./option");
const tuple_1 = require("./tuple");
const webQueryParameters_1 = require("./webQueryParameters");
const webFragments_1 = require("./webFragments");
const webAuthority_1 = require("./webAuthority");
const PartsToUrl_1 = require("./_internals/mappers/PartsToUrl");
const MaxLengthFromMinLength_1 = require("./_internals/helpers/MaxLengthFromMinLength");
const UriPathArbitraryBuilder_1 = require("./_internals/builders/UriPathArbitraryBuilder");
function webUrl(constraints) {
    const c = constraints || {};
    const resolvedSize = (0, MaxLengthFromMinLength_1.resolveSize)(c.size);
    const resolvedAuthoritySettingsSize = c.authoritySettings !== undefined && c.authoritySettings.size !== undefined
        ? (0, MaxLengthFromMinLength_1.relativeSizeToSize)(c.authoritySettings.size, resolvedSize)
        : resolvedSize;
    const resolvedAuthoritySettings = Object.assign(Object.assign({}, c.authoritySettings), { size: resolvedAuthoritySettingsSize });
    const validSchemes = c.validSchemes || ['http', 'https'];
    const schemeArb = (0, constantFrom_1.constantFrom)(...validSchemes);
    const authorityArb = (0, webAuthority_1.webAuthority)(resolvedAuthoritySettings);
    const pathArb = (0, UriPathArbitraryBuilder_1.buildUriPathArbitrary)(resolvedSize);
    return (0, tuple_1.tuple)(schemeArb, authorityArb, pathArb, c.withQueryParameters === true ? (0, option_1.option)((0, webQueryParameters_1.webQueryParameters)({ size: resolvedSize })) : (0, constant_1.constant)(null), c.withFragments === true ? (0, option_1.option)((0, webFragments_1.webFragments)({ size: resolvedSize })) : (0, constant_1.constant)(null)).map(PartsToUrl_1.partsToUrlMapper, PartsToUrl_1.partsToUrlUnmapper);
}
exports.webUrl = webUrl;
