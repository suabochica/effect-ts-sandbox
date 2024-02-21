import { Brand, from, to } from "./brand.common";
import { ISO } from "./optics/iso.optic";

export type Formatted = Brand<string>;
export const toFormatted = to<Formatted>;
export const fromFormatted = from<Formatted>;

interface Formatter extends ISO<string, Formatted> { }

export const NumberFormatter = (fmt: string): Formatter => {
    const numberLimit = fmt.match(/#/g)?.length ?? 0;
    const view = (input: string) => {
        const format = fmt.split('');
        const str = input.replace(/[^0-9]/g, '');
        const data = str.split('');
        let result = '';

        for (
            let current = 0, dataCount = 0;
            dataCount < data.length && current < format.length;
            current++
        ) {
            if (format[current] === '#') {
                result += str[dataCount];
                dataCount++;
            } else {
                result += format[current]
            }
        }

        return result as Formatted;
    }

    const review = (input: Formatted) =>
        input
            .replace(/[^0-9]/g, '')
            .slice(0, numberLimit);

    return ISO.make<string, Formatted>(view, review) as Formatter;
}

export const wellKnownFormats = {
    creditCard: NumberFormatter('#### #### #### ####'),
    expiryDate: NumberFormatter('##/##'),
    cvc: NumberFormatter('###'),
}

export default Formatter;
