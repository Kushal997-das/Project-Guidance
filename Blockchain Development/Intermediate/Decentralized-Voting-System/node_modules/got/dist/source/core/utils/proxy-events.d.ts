/// <reference types="node" />
import { EventEmitter } from 'node:events';
export default function proxyEvents(from: EventEmitter, to: EventEmitter, events: Readonly<string[]>): () => void;
