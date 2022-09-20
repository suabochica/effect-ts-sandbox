import * as T from "@effect-ts/core/Effect"
import {pipe} from "@effect-ts/core/Function"
import {tag} from "@effect-ts/core/Has"

interface ConsoleService {
  log: (message: string) => T.Effect<unknown, never, void>
}

const ConsoleService = tag<ConsoleService>()

const log = (message: string) => T.accessServiceM(ConsoleService)((_) => _.log(message))

export function helloWorldV3(name: string) {
  return log(`hello world: ${name}`)
}

// const program = helloWorldV3("Jim")

/** pipe + chain
 const program = pipe(
 helloWorldV3("Jim"),
 T.chain(() => helloWorldV3("Pam")),
 T.chain(() => helloWorldV3("Dwight")),
 )
 */

// gen + yield
const program = T.gen(function* (_) {
  yield* _(helloWorldV3("Pam"))
  yield* _(helloWorldV3("Jim"))
  yield* _(helloWorldV3("Dwight"))
})

pipe(
  program,
  T.provideService(ConsoleService)({
    log: (message) =>
      T.effectTotal(() => {
        console.log(message)
      })
  }),
  T.runPromise
)

