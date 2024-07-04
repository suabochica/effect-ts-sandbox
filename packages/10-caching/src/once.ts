import { Effect, Console } from "effect"

const program = Effect.gen(function* () {
  const task1 = Console.log("task1")

  yield* Effect.repeatN(task1, 2)

  const task2 = yield* Effect.once(Console.log("task2"))

  yield* Effect.repeatN(task2, 2)
})

Effect.runFork(program)
