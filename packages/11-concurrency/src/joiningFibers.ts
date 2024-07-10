import { Effect, Fiber } from "effect"

const fib = (n: number): Effect.Effect<number> =>
  Effect.suspend(() => {
    if (n <= 1) {
      return Effect.succeed(n)
    }

    return fib(n - 1).pipe(
      Effect.zipWith(
        fib(n - 2),
        (a, b) => a + b
      )
    )
  })

const fib10Fiber = Effect.fork(fib(10))

const program = Effect.gen(function* () {
  const fiber = yield* fib10Fiber
  const n = yield* Fiber.join(fiber)

  console.log(n)
})

Effect.runPromise(program)
