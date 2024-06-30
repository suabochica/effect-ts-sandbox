import { Effect, Schedule } from "effect"
import * as Queries from "./queries"

const program = Effect.gen(function* () {
  const todos = yield* Queries.getTodos
  yield* Effect.forEach(todos, (todo) => Queries.notifyOwner(todo), {
    concurrency: "unbounded"
  })
}).pipe(Effect.repeat(Schedule.fixed("10 seconds")))

Effect.runPromise(program)
