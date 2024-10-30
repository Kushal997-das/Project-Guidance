import * as Format from "../format";
export declare function isMoreSpecificMultiple(types1: Format.Types.OptionallyNamedType[], types2: Format.Types.OptionallyNamedType[], strictBooleans: boolean, userDefinedTypes: Format.Types.TypesById): boolean;
export declare function isMoreSpecific(type1: Format.Types.Type, type2: Format.Types.Type, strictBooleans: boolean, userDefinedTypes: Format.Types.TypesById, ignoreComponentNames?: boolean): boolean;
