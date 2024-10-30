"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTruffleDb = void 0;
const getTruffleDb = () => {
    try {
        return require("@truffle/db");
    }
    catch (_a) {
        return null;
    }
};
exports.getTruffleDb = getTruffleDb;
//# sourceMappingURL=index.js.map