import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber = yield* Effect.fork(
    Effect.forever(
      Effect.succeed("Hi!")
    )
  )
  const exit = yield* Fiber.interrupt(fiber)

  console.log(exit)
})

Effect.runPromise(program)
