import { Effect, SynchronizedRef } from "effect"

const getAge = (userId: number) =>
  Effect.succeed({ userOd, age: userId * 10})

const users = [1, 2, 3, 4, 5]

const meanAge = Effect.gen(function* () {
  const ref = yield* SynchronizedRef.make(0)

  const log = <R, E, A>(label: string, effect: Effect.Effect<A, E, R>) =>
    Effect.gen(function* () {
      const value = yield* SynchronizedRef.get(ref)
      yield* Effect.log(`${label} get: ${value}`)

      return yield* effect
    })

  const task = (id: number) =>
    log(
      `task ${id}`,
      SynchronizedRef.updateEffect(ref, (sumOfAge) =>
        Effect.gen(function* () {
          const user = yield* getAge(id)

          return sumOfAge + user.age
        })
      )
    )

  yield* task(1).pipe(
    Effect.zip(task(2), { concurrent: true }),
    Effect.zip(task(3), { concurrent: true }),
    Effect.zip(task(4), { concurrent: true }),
  )

  const value = yield* SynchronizedRef.get(ref)

  return value / users.length
})

Effect.runPromise(meanAge).then(console.log)
