import { Effect, Supervisor, Schedule, Fiber, FiberStatus } from "effect"
import { calculateFibonacci, monitorFibers } from "./utils"

const program = Effect.gen(function* (_) {
  const supervisor = yield* _(Supervisor.track)
  const fibonacciFiber = yield* _(
    calculateFibonacci(10).pipe(Effect.supervised(supervisor), Effect.fork)
  )
  const policy = Schedule.spaced("500 millis").pipe(
    Schedule.whileInputEffect((_) =>
      Fiber.status(fibonacciFiber).pipe(
        Effect.map((status) => status !== FiberStatus.done)
      )
    )
  )
  const monitorFiber = yield* _(
    monitorFibers(supervisor).pipe(Effect.repeat(policy), Effect.fork)
  )

  yield* _(Fiber.join(monitorFiber))

  const result = yield* _(Fiber.join(fibonacciFiber))

  console.log(`Fibonacci result: ${result}`)
})

Effect.runPromise(program)