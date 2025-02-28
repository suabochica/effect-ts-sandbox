import { Stream, Effect } from "effect"

const stream = Stream.void

Effect
  .runPromise(Stream.runCollect(stream))
  .then(console.log)
  // { _id: 'Chunk', values: [ undefined ] }