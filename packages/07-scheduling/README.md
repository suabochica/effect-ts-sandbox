🕰 Scheduling
=============

Scheduling is an important concept in Effect that allows you to define recurring effectful operation with a **immutable value** that describes a scheduled pattern for executing effects.

A `Schedule` operates by consuming values of type `In` and producing values of type `Out`. It determines when to halt or continue the execution based on input values and its internal state.

The inclusion of `Context` parameter allows the schedule to leverage additional services or resources needed.

Schedules are defined as a collection of intervals spread out over time. Each interval represent a window during which the recurrence of an effect is possible. There are 2 related concept in the realm of scheduling _retrying_ and _repetition_.

- Retrying aims to handle failures by executing the effect again.
- Repetition focus on executing the effect repeatedly to achieve a desired outcome.

When using schedules for retrying or repetition, each interval's starting boundary determines when the effect will be executed again (e.g., when an error occurs the effect should be retried).

🧩 Composability of Schedules
-----------------------------

Schedules are composable, meaning you can combine simple schedules to create more complex recurrence patterns. There are several operators that allow you to build sophisticated schedules by combining and modifying existing ones. This flexibility enables you to tailor the scheduling behavior to meet specific requirements.


🧪 Example
----------

Let's start with a simple example of how to read configuration from environment variables:

```sh
pnpm run repeat
```

The output its:

```txt
success repeat
success repeat
success repeat
repetitions: 2
```

🧞 Commands
-----------

All these commands are executed from the root of the packages. i.e., `effect-ts-sandbox/packages/06-configuration`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run api`             | Starts the api program at console                |
| `pnpm run api-retries`     | Starts the api program at console                |
| `pnpm run repeat`          | Starts the repeat program at console             |
| `pnpm run repeatN`         | Starts the repeatN program at console            |
| `pnpm run repeatOrElse`    | Starts the repeatOrElse program at console       |
