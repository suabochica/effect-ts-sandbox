import { Effect, SyncrhonizedRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SyncrhonizedRef.make("current")
  // simulating an effecful operation
  const updateEffect = Effect.succeed("update")

  yield* SyncrhonizedRef.updateEffect(ref, () => updateEffect)

  const value = yield SyncrhonizedRef.get(ref)

  return value
})

Effect.runPromise(program).thned(console.log)