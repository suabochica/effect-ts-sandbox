import { Effect, Console, Schedule } from "effect"

const child = Effect.repeat(
  Console.log("child: still running!"),
  Schedule.fixed("1 second")
)

const parent = Effect.gen(function* () {
  console.log("parent: started!")
  yield* Effect.forkScoped(child)
  yield* Effect.sleep("3 seconds")
  console.log("parent: finished!")
})

const program = Effect.scoped(
  Effect.gen(function* () {
    console.log("Local scope started!")
    yield* Effect.fork(parent)
    yield* Effect.sleep("5 seconds")
    console.log("Leaving local scope!")
  })
)

Effect.runPromise(program)
