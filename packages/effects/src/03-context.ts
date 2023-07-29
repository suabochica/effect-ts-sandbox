import * as T from "@effect/io/Effect"
import * as Context from "@effect/data/Context"
import { pipe } from "@effect/data/Function";
import { prompt } from "./_utils";

/**
 * Context
 * =======
 *
 * "Dependency Injection"
 * 
 * Previous effects did not have a context; they all had never in the R type.
 * In this section we are going to start using the R parameter to supply a context.
 * 
 * All we need is an interface that defines the service and a Tag that identifies
 * the service. Think of the context as Map<Tag, Service>.
 *
 */

/**
 * Intro to context w/ random
 * --------------------------
 */

interface Random {
    next: () => T.Effect<never, never, number>;
}

const Random = Context.Tag<Random>();

const RandomLive = Random.of({
    next() {
        return T.sync(() => Math.random());
    }
});

/**
 * To build implementation of service, tags have an "of" method available;
 * 
 * i.e. Random.of( {next: () => 42 })
 * 
 * Exercise
 * --------
 * 
 * 1. Provide an implementation of the environment and run program1
 */

const program1 = pipe(
    Random,
    T.flatMap(random => random.next()),
    T.map(x => x + 1),
    T.provideService(Random, RandomLive)
)

T.runSync(program1)

/**
 * Validate user information
 * -------------------------
 */

const printLn = (msg: string) => T.sync(() => console.log(msg));


class NonInteractive {
    readonly _tag = "NonInteractive";
}

class InvalidOption {
    readonly _tag = "InvalidOption";
}

class AuthError {
    readonly _tag = "AuthError";
}

const ask = (message: string) => T.tryCathPromise(
    async () => {
        const answer = await prompt(message)

        if (answer === null) {
            throw undefined;
        } else {
            return answer;
        }
    },
    () => new NonInteractive()
)


type User = {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
}

interface UserService {
    login: (
        username: string,
        password: string,
    ) => T.Effect(never, AuthError, User)
}

const UserService = Context.tag<UserService>();

const UserServiceLive = UserService.of({
    login(username, password) {
        return pipe(
            T.Do(),
            T.zipLeft(wait(1000)),
            T.bindDiscard("username", equals("sua")(username)),
            T.bindDiscard("password", equals("123")(username)),
            T.map(() => ({
                id: "idk",
                userName: username,
                firstName: "sua",
                lastName: "bochica"

            } as User)),
        )
    }
})

const program2 = pipe(
    T.Do(),
    T.bind("username", () => ask("username: ")),
    T.bind("password", () => ask("username: ")),
    T.bind("service", () => UserService),
    T.flatMap(({ username, password, service }) => service.login(username, password)),
    T.tap((user) => printLn(`Hellos ${user.firstName}!`))
)


/**
 * Exercise
 * --------
 * 
 * 2. Using program2, create a new program to handle error.
 */

const program3 = pipe(
    program2,
    T.provideService(UserService, UserServiceLive),
    T.catchAll(error => printLn(error._tag))
)

// T.runPromise(program3)

/**
 * Rock, paper scissors (RPS)
 * -------------------------
 */

type RPSOption = "rock" | "paper" | "scissors";

interface IOService {
    print(message: string) => T.Effect<never, never, void>,
    ask(message: string) => T.Effect<never, NonInteractive, string>,
}

const IOService = Context.tag<IOService>()

const IOServiceLive = IOService.of({
    ask,
    printLn, printLn
})

interface GameService {
    next: () => T.Effect<never, never, RSPOption>
}

const GameService = Context.tag<GameService>()

const GameServiceLive = GameService.of({
    next() {
        const action = Math.floor(Math.random() * 3) as 0 | 1 | 2;

        return T.succeed((["rock", "paper", "scissors"] as const)[action])
    }
})

const services = pipe(
    Context.empty(),
    Context.add(GameService, GameServiceLive),
    Context.add(IOService, IOServiceLive),
);

/**
 * Helpers
 * -------------------------
 */
const wait = (millis: number): T.Effect<never, never, void> => T.async((resume) => {
    setTimeout(() => resume(T.unit()), millis);
});

const equals = (a: string) => (b: string): T.Effect<never, AuthError, string> => {
    if (a === b) {
        return T.succeed(a);
    } else {
        return T.fail(new AuthError());
    }
}

const RPS = pipe(
    T.Do(),
    T.bind("io", () => IOService),
    T.bind("raw", ({ io }) => io.ask("Jan ken pon!L ")),
    T.bind("player", ({ raw, io }) => ["rock", "paper", "scissors"].includes(raw as any)
        ? T.succeed(raw as RPSOption)
        : pipe(
            io.print("Invalid option"),
            T.zipRight(T.fail(new InvalidOption))
        )
    ),
    T.retryWhile((error) => error._tag === "InvalidOption"),
    T.bind("game", () => GameService),
    T.bind("ai", ({ game }) => game.next()),
    T.tap(({ io, ai }) => io.print(`CPU picked ${ai}`)),
    T.map(({ player, ai }) => {
        const p = player;
        const result = {
            rock: {
                rock: "tie",
                paper: "🤖 CPU wins!",
                scissors: "🧑 Player wins!",
            },
            paper: {
                rock: "🧑 Player wins!",
                paper: "tie",
                scissors: "🤖 CPU wins!",
            },
            scissors: {
                rock: "🤖 CPU wins!",
                paper: "🧑 Player wins!",
                scissors: "tie",
            },
        } as const

        return result[p][ai]
    })
)

T.runPromise(RPS)