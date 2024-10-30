"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInDocNodes = void 0;
var nodes = __importStar(require(".."));
var BuiltInDocNodes = /** @class */ (function () {
    function BuiltInDocNodes() {
    }
    BuiltInDocNodes.register = function (configuration) {
        var docNodeManager = configuration.docNodeManager;
        docNodeManager.registerDocNodes('@microsoft/tsdoc', [
            { docNodeKind: "Block" /* Block */, constructor: nodes.DocBlock },
            { docNodeKind: "BlockTag" /* BlockTag */, constructor: nodes.DocBlockTag },
            { docNodeKind: "CodeSpan" /* CodeSpan */, constructor: nodes.DocCodeSpan },
            { docNodeKind: "Comment" /* Comment */, constructor: nodes.DocComment },
            { docNodeKind: "DeclarationReference" /* DeclarationReference */, constructor: nodes.DocDeclarationReference },
            { docNodeKind: "ErrorText" /* ErrorText */, constructor: nodes.DocErrorText },
            { docNodeKind: "EscapedText" /* EscapedText */, constructor: nodes.DocEscapedText },
            { docNodeKind: "Excerpt" /* Excerpt */, constructor: nodes.DocExcerpt },
            { docNodeKind: "FencedCode" /* FencedCode */, constructor: nodes.DocFencedCode },
            { docNodeKind: "HtmlAttribute" /* HtmlAttribute */, constructor: nodes.DocHtmlAttribute },
            { docNodeKind: "HtmlEndTag" /* HtmlEndTag */, constructor: nodes.DocHtmlEndTag },
            { docNodeKind: "HtmlStartTag" /* HtmlStartTag */, constructor: nodes.DocHtmlStartTag },
            { docNodeKind: "InheritDocTag" /* InheritDocTag */, constructor: nodes.DocInheritDocTag },
            { docNodeKind: "InlineTag" /* InlineTag */, constructor: nodes.DocInlineTag },
            { docNodeKind: "LinkTag" /* LinkTag */, constructor: nodes.DocLinkTag },
            { docNodeKind: "MemberIdentifier" /* MemberIdentifier */, constructor: nodes.DocMemberIdentifier },
            { docNodeKind: "MemberReference" /* MemberReference */, constructor: nodes.DocMemberReference },
            { docNodeKind: "MemberSelector" /* MemberSelector */, constructor: nodes.DocMemberSelector },
            { docNodeKind: "MemberSymbol" /* MemberSymbol */, constructor: nodes.DocMemberSymbol },
            { docNodeKind: "Paragraph" /* Paragraph */, constructor: nodes.DocParagraph },
            { docNodeKind: "ParamBlock" /* ParamBlock */, constructor: nodes.DocParamBlock },
            { docNodeKind: "ParamCollection" /* ParamCollection */, constructor: nodes.DocParamCollection },
            { docNodeKind: "PlainText" /* PlainText */, constructor: nodes.DocPlainText },
            { docNodeKind: "Section" /* Section */, constructor: nodes.DocSection },
            { docNodeKind: "SoftBreak" /* SoftBreak */, constructor: nodes.DocSoftBreak }
        ]);
        docNodeManager.registerAllowableChildren("Section" /* Section */, [
            "FencedCode" /* FencedCode */,
            "Paragraph" /* Paragraph */,
            "HtmlStartTag" /* HtmlStartTag */,
            "HtmlEndTag" /* HtmlEndTag */
        ]);
        docNodeManager.registerAllowableChildren("Paragraph" /* Paragraph */, [
            "BlockTag" /* BlockTag */,
            "CodeSpan" /* CodeSpan */,
            "ErrorText" /* ErrorText */,
            "EscapedText" /* EscapedText */,
            "HtmlStartTag" /* HtmlStartTag */,
            "HtmlEndTag" /* HtmlEndTag */,
            "InlineTag" /* InlineTag */,
            "LinkTag" /* LinkTag */,
            "PlainText" /* PlainText */,
            "SoftBreak" /* SoftBreak */
        ]);
    };
    return BuiltInDocNodes;
}());
exports.BuiltInDocNodes = BuiltInDocNodes;
//# sourceMappingURL=BuiltInDocNodes.js.map