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

const program = pipe(
    T.fail(new ConnectionError()),
    T.zipRight(T.fail(new InvariantError())),
    T.zipRight(T.fail(new OddError())),
    T.zipRight(T.fail(new EvenError())),
)

T.runPromise(program);

/**
 * Exercises
 * --------
 */

// 1. Use `catchTag` to  handle ConnectionError

const network = pipe(
    program,
    T.catchTag("ConnectionError", (error) => T.succeed(42 as const))
)

// 2. Use `catchTags` to  handle OddError and EvenError

const num = pipe(
    network,
    T.catchTags({
        OddError: (error) => T.succeed(43 as const),
        EvenError: (error) => T.succeed(44 as const),
    })
)

// 3. Use `catchAll` to handle remaining errors
const remain = pipe(
    num,
    T.catchAll((error) => T.succeed(55 as const))
)
