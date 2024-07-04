import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const randomNumber = (n: number) => Random.nextIntBetween(1, n)
  console.log("non-memoized version:")
  console.log(yield* randomNumber(10))
  console.log(yield* randomNumber(10))

  console.log("memoized version:")
  const memoized = yield* Effect.cachedFunction(randomNumber)
  console.log(yield* memoized(10))
  console.log(yield* memoized(10))
})

Effect.runFork(program)
