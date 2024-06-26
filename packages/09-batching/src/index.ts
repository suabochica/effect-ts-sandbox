import { Effect } from "effect"
import * as Queries from "./queries"

const program = Effect.gen(function* () {
  const todos = yield* Queries.getTodos
  yield* Effect.forEach(todos, (todo) => Queries.notifyOwner(todo), {
    batching: true
  })
})
