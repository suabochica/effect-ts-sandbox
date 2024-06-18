import { Effect, Chunk, Ref } from "effect"
import * as ReadLine from "./utils/ReadLine"

const getNames = Effect.gen(function*() {
  const ref = yield* Ref.make(Chunk.empty<string>())

  while(true) {
    const name = yield* ReadLine.readLine("Enter a name or `q` to exit: ")
    if(name === "q") {
      break
    }
    yield* Ref.update(ref, (state) => Chunk.append(state, name))
  }

  return yield* Ref.get(ref)
})

Effect.runPromise(getNames).then(console.log)