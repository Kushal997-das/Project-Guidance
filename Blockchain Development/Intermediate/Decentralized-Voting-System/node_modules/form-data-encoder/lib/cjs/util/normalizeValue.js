"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeValue = (value) => String(value)
    .replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n");
exports.default = normalizeValue;
