import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { DoubleConstraints } from './double';
import { SizeForArbitrary } from './_internals/helpers/MaxLengthFromMinLength';
/**
 * Constraints to be applied on {@link float64Array}
 * @remarks Since 2.9.0
 * @public
 */
export declare type Float64ArrayConstraints = {
    /**
     * Lower bound of the generated array size
     * @remarks Since 2.9.0
     */
    minLength?: number;
    /**
     * Upper bound of the generated array size
     * @remarks Since 2.9.0
     */
    maxLength?: number;
    /**
     * Define how large the generated values should be (at max)
     * @remarks Since 2.22.0
     */
    size?: SizeForArbitrary;
} & DoubleConstraints;
/**
 * For Float64Array
 * @remarks Since 2.9.0
 * @public
 */
export declare function float64Array(constraints?: Float64ArrayConstraints): Arbitrary<Float64Array>;
