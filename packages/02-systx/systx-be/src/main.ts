import * as S from 'https://deno.land/x/jazzi_net@v1.0.2/core/server.ts'
import * as R from 'https://deno.land/x/jazzi_net@v1.0.2/core/router.ts'
import * as C from 'https://deno.land/x/jazzi_net@v1.0.2/core/config.ts'

import { getEnv } from "./services/env.service.ts"
import { registerUserRoutes } from './routes/user.routes.ts'
import { registerTransactionRoutes } from './routes/transaction.routes.ts'

const WithPort = C.withPort(Number(getEnv("PORT", "4000").unwrap()))

const router = R.makeRouter()
['|>'](R.useDebugRoute("*", "%method %pathname"))
['|>'](registerUserRoutes)
['|>'](registerTransactionRoutes)

const config = C.makeConfig()
["|>"](WithPort)
['|>'](C.withRouter(router))

S.makeServer()
['|>'](S.withConfig(config))
['|>'](S.listen())