import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { FloatConstraints } from './float';
import { SizeForArbitrary } from './_internals/helpers/MaxLengthFromMinLength';
/**
 * Constraints to be applied on {@link float32Array}
 * @remarks Since 2.9.0
 * @public
 */
export declare type Float32ArrayConstraints = {
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
} & FloatConstraints;
/**
 * For Float32Array
 * @remarks Since 2.9.0
 * @public
 */
export declare function float32Array(constraints?: Float32ArrayConstraints): Arbitrary<Float32Array>;
