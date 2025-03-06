import { Stream, GroupBy, Effect, Chunk } from "effect"

class Exam {
  constructor(readonly person: string, readonly score: number) {}
}

// Define a list of exam results
const examResults = [
  new Exam("Alex", 64),
  new Exam("Michael", 97),
  new Exam("Bill", 77),
  new Exam("John", 78),
  new Exam("Bobby", 71)
]

// Group exam results by the tens place in the score
const groupByKeyResult = Stream.fromIterable(examResults).pipe(
  Stream.groupByKey((exam) => Math.floor(exam.score / 10) * 10)
)

// Count the number of exam results in each group
const stream = GroupBy.evaluate(groupByKeyResult, (key, stream) =>
  Stream.fromEffect(
    Stream.runCollect(stream).pipe(
      Effect.andThen((chunk) => [key, Chunk.size(chunk)] as const)
    )
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{ _id: 'Chunk', values: [ [ 60, 1 ], [ 90, 1 ], [ 70, 3 ] ] }
*/