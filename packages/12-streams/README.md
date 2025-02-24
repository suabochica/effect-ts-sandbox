# 🎏 Streams

A `Stream (Stream<A, E, R>)` is a program description that, when executed, can emit **zero or more values** of type `A`, handle errors of type `E`, and operates within a context of Type `R`.

Streams are handy whenever you are dealing with sequences of values over time. They can serve as replacements for observable, node streams, and async/iterables.

Here are the possible scenarios for a `Stream`:

- **An Empty Stream**: It can end up, representing a stream with no values.
- **A Single-Element Stream**: It can represent a stream with just one value.
- **A Finite Stream of Elements**: It can represent a stream with a finite number of values.
- **An Infinite Stream of Elements**: It can represent a stream that continues indefinitely.

In summary, a `Stream` is a versatile tool for representing programs that may yield multiple values, making it suitable for a wide range of tasks, from processing finite lists to handling infinite sequences.

## 🧞 Commands

All these commands are executed from the root of the packages. i.e., `effect-ts-sandbox/packages/12-streams`

| Command          | Action                                              |
| :--------------- | :-------------------------------------------------- |
| `pnpm install`   | Installs dependencies                               |
| `pnpm run make`  | Create a pure stream using `Stream.make`            |
| `pnpm run empty` | Constructor for stream that does not produce values |
