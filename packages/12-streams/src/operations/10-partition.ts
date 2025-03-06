import { Stream, Effect } from "effect"

const program = Stream.range(1, 9).pipe(
  Stream.partition((n) => n % 2 === 0, { bufferSize: 5 })
)

Effect.runPromise(
  Effect.scoped(
    Effect.gen(function* () {
      const [odds, evens] = yield* program
      console.log(yield* Stream.runCollect(odds))
      console.log(yield* Stream.runCollect(evens))
    })
  )
)

/*
Output:
{ _id: 'Chunk', values: [ 1, 3, 5, 7, 9 ] }
{ _id: 'Chunk', values: [ 2, 4, 6, 8 ] }
*/