import { Effect, pipe } from "effect";
import { type Pokemon } from "./api/pokemon.schema";

// Utils
// -----

export const getRandomNumberArray = Effect.all(
  Array.from(
    { length: 10 },
    () => Effect.sync(() => Math.floor(Math.random() * 100) + 1)
  )
);

export const formatPokemon = (pokemon: Pokemon) =>
  `${pokemon.name} weighs ${pokemon.weight} hectograms`

export const calculateHeaviestPokemon = (pokemons: Pokemon[]) =>
  Effect.reduce(pokemons, 0, (highest, pokemon) =>
    pokemon.weight === highest
      ? Effect.fail(new Error("two pokemon have the same weight"))
      : Effect.succeed(pokemon.weight > highest ? pokemon.weight : highest)
  );
