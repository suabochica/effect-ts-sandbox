import { pipe } from "@effect/data/Function";
import * as T from "@effect/io/Effect";
import * as O from "@effect/data/Option";

/**
 * Effect
 * =====
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
