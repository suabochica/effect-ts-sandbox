import { Effect, Duration } from "effect"

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

export const makeTask = (n: number, delay: Duration.DurationInput) =>
  Effect.promise(
    () => 
      new Promise<void> ((resolve) => {
        console.log(`start task ${n}`)
        setTimeout(() => {
          console.log(`task ${n} done`)
          resolve()
        }, Duration.toMillis(delay))
      })
  )

const fib10Fiber = Effect.fork(fib(10))
