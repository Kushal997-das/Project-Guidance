import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { SizeForArbitrary } from './_internals/helpers/MaxLengthFromMinLength';
/**
 * Constraints to be applied on {@link dictionary}
 * @remarks Since 2.22.0
 * @public
 */
export interface DictionaryConstraints {
    /**
     * Lower bound for the number of keys defined into the generated instance
     * @remarks Since 2.22.0
     */
    minKeys?: number;
    /**
     * Lower bound for the number of keys defined into the generated instance
     * @remarks Since 2.22.0
     */
    maxKeys?: number;
    /**
     * Define how large the generated values should be (at max)   *
     * @remarks Since 2.22.0
     */
    size?: SizeForArbitrary;
}
/**
 * For dictionaries with keys produced by `keyArb` and values from `valueArb`
 *
 * @param keyArb - Arbitrary used to generate the keys of the object
 * @param valueArb - Arbitrary used to generate the values of the object
 *
 * @remarks Since 1.0.0
 * @public
 */
export declare function dictionary<T>(keyArb: Arbitrary<string>, valueArb: Arbitrary<T>, constraints?: DictionaryConstraints): Arbitrary<Record<string, T>>;
