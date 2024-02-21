import { AsyncIO, AsyncUIO } from "https://deno.land/x/jazzi@v3.0.7/Async/types.ts"
import { Async } from "https://deno.land/x/jazzi@v3.0.7/mod.ts"

import { FileService, FileServiceLive } from "./file.service.ts"
import { EnvService, EnvServiceLive } from "./env.service.ts"
import { User } from "../model/user.ts"
import { Transaction } from "../model/transaction.ts"

export interface Database {
    users: Record<string, User>,
    transactions: Record<string, Transaction>
}

export interface DatabaseService {
    read(): AsyncUIO<Database>,
    write(data: Database): AsyncUIO<void>,
    update<E>(fn: (data: Database) => AsyncIO<E, Database>): AsyncIO<E, void>
}

export class DatabaseServiceImpl implements DatabaseService {

    constructor(
        private file: FileService,
        private env: EnvService
    ) { }

    private DatabasePath() {
        return this.env.get("Database_FILE", "./database.json").unwrap();
    }

    private connect() {
        const DatabasePath = this.DatabasePath();
        return this.file
            .exists(DatabasePath)
            .chain(exists => {
                if (exists) {
                    return Async.Success(void 0)
                } else {
                    return this.file.write(
                        DatabasePath,
                        JSON.stringify({ users: {}, transactions: {} }, null, 3)
                    )
                }
            })
            .zipRight(this.file.read(DatabasePath))
            .map(data => JSON.parse(data) as Database)
    }

    read(): AsyncUIO<Database> {
        return this.connect()
    }

    write(data: Database): AsyncUIO<void> {
        return this.file.write(this.DatabasePath(), JSON.stringify(data, null, 3));
    }

    update<E>(fn: (data: Database) => AsyncIO<E, Database>): AsyncIO<E, void> {
        return this.connect()
            .chain(fn)
            .chain(Database => this.write(Database))
    }
}

export const DatabaseServiceLive: DatabaseService = new DatabaseServiceImpl(
    FileServiceLive,
    EnvServiceLive
)
