/// <reference types="node" />
import { Readable } from 'node:stream';
interface FormData extends Readable {
    getBoundary: () => string;
    getLength: (callback: (error: Error | null, length: number) => void) => void;
}
export default function isFormData(body: unknown): body is FormData;
export {};
