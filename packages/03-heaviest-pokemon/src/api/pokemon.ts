import { Context, Effect, pipe } from "effect";
import { ParseError } from "@effect/schema/ParseResult";
import { type Pokemon, parsePokemon, JSONError, FetchError } from "./pokemon.schema";


// Fetch
// -----

// Dependency Injection
// --------------------

// --- Interface
export interface PokemonClient {
  _tag: "PokemonClient";
  getById(
    id: number
  ): Effect.Effect<never, FetchError | JSONError | ParseError, Pokemon>;
}

// --- Context Tag

export const PokemonClient = Context.Tag<PokemonClient>("@app/PokemonClient");

// --- Injection

export const getPokemon = (id: number) =>
  pipe(
    PokemonClient,
    Effect.flatMap((client) => client.getById(id)),
    Effect.catchAll(() => Effect.succeed({ name: "default", weight: 0 }))
  );

// --- Implementation: pipe version

export const getPokemonPipe = (id: number) =>
  pipe(
    Effect.tryPromise({
      try: () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      catch: () => new Error(`Error fetching pokemon`)
    }),
    Effect.flatMap((response) =>
      Effect.tryPromise({
        try: () => response.json(),
        catch:() => new JSONError(),
      })
    ),
    Effect.flatMap((p) => parsePokemon(p)),
    Effect.catchAll(() => Effect.succeed({ name: "default", weight: 0 }))
  );

// --- Implementation generators version

export const getPokemonGen = (id: number) =>
  Effect.gen(function* (_) {
    const response = yield* _(
      Effect.tryPromise({
        try: () =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((response) => response.json()),
        catch: () => new Error(`Error fetching pokemon`)
      })
    )

    return yield* _(parsePokemon(response))
  });
