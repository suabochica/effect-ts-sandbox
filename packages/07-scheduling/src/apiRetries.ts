import { NodeRuntime } from "@effect/platform-node"
import { Console, Effect } from "effect"

class Err extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
  }
}

const getJson = (url: string) =>
  Effect.tryPromise({
    try: () =>
      fetch(url).then((res) => {
        if (!res.ok) {
          console.log(res.status)
          throw new Err("error", res.status)
        }
        return res.json() as unknown
      }),
    catch: (e) => e as Err
  })

const program = (url: string) =>
  getJson(url).pipe(
    // Retry if the error is a 403
    Effect.retry({ while: (error) => error.status === 403 }),
    Effect.catchAll(Console.error)
  )

// Testing 403
NodeRuntime.runMain(
  program("https://dummyjson.com/auth/products/1?delay=1000")
)

// Testing 404
// NodeRuntime.runMain(program("https://dummyjson.com/-"))