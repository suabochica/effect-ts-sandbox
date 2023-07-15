import { pipe } from "@effect/data/Function"
import * as T from "@effect/io/Effect"

/**
 * Effect
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

const succeed41 = T.succeed(41);
const printLn = (message: string) =>
    T.sync(
        () => console.log(message)
    )

const program1 = pipe(
    succeed41,
    T.map((n) => n.toString),
    T.flatMap(printLn)
)

T.runPromise(program1);

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