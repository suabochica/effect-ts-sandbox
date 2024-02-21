export type UserInput = {
    name: string,
    username: string,
    password: string,
    balance: number,
}

export interface User extends UserInput {
    id: string,
}
