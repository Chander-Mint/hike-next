import * as Yup from 'yup';

export const eventSchema = Yup.object({
    title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
    subCategoryId: Yup.string().required('Please select a subcategory'),
    description: Yup.string().required('Program Overview is required').min(10, 'Description must be at least 10 characters'),
    img: Yup.mixed().required('Featured Image is required'),

    location: Yup.string().required('Region is required'),
    duration: Yup.string().nullable(),
    difficulty: Yup.string().nullable(),
    basePrice: Yup.number().nullable().min(0, 'Price cannot be negative'),
    bestTime: Yup.string().nullable(),
    maxElevation: Yup.string().nullable(),
    route: Yup.string().nullable(),
    video: Yup.string().nullable(),
    policy: Yup.string().nullable(),

    activities: Yup.array().of(Yup.string()).default(() => []),
    inclusions: Yup.array().of(Yup.string()).default(() => ['']),
    exclusions: Yup.array().of(Yup.string()).default(() => ['']),

    tickets: Yup.array().of(
        Yup.object().shape({
            type: Yup.string(),
            price: Yup.number().min(0, 'Price cannot be negative'),
            availableSlots: Yup.bool(),
            startDate: Yup.date().nullable(),
            endDate: Yup.date().nullable(),
        })
    ),

    itinerary: Yup.array().of(
        Yup.object({
            day: Yup.string(),
            title: Yup.string(),
            description: Yup.string(),
        })
    ),

    guideLines: Yup.array().of(
        Yup.object({
            title: Yup.string(),
            content: Yup.string(),
        })
    ),

    FAQs: Yup.array().of(
        Yup.object({
            question: Yup.string(),
            answer: Yup.string(),
        })
    ),

    documents: Yup.array().of(
        Yup.object({
            header: Yup.string(),
            headerKey: Yup.string(),
            imgFile: Yup.mixed(),
            pdfFile: Yup.mixed(),
        })
    )
});