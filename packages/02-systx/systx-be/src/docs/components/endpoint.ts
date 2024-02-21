import * as markup from "../../support/html.ts";

export interface EndpointData {
    method: "GET" | "POST"
    path: string
    description: string
    params?: Record<string, string>
}

const methodContext = (method: "GET" | "POST") => {
    const methodSelector = "endpoint__head__element__method";

    return method === "GET"
        ? methodSelector
        : `${methodSelector} ${methodSelector}--${method.toLocaleLowerCase()}`;
}

const Endpoint = ({
    method,
    path,
    description,
    params
}: EndpointData) => {
    return markup.article({ class: "endpoint" })(
        markup.div({ class: "endpoint__head" })(
            markup.div({ class: "endpoint__head__element" })(
                markup.span({ class: methodContext(method) })(method)
            ),
            markup.div({ class: "endpoint__head__element" })(
                markup.span({ class: "endpoint__head__element__path" })(path)
            ),
        ),
        markup.div({ class: "endpoint__body" })(
            markup.p()(description),
            !params ? "" : markup.div()(
                "URL params",
                markup.ul()(
                    ...Object
                        .entries(params)
                        .map(([key, val]) => markup.li()(`:${key} ${val}`))
                )
            )
        ),
    )
};

export default Endpoint;
