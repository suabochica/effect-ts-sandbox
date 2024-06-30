import { Effect, Context, Layer, RequestResolver } from "effect"
import * as Model from "./Model"
import * as Requests from "./requests"
import * as ResolversWithContext from "./resolversWithContext"

export class TodosService extends Context.Tag("TodosService") <
  TodosService,
  {
    getTodos: Effect.Effect<Array<Model.Todo>, Model.GetTodoError>
  }
>() {}

export const TodosServiceLive = Layer.effect(
  TodosService,
  Effect.gen(function* () {
    const http = yield* ResolversWithContext.HttpService
    const resolver = RequestResolver.fromEffect(
      (request: Requests.GetTodos) =>
        Effect.tryPromise<Array<Model.Todo>, Model.GetTodoError>({
          try: () =>
            http
              .fetch("https://api.example.demo/todos")
              .then((res) => res.json()),
          catch: () => new Model.GetTodoError()
        })
    )
    return {
      getTodos: Effect.request(Requests.GetTodos({}), resolver)
    }
  })
)

export const getTodos: Effect.Effect<
Array<Model.Todo>,
Model.GetTodoError,
TodosService
> = Effect.andThen(TodosService, (service) => service.getTodos)
