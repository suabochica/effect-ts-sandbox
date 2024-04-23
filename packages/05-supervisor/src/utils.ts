import { Effect, Fiber, Supervisor } from "effect";

export const monitorFibers = (
  supervisor: Supervisor.Supervisor<Array<Fiber.RuntimeFiber<any, any>>>
): Effect.Effect<void> =>
  Effect.gen(function* (_) {
    const fibers = yield* _(supervisor.value)

    console.log(`Monitoring ${fibers.length} fibers`)
  })

export const calculateFibonacci = (n: number): Effect.Effect<number> =>
  Effect.gen(function* (_) {
    if (n <= 1) {
      return 1
    }

    yield* _(Effect.sleep("500 millis"))

    const fiber1 = yield* _(Effect.fork(calculateFibonacci(n - 2)))
    const fiber2 = yield* _(Effect.fork(calculateFibonacci(n - 1)))

    const value1 = yield* _(Fiber.join(fiber1))
    const value2 = yield* _(Fiber.join(fiber2))

    return value1 + value2
  })

