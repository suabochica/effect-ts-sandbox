import { Effect, Schedule } from "effect"

let count = 0

const action = Effect.async<string, string>((resume) => {
  if (count > 1) {
    console.log("failure")
    resume(Effect.fail("Uh oh!"))
  } else {
    count++
    console.log("success")
    resume(Effect.succeed("Yay!"))
  }
})

const policy = Schedule.addDelay(
  Schedule.recurs(2),
  () => "100 millis"
)

const program = Effect.repeatOrElse(action, policy, () =>
  Effect.sync(() => {
    console.log("orElese")

    return count -1
  })
)

Effect.runPromise(program).then((n) => console.log(`repetition: ${n}`))
