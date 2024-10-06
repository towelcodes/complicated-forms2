import type { PageLoad } from './$types';
import type { FormData } from '$lib/types';
import { QuestionType } from '$lib/types';

export const load: PageLoad = () => {
    const data: FormData = {
        title: "Form Title",
        description: "form description",
        allRequired: true,
        questions: [
            {
                uid: "1",
                title: "Section Title",
                description: "section description",
                type: QuestionType.Checkbox,
                options: [
                    {
                        title: "Part 1",
                        path: {
                            questions: [
                                {
                                    uid: "1.1",
                                    identifier: "1.1",
                                    title: "Question 1.1",
                                    type: QuestionType.Radio,
                                    options: [
                                        {
                                            title: "Yes",
                                            path: {
                                                questions: [
                                                    {
                                                        uid: "1.1.1",
                                                        required: false,
                                                        title: "Question 1.1.1",
                                                        type: QuestionType.Radio,
                                                        options: [
                                                            {
                                                                title: "uhh"
                                                            },
                                                            {
                                                                title: "probably"
                                                            },
                                                            {
                                                                title: "yeah"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            title: "No"
                                        }
                                    ]
                                }, {
                                    uid: "1.2",
                                    identifier: "1.2",
                                    title: "Question 1.2",
                                    type: QuestionType.Radio,
                                    options: [
                                        {
                                            title: "maybe"
                                        },
                                        {
                                            title: "maybe not"
                                        }
                                    ]
                                }, {
                                    uid: "1.3",
                                    identifier: "1.3",
                                    title: "Question 1.3",
                                    type: QuestionType.Checkbox,
                                    options: [
                                        {
                                            title: "Yes"
                                        },
                                        {
                                            title: "No"
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        title: "Part 2",
                        path: {
                            questions: [
                                {
                                    uid: "2.1",
                                    identifier: "2.1",
                                    title: "Question 2.1",
                                    type: QuestionType.Radio,
                                    options: [
                                        {
                                            title: "Yes"
                                        },
                                        {
                                            title: "No"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    };

    return data;
};