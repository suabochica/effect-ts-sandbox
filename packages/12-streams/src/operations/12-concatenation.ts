import { Stream, Effect } from "effect"

const stream = Stream.concat(Stream.make(1, 2, 3), Stream.make("a", "b"))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{ _id: 'Chunk', values: [ 1, 2, 3, 'a', 'b' ] }
*/