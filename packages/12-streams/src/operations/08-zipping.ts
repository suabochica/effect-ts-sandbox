import { Stream, Effect } from "effect"

// Zip two streams together
const stream = Stream.zip(
  Stream.make(1, 2, 3, 4, 5, 6),
  Stream.make("a", "b", "c")
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{ _id: 'Chunk', values: [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ] }
*/