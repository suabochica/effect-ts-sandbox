import { Effect, Console } from
 "effect"

 const action = Console.log("success repeatN")

 const program = Effect.repeatN(action, 2)

 Effect.runPromise(program)
