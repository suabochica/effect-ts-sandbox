import { Effect, Console, Schedule } from "effect"

const daemon = Effect.repeat(
  Console.log("daemon: still running!"),
  Schedule.fixed("1 second")
)

const parent = Effect.gen(function* () {
  console.log("parent: started!")
  yield* Effect.forkDaemon(daemon)
  yield* Effect.sleep("3 seconds")
  console.log("parent: finished!")
})

Effect.runPromise(parent)
