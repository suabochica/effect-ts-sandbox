import { Effect, Context, Ref } from "effect"

// Create a Tag
class MyState extends Context.Tag("MyState")<MyState, Ref.Ref<number>>() {}

// Subprogram 1: Increment the state value thrice
const subprogram1 = Effect.gen(function* () {
  const state = yield* MyState

  yield* Ref.update(state, (n) => n + 1)
  yield* Ref.update(state, (n) => n + 1)
  yield* Ref.update(state, (n) => n + 1)
})


// Subprogram 2: Decrement the state value and then increment it
const subprogram2 = Effect.gen(function* () {
  const state = yield* MyState

  yield* Ref.update(state, (n) => n - 1)
  yield* Ref.update(state, (n) => n + 1)
})

// Subprogram 3: Read and log the current state value
const subprogram3 = Effect.gen(function* () {
  const state = yield* MyState
  const value = yield* Ref.get(state)

  console.log(`MyState has a value of ${value}`)
})

// Compose the subprograms
const program = Effect.gen(function*() {
  yield* subprogram1
  yield* subprogram2
  yield* subprogram3
})

// Create a Ref instance with an initial value of 0
const initialState = Ref.make(0)

// Provide the Ref as a service
const runnable = Effect.provideServiceEffect(program, MyState, initialState)

Effect.runPromise(runnable)