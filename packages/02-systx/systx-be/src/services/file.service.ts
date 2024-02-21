import { Async as A } from "https://deno.land/x/jazzi@v3.0.7/mod.ts"
import { AsyncUIO } from "https://deno.land/x/jazzi@v3.0.7/Async/types.ts";

import { FileAdapter, FileAdapterLive } from "../adapters/file.adapter.ts";

export interface FileService {
    read(path: string): AsyncUIO<string>
    write(path: string, content: string): AsyncUIO<void>
    exists(path: string): AsyncUIO<boolean>
}

export class FileServiceImpl implements FileService {
    constructor(private adapter: FileAdapter) { }

    exists(path: string): AsyncUIO<boolean> {
        return this.adapter.exists(path);
    }

    read(path: string) {
        return this.adapter.read(path)
            .map(uint => new TextDecoder().decode(uint));
    }

    write(path: string, content: string) {
        return A
            .Success(content)
            .map(str => new TextEncoder().encode(str))
            .chain(data => this.adapter.write(path, data))
    }

}

export const FileServiceLive = new FileServiceImpl(FileAdapterLive)