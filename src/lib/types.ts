export interface AdditionalInfo {
    title: string,
    description?: string,
}

export interface Path {
    questions: Question[]
}

// TODO add text input options with regex constraints
export interface Option {
    title: string,
    element?: HTMLInputElement,
    path?: Path,
}

export enum QuestionType {
    Radio,
    Checkbox,
    Text
}

export interface Question {
    /**
     * A unique identifier for the question
     */
    uid: string,
    /**
     * An optional non-unique identifier that will be shown to the user
     */
    identifier?: string,
    /**
     * Optionally specify if the question is required. If not specified, defaults to true
     */
    required?: boolean,
    /**
     * The title of the question
     */
    title: string,
    /**
     * The description of the question
     */
    description?: string,
    /**
     * The type of the question
     */
    type: QuestionType,
    /**
     * The avaliable options that can be selected.
     * Whether multiple or single selection is determined by the type.
     * If a text input is used, any responses matching specified regex will be used.
     */
    options: Option[],
    /**
     * Optionally allow a field for additional information to be submitted.
     * Only text will be accepted.
     */
    additional?: AdditionalInfo[],
    /**
     * The response to the question.
     * Optionally default values could be specfied here.
     */
    response?: Response,
}

/**
 * Typically only one Response value should be filled.
 * Refer to the Question's QuestionType to determine which.
 */
export interface Response {
    single?: string,
    multi: string[],
    text?: string,
    additional: string[]
}

/**
 * Base form data.
 * This should match the root of the form JSON.
 */
export interface FormData {
    id: number,
    formVersion: number,
    title: string,
    description: string,
    allRequired: boolean,
    questions: Question[],
}
