"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMnemonic = void 0;
// extract the mnemonic if that's the style used, or return undefined
const getMnemonic = (signingAuthority) => {
    if ("mnemonic" in signingAuthority) {
        return signingAuthority.mnemonic;
    }
};
exports.getMnemonic = getMnemonic;
//# sourceMappingURL=getMnemonic.js.map