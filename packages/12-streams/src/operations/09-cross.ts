import { Stream, Effect, Console } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(Stream.tap(Console.log))
const s2 = Stream.make("a", "b").pipe(Stream.tap(Console.log))

const cartesianProduct = Stream.cross(s1, s2)

Effect.runPromise(Stream.runCollect(cartesianProduct)).then(console.log)
/*
Output:
1
a
b
2
a
b
3
a
b
{
  _id: 'Chunk',
  values: [
    [ 1, 'a' ],
    [ 1, 'b' ],
    [ 2, 'a' ],
    [ 2, 'b' ],
    [ 3, 'a' ],
    [ 3, 'b' ]
  ]
}
*/