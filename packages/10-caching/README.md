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

The Cache module makes it easy to optimize the performance of our application by caching values.

In many applications, we may encounter scenarios where overlapping work is performed. For example, if we are developing a service that handles incoming request, it is essential avoid processing duplicated requests. The Cache module enhance our application's performance by preventing redundant work.

Key features of Cache:

- **Compositionality**: Cache allows different parts of our applicaiton to perform overlapping work while still benefeting from compositional programming principles.
- **Unification of Synchrnoun and Asynchronous Caches**: The compositional definition of a cache through a lookup function unifies both synchronous and asynchronous caches, allowing the lookup funcition to compute values either synchronously or asynchronously.
- **Deep Deffect Integration**: Cache is designed to work natively with the Effect library, supporting concurrent lookups, failure handling, and interruption without losing the power of effect.
- **Caching Policy**: Caching policies determine when values should be removed from the cache, providing flexibility for complex and custom caching strategies. The policy has two parts.
  - **Priority (Optional Removal)**: Defines the order in which values _might_ be removed when the cache is running out of space.
  - **Evict (Mandatory Removal)**: Specifies when the values _must_ be removed because they are no longer valid (e.g., they are too old or no longer satisfies business requirements).
- **Comporing Cache Policy**: Allows the definition of complex caching policies using special ones.
- **Cache/Entry Statistics**: Cache tracks metrics such as entries, hits, misses, helping us to assess and optimize cache performance.

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

All these commands are executed from the root of the packages. i.e., `effect-ts-sandbox/packages/10-caching`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run index`             | Starts the cached example program at console                |
| `pnpm run once`  | Starts the once program at console     |
| `pnpm run cache-module`  | Starts the program that use Cache module at console     |
| `pnpm run cached`  | Starts the cached program at console     |
| `pnpm run cached-with-ttl`  | Starts the `cachedWithTTL` program at console     |
| `pnpm run cached-invalidate-with-ttl`  | Starts the `cachedInvalidateWithTTL` program at console     |
