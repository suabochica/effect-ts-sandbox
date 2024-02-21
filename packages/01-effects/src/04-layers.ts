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

type Winner = "🧑 Player wins!" | "🤖 CPU wins!"

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
    ask: (message: string) => T.Effect<never, NonInteractive, string>,
}

const IOService = Context.Tag<IOService>();

const IOServiceLive = L.effect(
    IOService,
    pipe(
        ConsoleService,
        T.map((consoleService) => {
            return IOService.of({
                ask(message) {
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

const GameService = Context.Tag<GameService>();

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
    L.effect(
        RPS,
        pipe(
            T.all(GameService, IOService),
            T.map(([GameService, IOService]) => {
                type Result = Winner | "Tie"

                const singleRun = pipe(
                    IOService.ask("Rock, paper, scissors!: "),
                    T.flatMap((player) => isRPS(player)
                        ? T.succeed(player)
                        : pipe(
                            IOService.print("Invalid Option"),
                            T.zipRight(T.fail(new InvalidOption))
                        )
                    ),
                    T.bindTo("player"),
                    T.bind("cpu", () => GameService.next()),
                )

                const decide = ({ cpu, player }: Record<"cpu" | "player", RPSOption>): Result => {
                    const decisionTree = {
                        rock: {
                            rock: "Tie",
                            paper: "🤖 CPU wins!",
                            scissors: "🧑 Player wins!",
                        },
                        paper: {
                            rock: "🧑 Player wins!",
                            paper: "Tie",
                            scissors: "🤖 CPU wins!",
                        },
                        scissors: {
                            rock: "🤖 CPU wins!",
                            paper: "🧑 Player wins!",
                            scissors: "Tie",
                        },
                    } as const

                    return decisionTree[player][cpu];
                }

                const game = pipe(
                    singleRun,
                    T.retryWhile(error => error._tag === "InvalidOption"),
                    T.tap(({ cpu }) => IOService.print(`CPU picked ${cpu}`)),
                    T.map(decide),
                    T.tap(result => result === "Tie"
                        ? IOService.print("Tie! run again")
                        : T.unit()
                    ),
                    T.repeatWhileEquals("Tie"),
                    T.map(x => x as Winner)
                )

                return RPS.of({ game })
            }),
        ),
    )
)

const program = pipe(
    RPS,
    T.flatMap(rps => rps.game),
    T.flatMap(winner => T.sync(() => console.log(`${winner} won`)))
)

/**
 * Helpers
 * --------------------
 */

const isRPS = (option: string): option is RPSOption => ["rock", "paper", "scissors"].includes(option);


/**
 * Main
 * --------------------
 */

const MainLayer = pipe(
    ConsoleServiceLive,
    L.provide(IOServiceLive),
    L.merge(GameServiceLive),
    L.provide(RPSLive)
)

pipe(
    program,
    T.provideLayer(MainLayer),
    T.runPromise
)