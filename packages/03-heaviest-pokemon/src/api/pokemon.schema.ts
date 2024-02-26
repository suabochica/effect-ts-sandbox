import * as Schema from '@effect/schema/Schema';

// Schema
// ------

const pokemonSchema = Schema.struct({
  name: Schema.string,
  weight: Schema.number
})

export type Pokemon = Schema.To<typeof pokemonSchema>;
export const parsePokemon = Schema.parse(pokemonSchema)
