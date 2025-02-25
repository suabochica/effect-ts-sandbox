import {Stream, Effect} from "effect"

const streamWithError: Stream.Stream<never, string> = Stream.fail("Uh oh!")

Effect.runPromise(Stream.runCollect(streamWithError))
// throws Error: "Uh oh!"

const streamWithNumber: Stream.Stream<number> = Stream.succeed(42)

Effect
.runPromise(Stream.runCollect(streamWithNumber))
.then(console.log)
// { _id: 'Chunk', values: [ 5 ] }