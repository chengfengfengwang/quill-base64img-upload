import { default as Quill } from 'quill';

interface Options {
    upload: (blob: Blob) => Promise<string>;
}
export declare function Base64Uploader(quill: Quill, options: Options): void;
export declare const getUploadedContents: (quill: Quill) => import('quill-delta').default;
export {};
