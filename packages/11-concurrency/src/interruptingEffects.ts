import { Effect } from "effect"

const program = Effect.forEach(
  [1, 2, 3],
  (n) => 
    Effect.gen(function* () {
      yield* Effect.log(`start #${n}`)
      yield* Effect.sleep(`${n} seconds`)

      if (n < 1) {
        yield* Effect.interrupt
      }
      yield* Effect.log(`done #${n}`)
    }),
    { concurrency: "unbounded" }
)

Effect.runPromiseExit(program).then((exit) => console.log(JSON.stringify(exit, null, 2)))