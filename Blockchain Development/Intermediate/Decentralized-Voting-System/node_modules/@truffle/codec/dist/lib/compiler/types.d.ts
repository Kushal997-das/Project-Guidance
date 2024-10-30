export interface CompilerVersion {
    name?: string;
    version?: string;
}
export type SolidityFamily = "unknown" | "pre-0.5.0" | "0.5.x" | "0.8.x" | "0.8.7+" | "0.8.9+" | "0.8.18+";
export interface Settings {
    viaIR?: boolean;
}
