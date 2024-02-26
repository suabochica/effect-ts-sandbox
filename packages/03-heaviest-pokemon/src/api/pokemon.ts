import { Effect, pipe } from "effect";
import { parsePokemon } from "./pokemon.schema";

// Fetch
// -----

// --- pipe version

export const getPokemonPipe = (id: number) =>
  pipe(
    Effect.tryPromise({
      try: () =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json()),
      catch: () => new Error(`Error fetching pokemon`)
    }),
    Effect.flatMap((p) => parsePokemon(p))
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
