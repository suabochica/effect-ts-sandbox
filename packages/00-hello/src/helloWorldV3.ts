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

const program = helloWorldV3("Jim")

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

