import * as markup from "../../support/html.ts";

export interface ModuleData {
    name: string,
    endpoints: markup.DocElement[]
}

const Module = ({
    name,
    endpoints
}: ModuleData) => {
    return markup.section()(
        markup.h2()(name),
        markup.section()(...endpoints)
    )
}

export default Module;
