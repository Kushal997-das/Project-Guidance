"use strict";
class TruffleError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.stack = "";
    }
}
module.exports = TruffleError;
//# sourceMappingURL=index.js.map