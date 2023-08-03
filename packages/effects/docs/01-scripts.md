Scripts
-------

You can run the next scripts stores in `package.json` file; for run the hello exercise execute:

Use the next script to run the `/hello` folder exercises:

```bash
yarn start:hello
```

Here the node server runs with a demon to keep it alive.

```bash
yarn once:hello
```

Here the node server runs with a ts-node and run the program once. The expected output for these commands is:

```sh
yarn run v1.22.19
$ ts-node ./src/00-hello.ts
hello, world!
Done in 1.35s.
```

Use the next script to run the `/operators` folder exercises:

```bash
yarn once:operators
```

Here the node server runs with a a demon to keep it alive. The expected output for these commands is:

```sh
yarn run v1.22.19
$ ts-node ./src/01-operators.ts
42
Done in 1.37s.
```

Use the next script to run the `/errors` folder exercises:

```bash
yarn once:errors
```

Here the node server runs with a a demon to keep it alive. One of the expected outputs for these commands is:

```sh
yarn run v1.22.19
$ ts-node ./src/02-errors.ts
~/projects/effect-ts-sandbox/packages/effects/src/02-errors.ts:33
    T.fail(new ConnectionError()),
      ^
Error: {"_tag":"ConnectionError"}
```

According the contents you set in this file, the tag error could change.

Use the next script to run the `/context` folder exercises:

```bash
yarn once:context
```

The expected output of this command is a rock, paper, scissors game; according your selections the logs will be different, below an example of a hard match

```sh
yarn run v1.22.19
$ ts-node ./src/03-context.ts
Jan ken pon! paper
CPU picked paper
tie
Jan ken pon! paper
CPU picked rock
🧑 Player wins!
Done in 7.33s.
```

Use the next script to run the `/layers` folder exercises:

```bash
yarn start:layers
```
