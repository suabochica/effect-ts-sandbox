import { Effect } from "effect";

import { getPokemonGen } from "./api/pokemon";

import { getRandomNumberArray, formatPokemon, calculateHeaviestPokemon } from "./utils";

// Program
// -------

const program =  Effect.gen(function* (_) {
  const arr = yield* _(getRandomNumberArray);
  const pokemons =  yield* _ (Effect.all(arr.map(getPokemonGen)));
  yield* _(Effect.log("\n" + pokemons.map(formatPokemon).join("\n")));
  const heaviest = yield* _(calculateHeaviestPokemon(pokemons));
  yield* _(Effect.log(`The heaviest pokemon weighs ${heaviest} hectograms!`));
});

Effect.runPromise(program);
