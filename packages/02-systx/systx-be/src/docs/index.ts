import * as markup from "../support/html.ts"
import Endpoint from "./components/endpoint.ts";
import Module from "./components/module.ts"


const UserModule = () => Module({
    name: "Users",
    endpoints: [
        Endpoint({
            method: "GET",
            path: "/user/:id",
            description: "Get the information of a single user",
            params: {
                id: "user id"
            }
        }),
        Endpoint({
            method: "POST",
            path: "/user",
            description: "Create a user. Requires a json body with `username`, `password`, `name` and `balance`.",
        }),
        Endpoint({
            method: "POST",
            path: "/login",
            description: "Create a user login. Requires a json body with `username`, and `password`.",
        }),
    ]
});

const TransactionModule = () => Module({
    name: "Transactions",
    endpoints: [
        Endpoint({
            method: "GET",
            path: "/transactions/:username",
            description: "Get the transactions of a single user",
            params: {
                username: "the user name whose transaction will be retrieved"
            }
        }),
        Endpoint({
            method: "POST",
            path: "/transactions",
            description: "Create a transaction. Requires a json body with `from`, `to` and an `amount`.",
        }),
    ]
});

const Docs = () => markup.body()(
    UserModule(),
    TransactionModule()
);

export default Docs;
