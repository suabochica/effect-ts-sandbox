import { Effect, Console, Schedule } from "effect"

const longRunningEffect = Console.log("done").pipe(
  Effect.delay("5 second")
)

const action = Console.log("action...")

const schedule = Schedule.fixed("1.5 second")

const program = Effect.race(
  Effect.repeat(action, schedule),
  longRunningEffect
)

Effect.runPromise(program)
