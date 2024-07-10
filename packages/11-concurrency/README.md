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
