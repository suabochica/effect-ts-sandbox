⏲ Caching
==========

The next table summarizes the functions you can use to manage caching and memoization in your application:

| Function Name | Description |
|:--------------|:-------------|
|`cachedFunction`| Returns a memoized version of a funcition with effects. Memoization ensures that results are stored and reused for the same inputs, reducing the need to recompute them|
|`once`| Returns and effect that executes only once, regardless of how many times it is called|
|`cached`| Returns an effect that computes a result lazily and caches it. Subsequent evaluation of this effect will return the cached result without re-executing the logic.|
|`cachedWithTTL`| Returns an effect that cahces its result for specified duration, known as the time to live. When the cache expires after the duration, the effect will be recomputed upon next evaluation.|
|`cachedInvalidateWithTTL`| Similar to previous one, this function caches an effectś result for a specfied duration. It also includes an additional effect for manually invalidating the cached value before it naturally expires. |

🧪 Example
----------

Let's start with a simple example of how to use the `cached` function:

```sh
pnpm run index
```

The output its:

```txt
non-memoized version:
7
2
memoized version:
8
8
```

🧞 Commands
-----------

All these commands are executed from the root of the packages. i.e., `effect-ts-sandbox/packages/08-state-management`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run index`             | Starts the cached example program at console                |
| `pnpm run once`  | Starts the once program at console     |
| `pnpm run cached`  | Starts the cached program at console     |
| `pnpm run cached-with-ttl`  | Starts the `cachedWithTTL` program at console     |
| `pnpm run cached-invalidate-with-ttl`  | Starts the `cachedInvalidateWithTTL` program at console     |
