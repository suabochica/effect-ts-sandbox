import { Effect, Fiber } from "effect"

const zipProgram = Effect.gen(function* () {
  const fiber1 = yield* Effect.fork(Effect.succeed("Hi!"))
  const fiber2 = yield* Effect.fork(Effect.succeed("Bye!"))
  const fiber = Fiber.zip(fiber1, fiber2)
  const tuple = yield* Fiber.join(fiber)

  console.log(tuple)
})

const orElseProgram = Effect.gen(function* () {
  const fiber1 = yield* Effect.fork(Effect.fail("Uh oh!"))
  const fiber2 = yield* Effect.fork(Effect.succeed("Hurray!"))
  const fiber = Fiber.orElse(fiber1, fiber2)
  const message = yield* Fiber.join(fiber)

  console.log(message)
})

// Effect.runPromise(zipProgram)
Effect.runPromise(orElseProgram)
