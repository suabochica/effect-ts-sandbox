import * as T from "@effect-ts/core/Effect"
import * as Exit from "@effect-ts/core/Effect/Exit"
import {pipe} from "@effect-ts/core/Function"

import * as App from "@app/main";


describe("App", () => {
  it("should succeed for numbers less than 0.5", async () => {
    const messages: string[] = []

    const result = await pipe(
      App.program,
      T.provideService(App.ConsoleService)({
        log: (message) =>
          T.effectTotal(() => {
            messages.push(message)
          })
      }),
      T.provideService(App.RandomService)({
        rand: T.effectTotal(() => {
          return 0.49
        })
      }),
      T.runPromiseExit
    )

    expect(result).toEqual(Exit.unit)
    expect(messages).toEqual(["got: 0.49"])
  }),
    it("should fails for numbers greater than 0.5", async () => {
      const messages: string[] = []

      const result = await pipe(
        App.program,
        T.provideService(App.ConsoleService)({
          log: (message) =>
            T.effectTotal(() => {
              messages.push(message)
            })
        }),
        T.provideService(App.RandomService)({
          rand: T.effectTotal(() => {
            return 0.51
          })
        }),
        T.runPromiseExit
      )

      expect(Exit.untraced(result)).toEqual(Exit.fail(new App.BadRandomValue(0.51)))
      expect(messages).toEqual([])
    })
})
