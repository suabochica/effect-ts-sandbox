import { NodeRuntime} from "@effect/platform-node"
import { Console, Effect } from "effect"

const getJson = (url: string) =>
  Effect.tryPromise(() =>
    fetch(url).then((response) => {
      if (!response.ok) {
        console.log("error")
        throw new Error("error")
      }
      console.log("success")

      return response.json() as unknown
    })
  )

const program = (url: string) =>
  getJson(url).pipe(
    Effect.retry({ times: 2 }),
    Effect.timeout("4 seconds"),
    Effect.catchAll(Console.error)
  )

NodeRuntime.run(program("https://dummyjson.com/products/1?delay=1000"))