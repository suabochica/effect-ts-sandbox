import { Effect, Chunk, Ref, Fiber } from "effect"
import * as ReadLine from "./utils/ReadLine"

const getNames = Effect.gen(function*() {
  const ref = yield* Ref.make(Chunk.empty<string>())

  const fiber1 = yield* Effect.fork(
    Effect.gen(function* () {
      while(true) {
        const name = yield* ReadLine.readLine("Enter a name or `q` to exit: ")
        if(name === "q") {
          break
        }
        yield* Ref.update(ref, (state) => Chunk.append(state, name))
      }
    })
  )

  const fiber2 = yield* Effect.fork(
    Effect.gen(function* () {
      for (const name of ["John", "Jane", "Joe", "Tom"]) {
        yield* Ref.update(ref, (state) => Chunk.append(state, name))
        yield* Effect.sleep("1 second")
      }
    })
  )

  // Join fibers
  yield* Fiber.join(fiber1)
  yield* Fiber.join(fiber2)

  return yield* Ref.get(ref)
})

Effect.runPromise(getNames).then(console.log)