import { Effect } from "effect"
import * as Model from "./Model"
import * as Request from "./requests"
import * as ResolversWithContext from "./resolversWithContext"

export const getTodos = Effect.request(
  Request.GetTodos({}),
  ResolversWithContext.GetTodosResolver
)