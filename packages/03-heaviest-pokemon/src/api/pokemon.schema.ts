import * as Schema from '@effect/schema/Schema';

// Schema
// ------

const pokemonSchema = Schema.struct({
  name: Schema.string,
  weight: Schema.number
})

export type Pokemon = Schema.To<typeof pokemonSchema>;
export const parsePokemon = Schema.parse(pokemonSchema)

// Errors
// ------
export class FetchError {
  readonly _tag = "FetchError";
}

export class JSONError {
  readonly _tag = "JSONError";
}

export class SameWeightError {
  readonly _tag = "SameWeightError";
  constructor(readonly weight: number) {}
}
