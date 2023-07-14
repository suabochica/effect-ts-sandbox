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

const program1 = pipe(
    Random,
    T.flatMap(random => random.next()),
    T.map(x => x + 1),
    T.provideService(Random, RandomLive)
)
