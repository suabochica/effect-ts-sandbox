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


/**
 * Rock, paper scissors (RPS)
 * -------------------------
 */
