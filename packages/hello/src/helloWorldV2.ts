import * as E from "@effect-ts/core/Either"

type IO<A> = () => A

// Cake pattern
interface ConsoleService {
  Console: {
    log: (message: string) => () => IO<E.Either<never, void>>
  }
}

// 1. make helloWorld a function
export function helloWorldV3(name: string) {
  // 3.make the dependency on console explicit
  return ({Console}: ConsoleService) => {
    Console.log(`hello world: ${name}`)
  }
}

const call = helloWorldV3("Jim")

const r = call({
  Console: {
    log: (message) => () => {
      console.log(message)

      // 2. express the fact that `helloWorld` cannot fail in the return
      return E.right(undefined)
    }
  }
})

const result = r()