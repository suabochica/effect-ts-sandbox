// Input component

import { Formatter } from "../commons"
import { ISO } from "../commons/optics/iso.optic"

export interface InputProps {
    id: string
    label: string
    name?: string
    formatter: Formatter // TODO: create a Formatter type
    type?: string
}

const Input = ({
    id,
    label,
    name = id,
    formatter = ISO.id(), // TODO: Check ISO type
    type = "text"
}: InputProps) => {
    // TODO: add component body
}

export default Input;