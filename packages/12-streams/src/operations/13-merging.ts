import { Schedule, Stream, Effect } from "effect"

// Create two streams with different emission intervals
const s1 = Stream.make(1, 2, 3).pipe(
  Stream.schedule(Schedule.spaced("100 millis"))
)
const s2 = Stream.make(4, 5, 6).pipe(
  Stream.schedule(Schedule.spaced("200 millis"))
)

// Merge s1 and s2 into a single stream that interleaves their values
const merged = Stream.merge(s1, s2)

Effect.runPromise(Stream.runCollect(merged)).then(console.log)
/*
Output:
{ _id: 'Chunk', values: [ 1, 4, 2, 3, 5, 6 ] }
*/