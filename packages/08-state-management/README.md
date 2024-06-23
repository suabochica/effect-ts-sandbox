🌤 State Management
===================

When we write programs, it is common to need to keep track of some form of state during the execution of the program. State refers to any data that can change as the program runs. State management is crucial to building interactive and dynamic applications.

In traditional imperative programming, one common way to store state is using variables. However, this approach can introduce bugs, especially when the state is shared between multiple components or functions.

To overcome these issues, Effect introduces a powerful data type called `Ref`, which represents a mutable reference. With `Ref`, we can share state between different parts of our program without relying on mutable variables directly. Instead, `Ref` provides a controlled way to handle mutable state and safely update it in a concurrent environment.

Effect `Ref` data type enables communication between different fibers in your program. This capability is crucial in concurrent programming, where multiple tasks may need to access and update shared state simultaneously.

`SynchronizedRef<A>` serves as a mutable reference to a value of type `A`. With it, we can store immutable data and perform updates atomically and effectfully.

The distinctive function in `SynchronizedRef` is `updateEffect`. This function takes an effectful operation and executes it to modify the shared state. This is the key feature setting `SynchronizedRef` apart from `Ref`.

In real-world applications, there are scenarios where we need to execute an effect (e.g., querying a database) and then update the shared state accordingly. This is where `SynchronizedRef` shines, allowing us to update shared state in an actor-model fashion. We have a shared mutable state, but for each distinct command or message, we want to execute our effect and update the state.

🧪 Example
----------

Let's start with a simple example of how to use the `Ref` data type:

```sh
pnpm run ref
```

The output its:

```txt
This counter has a value of 2.
```

🧞 Commands
-----------

All these commands are executed from the root of the packages. i.e., `effect-ts-sandbox/packages/08-state-management`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run ref`             | Starts the ref program at console                |
| `pnpm run ref-concurrent`  | Starts the ref concurrent program at console     |
