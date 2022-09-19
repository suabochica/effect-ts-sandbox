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
export function helloWorldV3(name: string) {
  // 3.make the dependency on console explicit
  return ({Console}: ConsoleService) => {
    Console.log(`hello world: ${name}`)
  }
}

const call = helloWorldV3("Jim")

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