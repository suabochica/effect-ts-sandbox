import { Effect } from "effect"
import * as Model from "./Model"
import * as Requests from "./requests"
import * as Resolvers from "./resolvers"

export const getTodos: Effect.Effect<
  Array<Model.Todo>,
  Model.GetTodoError
> = Effect.request(Requests.GetTodos({}), Resolvers.GetTodosResolver)

export const getUserById = (id: number) =>
  Effect.request(
    Requests.GetUserById({ id }),
    Resolvers.GetUserByIdResolver
  ).pipe(Effect.withRequestCaching(true))

export const sendEmail = (address: string, text: string) =>
  Effect.request(
    Requests.SendEmail({ address, text }),
    Resolvers.SendEmailResolver
  )

export const sendEmailToUser = (id: number, message: string) =>
  getUserById(id).pipe(
    Effect.andThen((user) => sendEmail(user.email, message))
  )

export const notifyOwner = (todo: Model.Todo) =>
  getUserById(todo.ownerId).pipe(
    Effect.andThen((user) =>
      sendEmailToUser(user.id, `Hey ${user.name}, you got a todo`)
    )
  )
