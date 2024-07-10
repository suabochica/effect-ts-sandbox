import { Effect } from "effect"

export const fib = (n: number): Effect.Effect<number> =>
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
