
import { Effect } from "effect"

import { makeTask } from "./index"

const task1 = makeTask(1, "200 millis")
const task2 = makeTask(2, "100 millis")
const task3 = makeTask(3, "210 millis")
const task4 = makeTask(4, "110 millis")
const task5 = makeTask(5, "150 millis")
 
const unbounded = Effect.all([task1, task2, task3, task4, task5], {
  concurrency: "unbounded"
})
 
Effect.runPromise(unbounded)
