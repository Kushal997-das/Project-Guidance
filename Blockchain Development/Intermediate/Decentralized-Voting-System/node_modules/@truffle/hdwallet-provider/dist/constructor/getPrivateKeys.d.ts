import type { PrivateKey } from "./types";
import type { SigningAuthority } from "./Constructor";
export declare const getPrivateKeys: (signingAuthority: SigningAuthority) => PrivateKey[] | undefined;
