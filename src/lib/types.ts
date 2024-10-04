export type AdditionalInfo = {
    title: string,
    type: string,
    value: string,
}

export type Option = {
    title: string,
    element: HTMLInputElement | undefined;
    next: Question[] | undefined
}

export type Question = {
    identifier: string,
    title: string,
    type: string,
    options: Option[],
    additional: AdditionalInfo[] | undefined
}

export type Section = {
    title: string,
    description: string,
    options: Option[]
}

export type FormData = {
    title: string,
    description: string,
    sections: Section[],
}