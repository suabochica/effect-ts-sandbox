import { Stream, Effect, Random } from "effect"

const stream = Stream.repeatEffect(
  Effect.gen(function* () {
    const nextInt = yield* Random.nextInt
    const number = Math.abs(nextInt % 10)
    console.log(`random number: ${number}`)
    return number
  })
).pipe(Stream.take(3))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Example Output:
random number: 7
random number: 5
random number: 0
{ _id: 'Chunk', values: [ 7, 5, 0 ] }
*/

const drained = Stream.drain(stream)

Effect.runPromise(Stream.runCollect(drained)).then(console.log)
/*
Example Output:
random number: 0
random number: 1
random number: 7
{ _id: 'Chunk', values: [] }
*/