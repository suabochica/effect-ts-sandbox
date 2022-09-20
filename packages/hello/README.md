# Testable Code

> Testable code has some peculiar traits that are sometimes misunderstood. Functional programming is sold as a way of
> writing testable code. This conception is wrong in principle because pure functional code can be just as hard to test
> if
> not designed with testability in mind.

## What do we mean by Testable Code?

testable code is code written with testability in mind, code that when it comes to writing test does not presset issues.

There are some common traits of testable code:

- Modularity
- Single purpose
- Explicitness
- Low-Coupling
- Separation of pure and impure
- Simplicity
-

## What do we mean by Testable Code?

Functional programming, by default enforces some of the common traits of testable code, unfortunately not all of them.

In fact, non properly designed functional code can still be very hard to tst, as hard as any others paradigm.

## Hello World!

The first example that evey programmer has seen it is the function "helloWorld"

```ts
export function helloWorld(name: string) {
  console.log(`hello world: ${name}`)
}
```

What is wrong with it? How would we test it?

First of all it is no even a function, in-fact when called `helloWorld("mike")` a side-effect is performed and a global
state is mutated (i.e., the console state)

The "function" does not return anything meaningful, in fact the return type is `void`.

We have no idea if by calling the function we could end up with an exception. In this case no but to know it we have to
look at the implementation.

It uses "console" internally and once again to know it we have to look at the implementation.

### Addressing the issues

1. make `helloWorld` a function
2. express the fact that `helloWorld` cannot fail in the return type
3. make the dependency on console explicit

Giving these guidelines, now we got something like:

```ts
import * as E from "@effect-ts/core/Either"

type IO<A> = () => A

// Cake pattern
interface ConsoleService {
  Console: {
    log: (message: string) => () => IO<E.Either<never, void>>
  }
}

// 1. make helloWorld a function
export function helloWorld(name: string) {
  // 3.make the dependency on console explicit
  return ({Console}: ConsoleService) => {
    Console.log(`hello world: ${name}`)
  }
}

const call = helloWorld("Jim")

const r = call({
  Console: {
    log: (message) => () => {
      console.log(message)

      // 2. express the fact that `helloWorld` cannot fail in the return
      return E.right(undefined)
    }
  }
})

const result = r()
```

At this point the `helloWorld` function is testable an explicit, but it is kind of bad-looking and verbose.

Ever worse composing it with other functions becomes hard. We would like to express both the dependencies an the failure
type in a single return type that compose better.

So to reduce the bad-looking and enable the composition of the `helloWorld` function we should use a type that given a
context returns an error scenario, and otherwise returns a successful scenario. This is known a an effect, Let's check
the next code snippet:

```ts
// 1. Import the effect type
import * as T from "@effect-ts/core/Effect"
import {pipe} from "@effect-ts/core/Function"
import {tag} from "@effect-ts/core/Has"

interface ConsoleService {
  // 2. Declare the console service effect
  // R:  Does not require anything to run (i.e., unknown input)
  // E:  It never fails
  // A:  A printed message
  log: (message: string) => T.Effect<undefined, never, void>
}

// 3. Create a service tag to identify this specific service in an environment
const ConsoleService = tag<ConsoleService>()

// 4. Utility to access the service from the environment
const log = (message: string) => T.accessServiceM(ConsoleService)((_) => _.log(message))

export function helloWorld(name: string) {
  return log(`hello world: ${name}`)
}

const program = helloWorld("Jim")

// 5. Materialize the effect (runPromise)
pipe(
  program,
  T.provideService(ConsoleService)({
    log: (message) =>
      T.effectTotal(() => {
        console.log(message)
      })
  }),
  T.runPromise
)
```

Cool! as you can see we execute five steps to enable composition of the `helloWorld` function via the effect type:

1. import the `Effect` type form `Effect-TS`
2. declare the console service effect
3. create a service tag to identify the service in an environment with multiple services
4. create an utility to access the service from the environment
5. materialize the effect

At this point, when we run the `yarn run dev` command we get in the console

```
Hello World: Jim
```

Now let's check how we can compose the `helloWorld` functions. Initially we will print the hello world with two
different names.

```ts
const program = pipe(
  helloWorldV3("Jim"),
  T.chain(() => helloWorldV3("Pam"))
)
```

The key here is the use of the `T.chain` method. Alternatively, we can take advantage of TypeScript's generator
functions to get a
syntactic sugar for the `pipe` and `T.chain` syntax:

```ts
const program = T.gen(function* (_) {
  yield* _(helloWorld("Pam"))
  yield* _(helloWorld("Jim"))
  yield* _(helloWorld("Dwight"))
})
```

With both versions, after run `yarn run dev` we get:

```
hello world: Pam
hello world: Jim
hello world: Dwight
```

Moreover, we can repeat the execution of the effect twice using the `.repeatN` function:

```ts
pipe(
  program,
  T.repeatN(1),
  T.provideService(ConsoleService)({
    log: (message) =>
      T.effectTotal(() => {
        console.log(message)
      })
  }),
  T.runPromise
)
```

When the `yarn run dev` command is ran, we get:

```
hello world: Pam
hello world: Jim
hello world: Dwight
hello world: Pam
hello world: Jim
hello world: Dwight
```

This is how we use the Effect type in basic terms. Now, everything is testable because your services are shifted and
they are separated.

To complement this example, let's create a program that generates a random number between 0 and 1, and depending of the
number generated, if it is more that 0,5 we print out what we have got, otherwise we will refuse with a type error: