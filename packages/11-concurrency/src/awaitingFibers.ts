import { Effect, Fiber } from "effect"
import { fib } from "./index"


const fib10Fiber = Effect.fork(fib(10))

const program = Effect.gen(function* () {
  const fiber = yield* fib10Fiber
  const n = yield* Fiber.await(fiber)

  console.log(n)
})

Effect.runPromise(program)
