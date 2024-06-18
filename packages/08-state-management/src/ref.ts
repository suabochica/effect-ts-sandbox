import { Effect } from "effect"
import * as Counter from "./utils/Counter"

const program = Effect.gen(function*() {
  const counter = yield* Counter.make

  yield* counter.inc
  yield* counter.inc
  yield* counter.dec
  yield* counter.inc

  const value = yield* counter.get

  console.log(`This counter has a value of ${value}`)
})

Effect.runPromise(program)