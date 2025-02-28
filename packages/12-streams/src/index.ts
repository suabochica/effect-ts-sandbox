import { Effect, Console } from "effect"

const program = Console.log("Hello, Streams!")

Effect.runSync(program)