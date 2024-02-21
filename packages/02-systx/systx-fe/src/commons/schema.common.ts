import * as Either from "jazzi/dist/Either"

export type Validator<T> = {
    kind: "validator",
    exec: (data: T) => Either.Either<string, T>
    "&&": <U>(other: Validator<U>) => Validator<T | U>
}
