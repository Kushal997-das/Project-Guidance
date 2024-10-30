/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import type { Collections } from "../../collections";
import type { GetDefaultSettings } from "./types";
import * as Base from "./base";
export interface DatabasesSettings {
}
export declare const getDefaultSettings: GetDefaultSettings;
export declare class Databases<C extends Collections> extends Base.Databases<C> {
    static counter: number;
    setup(settings: DatabasesSettings): void;
    createDatabase(collectionName: any): PouchDB.Database<{}>;
}
