import { Effect, Config, Console } from "effect";

const program = Effect.all([
  Config.string("HOST"),
  Config.number("PORT"),
]).pipe(
  Effect.flatMap(([host, port]) =>
    Console.log(`Server is running on ${host}:${port}`)
  )
)

Effect.runSync(program);
