🧐 Supervisor
=============

A **supervisor** is a tool that manage creation and termination of fibers, producing some visible value of type `A` based on its supervision.

🧪 Example
----------

In the package example, we will periodically monitor the number of fibers throughout our application's lifecycle use to calculate the fibonacci of the number 20. So when you run:

```
pnpm run program
```

The output its:

```
Monitoring 0 fibers
Monitoring 2 fibers
Monitoring 6 fibers
Monitoring 14 fibers
Monitoring 30 fibers
Monitoring 55 fibers
Monitoring 62 fibers
Monitoring 35 fibers
Monitoring 8 fibers
Monitoring 0 fibers
Fibonacci result: 89
```

🧞 Commands
-----------

All these commands are executed from the root of the packages. i.e., `effect-ts-sandbox/packages/05-supervisor`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run program`         | Starts the supervisor program at console         |
