import * as E from "@effect-ts/core/Either"

export function helloWorldImperative(name: string) {
    console.log(`hello world: ${name}`)
}

export function helloWorldReturn(name: string) {
  return () => {
    console.log(`hello world: ${name}`)
  }
}

export function helloWorldEither(name: string) {
  return (): E.Either<never, void> => {
    console.log(`hello world: ${name}`)
    return E.right(undefined)
  }
}
