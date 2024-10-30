const normalizeValue = (value) => String(value)
    .replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n");
export default normalizeValue;
