import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
/**
 * Constraints to be applied on {@link bigUint}
 * @remarks Since 2.6.0
 * @public
 */
export interface BigUintConstraints {
    /**
     * Upper bound for the generated bigints (eg.: 2147483647n, BigInt(Number.MAX_SAFE_INTEGER))
     * @remarks Since 2.6.0
     */
    max?: bigint;
}
/**
 * For positive bigint
 * @remarks Since 1.9.0
 * @public
 */
declare function bigUint(): Arbitrary<bigint>;
/**
 * For positive bigint between 0 (included) and max (included)
 *
 * @param max - Upper bound for the generated bigint
 *
 * @remarks Since 1.9.0
 * @public
 */
declare function bigUint(max: bigint): Arbitrary<bigint>;
/**
 * For positive bigint between 0 (included) and max (included)
 *
 * @param constraints - Constraints to apply when building instances
 *
 * @remarks Since 2.6.0
 * @public
 */
declare function bigUint(constraints: BigUintConstraints): Arbitrary<bigint>;
export { bigUint };
