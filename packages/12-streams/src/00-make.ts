import { Stream, Effect } from "effect";

const stream = Stream.make(1, 2, 3)

Effect
  .runPromise(Stream.runCollect(stream))
  .then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3 ] }