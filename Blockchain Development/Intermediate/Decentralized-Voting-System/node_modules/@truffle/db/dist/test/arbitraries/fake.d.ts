import * as fc from "fast-check";
import { camelCase } from "change-case";
export declare const fake: (template: string, transform?: typeof camelCase) => fc.Arbitrary<string>;
