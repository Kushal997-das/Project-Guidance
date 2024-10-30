import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { StringSharedConstraints } from './_shared/StringSharedConstraints';
export { StringSharedConstraints } from './_shared/StringSharedConstraints';
/**
 * For strings using the characters produced by `charArb`
 *
 * @param charArb - Arbitrary able to generate random strings (possibly multiple characters)
 * @param constraints - Constraints to apply when building instances (since 2.4.0)
 *
 * @remarks Since 1.1.3
 * @public
 */
export declare function stringOf(charArb: Arbitrary<string>, constraints?: StringSharedConstraints): Arbitrary<string>;
