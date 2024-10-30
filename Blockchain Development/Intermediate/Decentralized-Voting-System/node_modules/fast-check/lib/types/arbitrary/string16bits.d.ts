import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { StringSharedConstraints } from './_shared/StringSharedConstraints';
export { StringSharedConstraints } from './_shared/StringSharedConstraints';
/**
 * For strings of {@link char16bits}
 *
 * @param constraints - Constraints to apply when building instances (since 2.4.0)
 *
 * @remarks Since 0.0.11
 * @public
 */
export declare function string16bits(constraints?: StringSharedConstraints): Arbitrary<string>;
