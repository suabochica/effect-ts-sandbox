import { pipe } from "@effect/data/Function";
import * as T from "@effect/io/Effect";
import * as O from "@effect/data/Option";

/**
 * Effect
 * ======
 *
 * An effect represents a computation.
 *
 * Effect <R, E, A> is read as a computation that:
 *
 * - needs an environment of type R,
 * - may fail with a value of type E,
 * - or succeed with a value of type A.
 *
 * An effect with never as environment does not need anything to run;
 * An effect with never as error will never fail with an expected error;
 * An effect with never as success will never success;
 *
 * Effects aer lazy by nature, They need to be integrated to anything.
 * This is the practical terms jus means calling run on them. Some operators
 * that interpret effects are:
 *
 * - `runPromise`: returns as promise that resolves with the success or rejects with the error.
 * - `runCallback`: runs the effect, calling the provided callback with the success or failure.
 * - `runSync`: tries to run the effect synchronously. If it cannot, it will throw an error.
 * - `runFork`: returns a fiber that represents the execution.
 *
 * There are variants of these operators for returning Either anc Cause instead of raw values.
 */

const succeedWith42 = T.succeed(42)
const failWith42 = T.fail(42)

const fromMaybe42 = T.getOrFail(O.fromNullable(42))
const fromSyncFunction = T.sync(() => 4)
const fromCallback = T.async<never, never, number>((resume) => resume(T.succeed(42)))
const fromComputationThatMayFail = T.tryCatch(
    () => 42,
    error => error as never
)
const fromPromise = T.tryCatchPromise(
    () => Promise.resolve(42),
    error => error as never
)

/**
 * Exercises
 * =========
 *
 * 1. Create a program that prints "hello, world!" using `console.log`
 * 2. Run the program
 * 3. Create another program that print it three times
 * 4. Try to create a version of your program using `zip` or `flatMap`
 */

const print = T.sync(() => {
    console.log("hello, world!")
})

// const printThrice = pipe(
//     print,
//     print,
//     print
// )

T.runSync(print)
// T.runSync(printThrice)