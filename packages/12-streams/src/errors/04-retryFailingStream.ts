import { Stream, Effect, Schedule } from "effect"
import * as NodeReadLine from "node:readline"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.concat(
    Stream.fromEffect(
      Effect.gen(function* () {
        const s = yield* readLine("Enter a number: ")
        const n = parseInt(s)
        if (Number.isNaN(n)) {
          return yield* Effect.fail("NaN")
        }
        return n
      })
    ).pipe(Stream.retry(Schedule.exponential("1 second")))
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
Enter a number: a
Enter a number: b
Enter a number: c
Enter a number: 4
{
  _id: "Chunk",
  values: [ 1, 2, 3, 4 ]
}
*/

const readLine = (message: string): Effect.Effect<string> =>
  Effect.promise(
    () =>
      new Promise((resolve) => {
        const rl = NodeReadLine.createInterface({
          input: process.stdin,
          output: process.stdout
        })
        rl.question(message, (answer) => {
          rl.close()
          resolve(answer)
        })
      })
  )