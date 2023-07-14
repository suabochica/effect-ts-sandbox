import * as Context from "@effect/data/Context"
import { pipe } from "@effect/data/Function";
import * as T from "@effect/io/Effect"
import * as L from "@effect/io/Layer"

/**
 * Think of Layers as a more structured way of building contexts.
 *
 * `Layer<RIn, never, ROut>` is a blueprint for building a `Context<ROut>`
 *
 * Layer<RIn, E, ROut> should be read as:
 *  - A Layer that needs something of type RIn to construct a Context<ROut>
 *    but may fail with an error of type E
 *
 * Let's build the rock-paper-scissors game with layers
 * Layers is used for create services.
 * - Handler error
 * - Flexibility with the context
 * - Handle dependencies
 *
 * An implementation is not needed to use a service.
 * The power of layers are composition.
 *
 * How to combine layers:
 * - merge: combine w/ dependency
 * - provide: combine w/o dependency
 * - provideMerge:
 */