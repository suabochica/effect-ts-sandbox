import { Effect } from "effect"
import * as Counter from "./Counter"

const program = Effect.gen(function* () {
  const counter = yield* Counter.make

  const logCounter = <R, E, A> (
    label: string,
    effect: Effect.Effect<A, E, R>
  ) =>
    Effect.gen(function* () {
      const value = yield* counter.get

      yield* Effect.log(`${label} get: ${value}`)

      return yield* effect
    })

  yield* logCounter("task 1", counter.inc).pipe(
    Effect.zip(logCounter("task 2", counter.inc), { concurrent: true}),
    Effect.zip(logCounter("task 3", counter.dec), { concurrent: true}),
    Effect.zip(logCounter("task 4", counter.inc), { concurrent: true}),
  )

  const value = yield* counter.get

  yield* Effect.log(`This counter has a value of ${value}`)
})

Effect.runPromise(program)