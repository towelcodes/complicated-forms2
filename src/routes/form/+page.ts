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
                        tree: [
                            {
                                identifier: "1.1",
                                title: "Question 1.1",
                                type: "text",
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
                                type: "text",
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
                    },
                    {
                        title: "Part 2",
                        tree: [
                            {
                                identifier: "2.1",
                                title: "Question 2.1",
                                type: "text",
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
                ]
            }
        ]
	};
};