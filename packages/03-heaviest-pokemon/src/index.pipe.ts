import { Effect, pipe } from "effect";

import { getPokemonPipe } from "./api/pokemon";

import { getRandomNumberArray, formatPokemon, calculateHeaviestPokemon } from "./utils";

// Program
// -------

const program = pipe(
  getRandomNumberArray,
  Effect.flatMap((arr) => Effect.all(arr.map(getPokemonPipe))),
  Effect.tap((pokemons) =>
    Effect.log("\n" + pokemons.map(formatPokemon).join("\n"))
  ),
  Effect.flatMap((pokemons) => calculateHeaviestPokemon(pokemons)),
  Effect.flatMap((heaviest) =>
    Effect.log(`The heaviest pokemon weighs ${heaviest} hectograms!`)
  )
);

Effect.runPromise(program);
