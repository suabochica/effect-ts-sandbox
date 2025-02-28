import { Stream, Effect, Console} from "effect"

const stream = Stream.scoped(
  Effect.acquireRelease(
    Console.log("acquire"),
    () => Console.log("release")
  )
)

Effect
.runPromise(Stream.runCollect(stream))
.then(console.log)

/*
Output:
acquire
use
{ _id: 'Chunk', values: [ undefined ] }
*/