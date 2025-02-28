import { Stream, Effect } from "effect"

const stream = Stream.iterate(1, (n) => n + 1)

Effect
  .runPromise(Stream.runCollect(stream.pipe(Stream.take(5))))
  .then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5 ] }