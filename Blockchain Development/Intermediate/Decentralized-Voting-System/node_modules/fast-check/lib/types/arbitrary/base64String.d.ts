import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { StringSharedConstraints } from './_shared/StringSharedConstraints';
export { StringSharedConstraints } from './_shared/StringSharedConstraints';
/**
 * For base64 strings
 *
 * A base64 string will always have a length multiple of 4 (padded with =)
 *
 * @param constraints - Constraints to apply when building instances (since 2.4.0)
 *
 * @remarks Since 0.0.1
 * @public
 */
declare function base64String(constraints?: StringSharedConstraints): Arbitrary<string>;
export { base64String };
