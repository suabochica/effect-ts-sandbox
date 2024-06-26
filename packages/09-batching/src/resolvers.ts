import { Effect, RequestResolver, Request } from "effect"
import * as API from "./classicApi"
import * as Model from "./Model"
import * as Requests from "./requests"

export const GetTodosResolver = RequestResolver.fromEffect(
  (request: Requests.GetTodos) => API.getTodos
)

export const GetUserByIdResolver = RequestResolver.makeBatched(
  (requests: ReadonlyArray<Requests.GetUserById>) =>
    Effect.tryPromise({
      try: () =>
        fetch("https://api.example.demo/getUserByIBatch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            users: requests.map(({ id }) => ({ id}))
          })
        }).then((response) => response.json()) as Promise<Array<Model.User>>,
      catch: () => new Model.GetUserError()
    }).pipe(
      Effect.andThen((users) =>
        Effect.forEach(requests, (request, index) =>
          Request.completeEffect(request, Effect.succeed(users[index]))
        )
      ),
      Effect.catchAll((error) =>
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.fail(error))
        )
      )
    )
)

export const SendEmailResolver = RequestResolver.makeBatched(
  (requests: ReadonlyArray<Requests.SendEmail>) =>
    Effect.tryPromise({
      try: () =>
        fetch("https://api.example.demo/sendEmailBatch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            emails: requests.map(({ address, text }) => ({ address, text }))
          })
        }).then((response) => response.json()) as Promise<void>,
      catch: () => new Model.SendEmailError()
    }).pipe(
      Effect.andThen(
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.void)
        )
      ),
      Effect.catchAll((error) =>
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.fail(error))
        )
      )
    )
)
