import { Effect, Context, RequestResolver } from "effect"
import * as Model from "./Model"
import * as Requests from "./requests"

export class HttpService extends Context.Tag("HttpService")<
  HttpService,
  { fetch: typeof fetch }
>() {}

export const GetTodosResolver =
  RequestResolver.fromEffect((request: Requests.GetTodos) =>
    Effect.andThen(HttpService, (http) =>
      Effect.tryPromise({
        try: () =>
          http
            .fetch("https://api.example.demo/todos")
            .then((res) => res.json() as Promise<Array<Model.Todo>>),
        catch: () => new Model.GetTodoError()
      })
    )
  ).pipe(
    RequestResolver.contextFromServices(HttpService)
  )
