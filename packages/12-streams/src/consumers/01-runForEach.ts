import { Stream, Effect, Console } from "effect"

const effect = Stream
  .make(1, 2, 3, 4, 5)
  .pipe(
    Stream.runForEach((n) => Console.log(n))
  )

Effect
  .runPromise(effect)
  .then(console.log)

/*
Output:
1
2
3
undefined
*/