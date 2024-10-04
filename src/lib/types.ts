export type AdditionalInfo = {
    title: string,
    type: string,
    value: string,
}

export type Path = {
    questions: Question[]
}

export type Option = {
    title: string,
    element: HTMLInputElement | undefined,
    next: Path | undefined,
}

export type Question = {
    identifier: string,
    title: string,
    description: string | undefined,
    type: string,
    options: Option[],
    additional: AdditionalInfo[] | undefined,
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