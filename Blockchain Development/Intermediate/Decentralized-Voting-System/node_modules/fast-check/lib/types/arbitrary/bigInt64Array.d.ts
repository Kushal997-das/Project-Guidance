import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { BigIntArrayConstraints } from './_internals/builders/TypedIntArrayArbitraryBuilder';
/**
 * For BigInt64Array
 * @remarks Since 3.0.0
 * @public
 */
export declare function bigInt64Array(constraints?: BigIntArrayConstraints): Arbitrary<BigInt64Array>;
export { BigIntArrayConstraints };
