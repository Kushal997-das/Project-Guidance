/// <reference types="node" />
import { URL } from 'node:url';
export interface URLOptions {
    href?: string;
    protocol?: string;
    host?: string;
    hostname?: string;
    port?: string | number;
    pathname?: string;
    search?: string;
    searchParams?: unknown;
    path?: string;
}
export default function optionsToUrl(origin: string, options: URLOptions): URL;
