/// <reference types="node" />
import { URL, UrlWithStringQuery } from 'node:url';
export interface LegacyUrlOptions {
    protocol: string;
    hostname: string;
    host: string;
    hash: string | null;
    search: string | null;
    pathname: string;
    href: string;
    path: string;
    port?: number;
    auth?: string;
}
export default function urlToOptions(url: URL | UrlWithStringQuery): LegacyUrlOptions;
