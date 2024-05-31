import { Effect, Schedule, TestClock, Fiber, TestContext } from "effect"

let start = 0
let i = 0

export const log = <A, Out>(
  action: Effect.Effect<A>,
  schedule: Schedule.Schedule<Out, void>
) => {
  Effect.gen(function* () {
    const fiber: Fiber.RuntimeFiber<[Out, number]> = yield* Effect.gen(
      function* () {
        yield* action
        const now = yield* TestClock.currentTimeMillis
        console.log(
          i === 0
            ? `delay: ${now - start}`
            : i === 10
              ? "..."
              : `#${i} delay: ${now - start}`
        )
        i++
        start = now
      }
    ).pipe(
      Effect.repeat(schedule.pipe(Schedule.intersect(Schedule.recurs(10)))),
      Effect.fork
    )
    yield* TestClock.adjust(Infinity)
    yield* Fiber.join(fiber)
  }).pipe(Effect.provide(TestContext.TestContext), Effect.runPromise)
}