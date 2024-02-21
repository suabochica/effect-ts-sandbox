type DocElementType =
    "article" |
    "body" |
    "div" |
    "h1" |
    "h2" |
    "li" |
    "p" |
    "section" |
    "span" |
    "ul";

export type DocElement = {
    type: DocElementType,
    props: Record<string, string>
    children: (DocElement | string)[]
}

const element = (type: DocElementType) =>
    (props: Record<string, string> = {}) =>
        (...children: (DocElement | string)[]) => ({
            type,
            props,
            children
        })


export const article = element("article")
export const body = element("body")
export const div = element("div")
export const h1 = element("h1")
export const h2 = element("h2")
export const li = element("li")
export const p = element("p")
export const section = element("section")
export const span = element("span")
export const ul = element("ul")

const renderProps = (props: Record<string, string>) => {
    const stringify = (val: number | boolean | string) => {
        if (typeof val === "string") {
            return `${val}`;
        } else {
            return val
        }
    }

    const str = Object
        .entries(props)
        .map(([key, value]) => [key, stringify(value)])
        .map(([key, value]) => `${key}=${value}`)
        .join(" ");

    return str.length > 0 ? ` ${str} ` : "";
}

export const render = ({
    type,
    props,
    children
}: DocElement): string => {
    const opening = `<${type}${renderProps(props)}>`
    const closing = `</${type}>`
    const innerHtml = children.filter(Boolean)
        .map(c => {
            if (typeof c === "string") {
                return c;
            } else {
                return render(c)
            }
        })
        .join("")

    return `${opening}${innerHtml}${closing}`
}
