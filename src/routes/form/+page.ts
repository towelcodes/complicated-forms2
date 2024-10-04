import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
        title: "Form Title",
        description: "form description",
        sections: [
            {
                title: "Section Title",
                description: "section description",
                options: [
                    {
                        title: "Part 1",
                        path: {
                            questions: [
                                {
                                    identifier: "1.1",
                                    title: "Question 1.1",
                                    type: "radio",
                                    options: [
                                        {
                                            title: "Yes"
                                        },
                                        {
                                            title: "No"
                                        }
                                    ]
                                }, {
                                    identifier: "1.2",
                                    title: "Question 1.2",
                                    type: "radio",
                                    options: [
                                        {
                                            title: "maybe"
                                        },
                                        {
                                            title: "maybe not"
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
                                    identifier: "2.1",
                                    title: "Question 2.1",
                                    type: "radio",
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
};