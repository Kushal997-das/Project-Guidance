import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { StringSharedConstraints } from './_shared/StringSharedConstraints';
export { StringSharedConstraints } from './_shared/StringSharedConstraints';
/**
 * For strings of {@link hexa}
 *
 * @param constraints - Constraints to apply when building instances (since 2.4.0)
 *
 * @remarks Since 0.0.1
 * @public
 */
declare function hexaString(constraints?: StringSharedConstraints): Arbitrary<string>;
export { hexaString };
