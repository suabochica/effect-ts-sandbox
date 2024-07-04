import { Effect, Console } from "effect"

let i = 1

const expensiveTask = Effect.promise<string>(() => {
  console.log("expensive task...")

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`result ${i++}`)
    }, 100)
  })
})

const program = Effect.gen(function* () {
  console.log("non-cached version:")

  yield* expensiveTask.pipe(Effect.andThen(Console.log))
  yield* expensiveTask.pipe(Effect.andThen(Console.log))

  console.log("cached version:")

  const cached = yield* Effect.cached(expensiveTask)

  yield* cached.pipe(Effect.andThen(Console.log))
  yield* cached.pipe(Effect.andThen(Console.log))
})

Effect.runFork(program)
