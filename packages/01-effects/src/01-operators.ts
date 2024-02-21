import { pipe } from "@effect/data/Function"
import * as T from "@effect/io/Effect"

/**
 * Operators
 * =====
 *
 * Effect are monadic structures
 * As such they have both, `map` and `flatMap`
 * `map` allows to work w/ the internal value w/o affect the external type.
 * `flatMap` allows to work w/ the internal value and break the structure.
 * The next feature is enable the sequence.
 * The result of A is lost. If A fails, we cannot generate B.
 * `zip` The effect that are in the sequence are not dependent.
 */

const succeed41 = T.succeed(41 as const);
const printLn = (message: string) =>
    T.sync(
        () => console.log(message)
    )

const program1 = pipe(
    succeed41,
    T.map((n) => n.toString)
)

T.runSync(program1)

/**
 * Exercises
 * ---------
 *
 * Another common operation is `tap`. `tap` peeks an effect
 * without altering it. If the peek succeeds, the outer effect follows
 * as usual. If the peek fails, so does the outer effect.
 *
 * 1. Fit the previous exercise to use the `tap` operator, print the value if it is even,
 * otherwise, fail with OddError
 * 2. `zip` are another sequence operator; Like `flatMap` it sequence two effects,
 * but, one effect is not dependent of the result value of the other effect. Create
 * a program that sum the result value of two effect that generate random numbers.
 */

const isEven = (n: number) => n % 2 === 0
const randomInt = T.sync(() => Math.floor(Math.random() * 100))


class OddError {
    readonly _tag = "OddError";

    constructor(public which: number) { }
}

const program2 = pipe(
    randomInt,
    T.tap((n: number) => n % 2 === 0 ? T.unit() : T.fail(new OddError(n))),
    T.map(x => `${x}`),
    T.flatMap(printLn)
)

T.runPromise(program2);

const exercise2 = pipe(
    randomInt,
    T.zip(randomInt),
    T.map(([a, b]) => a + b)
)

/**
 * Do-notation
 * -----------
 * Similar to haskell do notation, Effect Provides a mechanism that emulates it.
 * It is based around one constructor and 6 operators;
 *
 * - `Do`, same as succeed({})
 * - `bind`: sets the result of an effect to a key.
 * - `bindTo`: same as map(x => { [key]: x })
 * - `bindDiscard`: same as `bind` but receive the plain value instead of a fn.
 * - `let`: works like `map` but stores the result in the provided key.
 * - `letDiscard`: same as `let` but receive the plain value instead of a fn.
 */

const do42 = pipe(
    T.Do(),
    T.bindDiscard("w", T.succeed(2)),
    T.bind("x", ({ w }) => T.succeed(w + 18)),
    T.let("y", ({ w }) => w + 8),
    T.letDiscard("z", 10),
    T.map(({ w, x, y, z}) => w + x + y + z),
    T.map(x => `${x}`),
    T.flatMap(printLn)
)