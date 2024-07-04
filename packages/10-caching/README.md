 Caching
========

The next table summarizes the functions you can use to manage caching and memoization in your application:

| Function Name | Description |
|---------------|--------------|
|`cachedFunction`| Returns a memoized version of a funcition with effects. Memoization ensures that results are stored and reused for the same inputs, reducing the need to recompute them|
|`once`| Returns and effect that executes only once, regardless of how many times it is called|
|`cached`| Returns an effect that computes a result lazily and caches it. Subsequent evaluation of this effect will return the cached result without re-executing the logic.|
|`cachedWithTTL`| Returns an effect that cahces its result for specified duration, known as the time to live. When the cache expires after the duration, the effect will be recomputed upon next evaluation.|
|`cachedInvalidateWithTTL`| Similar to previous one, this function caches an effectś result for a specfied duration. It also includes an additional effect for manually invalidating the cached value before it naturally expires. |
