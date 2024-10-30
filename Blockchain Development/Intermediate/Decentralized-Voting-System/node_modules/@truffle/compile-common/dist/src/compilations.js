"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyWorkflowCompileResult = exports.promoteCompileResult = void 0;
function promoteCompileResult(result) {
    const { compilations } = result;
    const contracts = compilations.flatMap(compilation => compilation.contracts);
    return { compilations, contracts };
}
exports.promoteCompileResult = promoteCompileResult;
function emptyWorkflowCompileResult() {
    return { compilations: [], contracts: [] };
}
exports.emptyWorkflowCompileResult = emptyWorkflowCompileResult;
//# sourceMappingURL=compilations.js.map