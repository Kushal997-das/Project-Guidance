import { buildAlphaNumericPercentArbitrary } from './_internals/builders/CharacterRangeArbitraryBuilder.js';
import { constant } from './constant.js';
import { domain } from './domain.js';
import { ipV4 } from './ipV4.js';
import { ipV4Extended } from './ipV4Extended.js';
import { ipV6 } from './ipV6.js';
import { nat } from './nat.js';
import { oneof } from './oneof.js';
import { option } from './option.js';
import { stringOf } from './stringOf.js';
import { tuple } from './tuple.js';
function hostUserInfo(size) {
    const others = ['-', '.', '_', '~', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '=', ':'];
    return stringOf(buildAlphaNumericPercentArbitrary(others), { size });
}
function userHostPortMapper([u, h, p]) {
    return (u === null ? '' : `${u}@`) + h + (p === null ? '' : `:${p}`);
}
function userHostPortUnmapper(value) {
    if (typeof value !== 'string') {
        throw new Error('Unsupported');
    }
    const atPosition = value.indexOf('@');
    const user = atPosition !== -1 ? value.substring(0, atPosition) : null;
    const portRegex = /:(\d+)$/;
    const m = portRegex.exec(value);
    const port = m !== null ? Number(m[1]) : null;
    const host = m !== null ? value.substring(atPosition + 1, value.length - m[1].length - 1) : value.substring(atPosition + 1);
    return [user, host, port];
}
function bracketedMapper(s) {
    return `[${s}]`;
}
function bracketedUnmapper(value) {
    if (typeof value !== 'string' || value[0] !== '[' || value[value.length - 1] !== ']') {
        throw new Error('Unsupported');
    }
    return value.substring(1, value.length - 1);
}
export function webAuthority(constraints) {
    const c = constraints || {};
    const size = c.size;
    const hostnameArbs = [domain({ size })]
        .concat(c.withIPv4 === true ? [ipV4()] : [])
        .concat(c.withIPv6 === true ? [ipV6().map(bracketedMapper, bracketedUnmapper)] : [])
        .concat(c.withIPv4Extended === true ? [ipV4Extended()] : []);
    return tuple(c.withUserInfo === true ? option(hostUserInfo(size)) : constant(null), oneof(...hostnameArbs), c.withPort === true ? option(nat(65535)) : constant(null)).map(userHostPortMapper, userHostPortUnmapper);
}
