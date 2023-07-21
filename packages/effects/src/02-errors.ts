import { pipe } from "@effect/data/Function";
import * as T from "@effect/io/Effect";

/**
 * Errors
 * ======
 *
 * Effects have three operators for handling expected error:
 *
 * 1. `catchAll`: traps all errors thrown
 * 2. `catchTag`: traps only errors
 * 3. `catchTags`: traps all errors thrown
 */


class ConnectionError {
    readonly _tag = "ConnectionError"
}

class InvariantError {
    readonly _tag = "InvariantError"
}

class OddError {
    readonly _tag = "OddError"
}

class EvenError {
    readonly _tag = "EvenError"
}

const program = pipe (
    T.fail(new ConnectionError()),
    T.zipRight(T.fail(new InvariantError())),
    T.zipRight(T.fail(new OddError())),
    T.zipRight(T.fail(new EvenError())),
)

T.runPromise(program);