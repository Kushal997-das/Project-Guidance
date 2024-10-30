/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import type { Collections } from "../../collections";
import type { GetDefaultSettings } from "./types";
import * as Base from "./base";
export interface DatabasesSettings {
    url: string;
    auth?: {
        username: string;
        password: string;
    };
}
export declare const getDefaultSettings: GetDefaultSettings;
export declare class Databases<C extends Collections> extends Base.Databases<C> {
    private _createDatabase;
    setup(settings: DatabasesSettings): void;
    createDatabase(resource: any): PouchDB.Database<{}>;
}
