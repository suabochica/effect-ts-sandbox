import { Effect, Schedule, Console } from "effect"

const action = Console.log("success")

const policy = Schedule.addDelay(
  Schedule.recurs(2),
  () => "100 millis"
)

const program = Effect.repeat(action, policy)

Effect.runPromise(program)
  .then((n: number) => console.log(`repetitions: ${n}`))
