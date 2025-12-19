'use client';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import AdminLoader from '../components/AdminLoader';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const { data: session, status } = useSession();

  const handleLogin = async (values, { setSubmitting }) => {
    try {

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.ok) {
        router.push('/admin');
      } else {
        setServerError('Invalid credentials');
      }
    } catch (err) {
      setServerError('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {status === 'loading' && <AdminLoader />}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

          {serverError && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{serverError}</div>}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <Field
                    type="text"
                    name="email"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
