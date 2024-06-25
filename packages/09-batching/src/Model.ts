export interface User {
  readonly _tag: "User"
  readonly id: number
  readonly name: string
  readonly email: string
}

export class GetUserError {
  readonly _tag = "GetUserError"
}

export interface Todo {
  readonly _tag: "Todo"
  readonly id: number
  readonly message: string
  readonly ownerId: number
}

export class GetTodoError {
  readonly _tag = "GetTodoError"
}

export class SendEmailError {
  readonly _tag = "SendEmailError"
}
