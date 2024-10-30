import type { MnemonicPhrase, PrivateKey, ProviderOrUrl, AddressIndex, NumberOfAddresses, ShareNonce, DerivationPath, ChainId } from "./types";
export declare type Credentials = MnemonicPhrase | PrivateKey | PrivateKey[];
declare type PossibleArguments = [
    Credentials,
    ProviderOrUrl,
    AddressIndex,
    NumberOfAddresses,
    ShareNonce,
    DerivationPath,
    ChainId
];
export declare type Arguments = [PossibleArguments[0], PossibleArguments[1]] | [PossibleArguments[0], PossibleArguments[1], PossibleArguments[2]] | [
    PossibleArguments[0],
    PossibleArguments[1],
    PossibleArguments[2],
    PossibleArguments[3]
] | [
    PossibleArguments[0],
    PossibleArguments[1],
    PossibleArguments[2],
    PossibleArguments[3],
    PossibleArguments[4]
] | [
    PossibleArguments[0],
    PossibleArguments[1],
    PossibleArguments[2],
    PossibleArguments[3],
    PossibleArguments[4],
    PossibleArguments[5]
] | [
    PossibleArguments[0],
    PossibleArguments[1],
    PossibleArguments[2],
    PossibleArguments[3],
    PossibleArguments[4],
    PossibleArguments[5],
    PossibleArguments[6]
];
export {};
