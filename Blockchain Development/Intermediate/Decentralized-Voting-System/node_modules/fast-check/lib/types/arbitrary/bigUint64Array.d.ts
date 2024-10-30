import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { BigIntArrayConstraints } from './_internals/builders/TypedIntArrayArbitraryBuilder';
/**
 * For BigUint64Array
 * @remarks Since 3.0.0
 * @public
 */
export declare function bigUint64Array(constraints?: BigIntArrayConstraints): Arbitrary<BigUint64Array>;
export { BigIntArrayConstraints };
