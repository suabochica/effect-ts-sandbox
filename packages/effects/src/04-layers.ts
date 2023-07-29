import * as Context from "@effect/data/Context"
import { pipe } from "@effect/data/Function";
import * as T from "@effect/io/Effect"
import * as L from "@effect/io/Layer"

/**
 * Think of Layers as a more structured way of building contexts.
 *
 * `Layer<RIn, never, ROut>` is a blueprint for building a `Context<ROut>`
 *
 * Layer<RIn, E, ROut> should be read as:
 *  - A Layer that needs something of type RIn to construct a Context<ROut>
 *    but may fail with an error of type E
 *
 * Let's build the rock-paper-scissors game with layers
 * Layers is used for create services.
 * - Handler error
 * - Flexibility with the context
 * - Handle dependencies
 *
 * An implementation is not needed to use a service.
 * The power of layers are composition.
 *
 * How to combine layers:
 * - merge: combine w/ dependency
 * - provide: combine w/o dependency
 * - provideMerge:
 */

type RPSOption = "rock" | "paper" | "scissors";

type Winner = "Player" | "CPU"

class NonInteractive {
    readonly _tag = "NonInteractive";
}

class InvalidOption {
    readonly _tag = "InvalidOption";
}

interface ConsoleService {
    log: (message: string) => T.Effect<never, never, void>
}

const ConsoleService = Context.Tag<ConsoleService>();

const ConsoleServiceLive = L.succeed(
    ConsoleService,
    ConsoleService.of({
        log(message) {
            return T.sync(() => console.log(message))
        }
    })
)

interface IOService {
    print: (message: string) => T.Effect<never, never, void>,
    ask: (message: string) => T.Effect<never, NonInteractive, void>,
}

const IOService = Context.Tag<IOService>();

const IOServiceLive = L.effect(
    IOService,
    pipe(
        ConsoleService,
        T.map((consoleService) => {
            return IOService.of({
                aks(message) {
                    return T.tryCatchPromise(async () => {
                        const answer = await prompt(message)

                        if (answer === null) {
                            throw undefined;
                        } else {
                            return answer;
                        }
                    }, () => new NonInteractive())
                },
                print(message) {
                    return consoleService.log(message)
                }
            })
        })
    )
)

interface GameService {
    next: () => T.Effect<never, never, RPSOption>;
}

const GameService = Context.tag<GameService>();

const GameServiceLive = L.succeed(
    GameService,
    GameService.of({
        next() {
            const action = Math.floor(Math.random() * 3) as 0 | 1 | 2;

            return T.succeed((["rock", "paper", "scissors"] as const)[action]);
        }
    })
)

interface RPS {
    game: T.Effect<never, InvalidOption | NonInteractive, Winner>;
}

const RPS = Context.Tag<RPS>();

const RPSLive = pipe(
    RPS,
    pipe(
        T.all(GameService, IOService),
        // TODO: Complete implementation
    )
)

/**
 * Helpers
 * --------------------
 */

const isRPS = (option: string): option is RPSOption => ["rock", "paper", "scissors"].includes(option);

