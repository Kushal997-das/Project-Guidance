import { Arbitrary } from '../arbitrary/definition/Arbitrary';
import { IAsyncProperty, IAsyncPropertyWithHooks, AsyncPropertyHookFunction } from './AsyncProperty.generic';
/**
 * Instantiate a new {@link fast-check#IAsyncProperty}
 * @param predicate - Assess the success of the property. Would be considered falsy if it throws or if its output evaluates to false
 * @remarks Since 0.0.7
 * @public
 */
declare function asyncProperty<Ts extends [unknown, ...unknown[]]>(...args: [...arbitraries: {
    [K in keyof Ts]: Arbitrary<Ts[K]>;
}, predicate: (...args: Ts) => Promise<boolean | void>]): IAsyncPropertyWithHooks<Ts>;
export { asyncProperty, IAsyncProperty, IAsyncPropertyWithHooks, AsyncPropertyHookFunction };
