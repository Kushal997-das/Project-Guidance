/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import type { CollectionName, Collections } from "../../collections";
import type { Record, SavedRecord, RecordReference, Adapter, Definitions } from "../types";
export interface DatabasesOptions<C extends Collections> {
    definitions: Definitions<C>;
    settings: any;
}
/**
 * Aggegrates logic for interacting wth a set of PouchDB databases identified
 * by resource collection name.
 */
export declare abstract class Databases<C extends Collections> implements Adapter<C> {
    private collections;
    private definitions;
    private generateId;
    private ready;
    constructor(options: DatabasesOptions<C>);
    protected setup(_: any): void;
    protected abstract createDatabase(resource: CollectionName<C>): PouchDB.Database;
    private initialize;
    private initializeCollection;
    every<N extends CollectionName<C>, T>(collectionName: N): Promise<SavedRecord<T>[]>;
    retrieve<N extends CollectionName<C>, T>(collectionName: N, records: (Pick<Record<T>, "_id"> | undefined)[]): Promise<(SavedRecord<T> | undefined)[]>;
    search<N extends CollectionName<C>, T>(collectionName: N, options: PouchDB.Find.FindRequest<{}>): Promise<SavedRecord<T>[]>;
    save<N extends CollectionName<C>, T>(collectionName: N, records: (Record<T> | undefined)[], options?: {
        overwrite?: boolean;
    }): Promise<(SavedRecord<T> | undefined)[]>;
    delete<N extends CollectionName<C>, T>(collectionName: N, references: (RecordReference<T> | undefined)[]): Promise<void>;
}
