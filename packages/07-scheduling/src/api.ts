import { Console, Effect } from "effect"
import { NodeRuntime } from "@effect/platform-node"

const getJson = (url: string) =>
  Effect.tryPromise(() =>
    fetch(url).then((response) => {
      if (!response.ok) {
        console.log("error")
        throw new Error(response.statusText)
      }
      console.log("ok")

      return response.json() as unknown
    })
  )

const program = (url: string) =>
  getJson(url).pipe(
    Effect.retry({ times: 2 }),
    Effect.timeout("4 seconds"),
    Effect.catchAll(Console.error)
  )

// Testing the happy path
NodeRuntime.runMain(program("https://dummyjson.com/products/1?delay=1000"))

// Testing the timeout
// NodeRuntime.runMain(program("https://dummyjson.com/products/1?delay=5000"))

// Testing the API errors
// NodeRuntime.runMain(program("https://dummyjson.com/auth/products/1?delay=500"))