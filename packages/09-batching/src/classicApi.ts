import { Effect } from "effect"
import * as Model from "./Model"

export const getTodos = Effect.tryPromise({
  try: () =>
    fetch("https://api.example.com/todos")
  .then(response => response.json() as Promise<Array<Model.Todo>>),
  catch: () => new Model.GetTodoError()
})

export const getUserById = (id: number) =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://api.example.com/getUserById/id=${id}`)
      .then(response => response.json() as Promise<Model.User>),
    catch: () => new Model.GetUserError()
  })

export const sendEmail = (address: string, text: string) =>
  Effect.tryPromise({
    try: () =>
      fetch("https://api.example.com/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address, text })
      }).then(response => response.json() as Promise<void>),
      catch: () => new Model.SendEmailError()
  })

export const sendEmailToUser = (id: number, message: string) =>
  getUserById(id).pipe(
    Effect.andThen((user) => sendEmail(user.email, message))
  )

export const notifyOwner = (todo: Model.Todo) =>
  getUserById(todo.ownerId).pipe(
    Effect.andThen((user) =>
    sendEmailToUser(user.id, `Hey ${user.name}, you got a todo`))
  )