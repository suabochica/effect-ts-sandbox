import { Effect, SynchronizedRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SynchronizedRef.make("current")
  // simulating an effect operation
  const updateEffect = Effect.succeed("update")

  yield* SynchronizedRef.updateEffect(ref, () => updateEffect)

  const value = yield* SynchronizedRef.get(ref)

  return value
})

Effect.runPromise(program).then(console.log)