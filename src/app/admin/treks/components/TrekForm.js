import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TrekSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  difficulty: Yup.string().oneOf(['easy', 'moderate', 'difficult', 'expert']),
  duration: Yup.string().required('Duration is required'),
  price: Yup.number().typeError('Price must be a number').required('Price is required'),
  status: Yup.string().oneOf(['active', 'inactive']),
  featuredImage: Yup.mixed().nullable(),
  gallery: Yup.array().of(Yup.mixed()).nullable(),
});

export default function TrekForm({ trek, onSubmit, onCancel }) {
  const initialValues = {
    title: trek?.title || '',
    description: trek?.description || '',
    difficulty: trek?.difficulty || 'easy',
    duration: trek?.duration || '',
    price: trek?.price || '',
    status: trek?.status || 'active',
    featuredImage: null,
    gallery: [],
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TrekSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <Field
              name="title"
              type="text"
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Field
              as="textarea"
              name="description"
              rows="6"
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty</label>
              <Field
                as="select"
                name="difficulty"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              >
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
                <option value="expert">Expert</option>
              </Field>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <Field
                name="duration"
                type="text"
                placeholder="e.g., 2 Days"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <Field
                name="price"
                type="number"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <Field
                as="select"
                name="status"
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={(e) => setFieldValue('featuredImage', e.currentTarget.files[0])}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="mt-1 block w-full"
              onChange={(e) => setFieldValue('gallery', Array.from(e.currentTarget.files))}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {trek ? 'Update Trek' : 'Create Trek'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
