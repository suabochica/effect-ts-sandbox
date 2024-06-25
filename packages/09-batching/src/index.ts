import { Effect } from "effect"
import * as API from "./classicApi"

const program = Effect.gen(function* () {
  const todos = yield* API.getTodos
  yield* Effect.forEach(todos, (todo) => API.notifyOwner(todo), {
    concurrency: "unbounded"
  })
})
