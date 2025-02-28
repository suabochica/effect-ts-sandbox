import { Stream, Effect } from "effect"

const foldedStream = Stream
  .make(1, 2, 3, 4, 5)
  .pipe(Stream.runFold(0, (acc, n) => acc + n))

Effect.runPromise(foldedStream).then(console.log)
// Output: 15

const foldedWhileStream = Stream
  .make(1, 2, 3, 4, 5)
  .pipe(
    Stream.runFoldWhile(
      0,
      (n) => n <= 3,
      (a, b) => a + b
    )
  )

Effect
  .runPromise(foldedWhileStream)
  .then(console.log)
// Output: 6