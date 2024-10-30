import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { StringSharedConstraints } from './_shared/StringSharedConstraints';
export { StringSharedConstraints } from './_shared/StringSharedConstraints';
/**
 * For strings of {@link fullUnicode}
 *
 * @param constraints - Constraints to apply when building instances (since 2.4.0)
 *
 * @remarks Since 0.0.11
 * @public
 */
export declare function fullUnicodeString(constraints?: StringSharedConstraints): Arbitrary<string>;
