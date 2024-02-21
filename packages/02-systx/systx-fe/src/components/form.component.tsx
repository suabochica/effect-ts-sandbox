// Form component
import React, { Reducer, useContext, useEffect, useReducer } from "react";

const identity = <T,>(x: T) => x

type FormCtx = {
    loading: boolean
    error: boolean
    submit: () => void
    reset: () => void
    getValue: (key: string) => unknown
    setValue: (key: string, val: unknown) => void
    getError: (key: string) => boolean | string
    setError: (key: string, val: boolean | string) => void
}

const FormContext = React.createContext<FormCtx | null>(null)

export const useFormState = () => useContext(FormContext)

type FormProps<T> = {
    children: React.ReactNode
    cleanOnChange?: boolean
    initialState: T
    schema?: Schema<T> // TODO: create Scheme type
    onChange?: (data: T) => void
    onError?: (errors: ErrorsOf<T>) => void // TODO: create ErrorsOf type
    onSubmit?: (data: T) => void
}

const Form = <T extends Record<string, unknown>>({
    children,
    cleanOnChange,
    initialState,
    schema,
    onChange,
    onError,
    onSubmit,
}: FormProps<T>) => {
    // TODO: Add body implementation
}

export default Form;