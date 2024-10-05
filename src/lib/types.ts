export interface AdditionalInfo {
    title: string,
    type: string,
    value: string,
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
    uid: string, // must be unique so question can be identified
    identifier?: string, // does not have to be unique
    required?: boolean, // defaults to true
    title: string,
    description?: string,
    type: QuestionType,
    options: Option[],
    additional?: AdditionalInfo[],
    response?: Response,
}

export interface Response { // only one of these should be filled ideally
    single?: string,
    multi: string[],
    text?: string
}

export interface FormData {
    title: string,
    description: string,
    allRequired: boolean,
    questions: Question[],
}