import { Arbitrary } from '../arbitrary/definition/Arbitrary';
import { IProperty, IPropertyWithHooks, PropertyHookFunction } from './Property.generic';
/**
 * Instantiate a new {@link fast-check#IProperty}
 * @param predicate - Assess the success of the property. Would be considered falsy if it throws or if its output evaluates to false
 * @remarks Since 0.0.1
 * @public
 */
declare function property<Ts extends [unknown, ...unknown[]]>(...args: [...arbitraries: {
    [K in keyof Ts]: Arbitrary<Ts[K]>;
}, predicate: (...args: Ts) => boolean | void]): IPropertyWithHooks<Ts>;
export { property, IProperty, IPropertyWithHooks, PropertyHookFunction };
