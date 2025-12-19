import * as Yup from 'yup';

export const getCategorySchema = (editing = false) => {
    const baseSchema = {
        name: Yup.string().required('Category name is required'),
        status: Yup.boolean().required(),
        categoryImg: Yup.mixed()
            .nullable()
            .when([], {
                is: () => !editing,
                then: (schema) => schema.required('Category image is required'),
                otherwise: (schema) => schema,
            }),
    };

    if (!editing) {
        baseSchema.subcategories = Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Subcategory title is required'),
                status: Yup.boolean().required(),
                image: Yup.mixed()
                    .nullable()
                    .required('Subcategory image is required'),
                banner: Yup.mixed()
                    .nullable()
                    .required('Subcategory banner is required'),
            })
        );
    }

    return Yup.object().shape(baseSchema);
};
