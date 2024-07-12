🧵 Concurrency
==============

Effect is a concurrent framework powered by fibers. Fiber are lightweight _virtual threads_ with resource-safe cancellation capabilities.

JavaScript is a single thread, meaning it executes code in a single sequence of instruction. However, modern JavaScript environments use event loop to manage asynchronous operations, creating the illusion of multitasking. In this context, virtual threads (a.k.a. fibers) are logical threads simulated by the Effect runtime. They allow concurrent execution without relying on true multi-threading, which is not natively supported by JavaScript.

All effects are executed by fibers. If you don´t create a fiber by yourself, it was created by an operation you are using or by the Effect runtime. Even if you write a "single-threaded" code with no concurrent operations, there will always be at least one fiber (the main) that executes your effect.

These fibers have a well-defined lifecycle based on the effect you are executing. Every fiber exist with either a failure or success, depending on whether effect it is executing. Also, they have unique identities, local state, and a status (such as done, running, or suspended.)
 
The Fiber Data Type
-------------------

The Fiber data type in Effect represents a "handle" on the execution of an effect.

The `Fiber<A, E>` data type has two type parameters:

- **A (Success Type)**: The type of value the fiber may succeed with.
- **E (Failure Type)**: The type of value the fiber may fail with.

Fibers do not have an `R` type parameter because they only execute effects that have already had their requirements provided to them.

What is a Fiber?
----------------

A _fiber_ is a small unit of work. It represents a specific computation or a effectual operation in a program. Fibers are used to manage concurrency and asynchronous task.

Think of a fiber as a worker that perform a specific job. It can be started, paused, resumed, and even interrupted. Fiber are useful when we want to perform multiple tasks simultaneously or handle long-running operations without blocking the main program.

By using fibers, developers can control and coordinate the execution tasks, allowing for efficient multitasking and responsiveness in their applications.

To summarize:

- An `Effect` is a higher-lever concept that describes and effectual computation. It is lazy and immutable, meaning it represents a computation that may produce a value or fail but does not immediately executes.
- A fiber, on the other hand, represents the running execution of a `Effect`. It can be interrupted or awaited to retrieve its result. Think of it as a way to control and interact with the ongoing computation.

Lifetime of Fibers
------------------

When we work with fibers, depending on how we fork them whe can have 4 different lifetime strategies for the child fibers:

1. **Fork with automatic supervision**. If we use the `Effect.fork` operation, the child fiber will be automatically supervised by the parent fiber.The lifetime child fiber are tied to the lifetime of their parent fiber. This means that these fibers will be terminated either when they end naturally, or when their parent fiber is terminated.
2. **Fork in global scope (daemon)**. Sometime we want to run long-running background fibers that are not tied to a parent fiber, and also we want to fork them in a global scope. Any fiber that is forked in global scope will become a daemon fiber. This is done with the `Effect.forkDaemon` operator. As these fibers have no parent, they are not supervised, and they will be terminated when they end naturally, or when the application is terminated.
3. **Fork in local scope**. Sometimes, we want to run a background fiber that isn't tied to its parent fiber, but we want to live that fiber in the local scope. We can fork fibers in the local scope by using `Effect.forkScoped`. Such fibers can outlive their parent fiber (so they are not supervised by their parents), and they will be terminated when their life end or their local scope is closed.
4. **Fork in specific scope**. This is similar to the previous strategy, but we can have more fine-grained control over the lifetime of the child fiber by forking it in a specific scope. We can do this by using the `Effect.forkIn` operator.


🧞 Commands
-----------

All these commands are executed from the root of the packages. i.e., `effect-ts-sandbox/packages/11-concurrency`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run index`             | Starts a fiber with fibonacci               |
| `pnpm run joining-fibers`  | Starts the joining fiber program     |
| `pnpm run awaiting-fibers`  | Starts the awaiting fiber program     |
| `pnpm run interrupting-fibers`  | Starts the interrupting fiber program     |
| `pnpm run composing-fibers`  | Starts the composing fiber program     |
| `pnpm run sequential-execution`  | Starts the sequential execution program     |
| `pnpm run numbered-concurrency`  | Starts the numbered concurrency program     |
| `pnpm run unbounded-concurrency`  | Starts the unbounded concurrency program     |
| `pnpm run inhering-concurrency`  | Starts the inhering concurrency program     |

