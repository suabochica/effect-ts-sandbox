import { Effect, pipe } from "effect";
import { parsePokemon, JSONError } from "./pokemon.schema";

// Fetch
// -----

// --- pipe version

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

// --- generators version

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
