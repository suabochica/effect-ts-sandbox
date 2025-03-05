import { Stream, Effect } from "effect";

const stream = Stream.range(1, 5).pipe(
  Stream.mapAccum(0, (state, n) => [state + n, state + n])
)

Effect
  .runPromise(Stream.runCollect(stream))
  .then(console.log)

/*
Output:
{ _id: 'Chunk', values: [ 1, 3, 6, 10, 15 ] }
*/