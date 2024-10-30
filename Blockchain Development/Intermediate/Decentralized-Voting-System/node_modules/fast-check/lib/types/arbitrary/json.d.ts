import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { JsonSharedConstraints } from './_internals/helpers/JsonConstraintsBuilder';
export { JsonSharedConstraints };
/**
 * For any JSON strings
 *
 * Keys and string values rely on {@link string}
 *
 * @param constraints - Constraints to be applied onto the generated instance (since 2.5.0)
 *
 * @remarks Since 0.0.7
 * @public
 */
export declare function json(constraints?: JsonSharedConstraints): Arbitrary<string>;
