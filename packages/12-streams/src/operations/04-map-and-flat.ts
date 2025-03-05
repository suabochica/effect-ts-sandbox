import { Stream, Effect } from "effect"

const numbers = Stream.make("1-2-3", "4-5", "6").pipe(
  Stream.mapConcat((str) => str.split("-"))
)

Effect
  .runPromise(Stream.runCollect(numbers))
  .then(console.log)

  /*
Output:
{ _id: 'Chunk', values: [ '1', '2', '3', '4', '5', '6' ] }
*/