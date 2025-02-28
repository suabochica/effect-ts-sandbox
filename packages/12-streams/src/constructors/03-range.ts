import { Stream, Effect } from "effect"

const stream = Stream.range(1, 5)

Effect
  .runPromise(Stream.runCollect(stream))
  .then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5 ] }