import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("start")
  yield* Effect.sleep("2 seconds")
  yield* Effect.interrupt
  yield* Effect.log("done")
})

Effect.runPromiseExit(program).then(console.log)
