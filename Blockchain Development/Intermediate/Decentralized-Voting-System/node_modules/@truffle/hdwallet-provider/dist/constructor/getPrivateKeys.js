"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateKeys = void 0;
// extract the private keys if that's the style used, or return undefined
const getPrivateKeys = (signingAuthority) => {
    if ("privateKeys" in signingAuthority) {
        return signingAuthority.privateKeys;
    }
    else {
        return undefined;
    }
};
exports.getPrivateKeys = getPrivateKeys;
//# sourceMappingURL=getPrivateKeys.js.map