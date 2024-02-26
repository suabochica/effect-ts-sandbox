import { Effect, Either } from "effect";

import { getPokemonGen } from "./api/pokemon";

import { getRandomNumberArray, formatPokemon, calculateHeaviestPokemon } from "./utils";

// Program
// -------

const program =  Effect.gen(function* (_) {
  const arr = yield* _(getRandomNumberArray);
  const pokemons =  yield* _(Effect.all(arr.map(getPokemonGen)));
  yield* _(Effect.log("\n" + pokemons.map(formatPokemon).join("\n")));
  const heaviestResult = yield* _(
    Effect.either(calculateHeaviestPokemon(pokemons))
  );

  if (Either.isLeft(heaviestResult)) {
    yield* _(
      Effect.log(
        `Two pokemon have the same weight: ${heaviestResult.left.weight}`
      )
    );
  } else {
    yield* _(
      Effect.log(
        `The heaviest pokemon weighs ${heaviestResult.right} hectograms!`
      )
    );
  }
});

Effect.runPromise(program);
