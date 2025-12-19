"use client";
import { useEffect, useState } from "react";
import * as Yup from "yup";
// import dynamic from 'next/dynamic';
import { ErrorMessage, Field, Form, Formik } from "formik";
import FileInput from "../components/inputs/FileInput";
import { apiRequest } from "../utils/api";
import { showToast } from "@/src/utils/toast";

// Dynamically import TextEditor to disable SSR
// const TextEditor = dynamic(() => import('../components/TextEditor'), { ssr: false });

//homepage theme data
const boxes = [
  {
    id: 1,
    title: "Home Theme One",
    image: "/theme1.png",
  },
  {
    id: 2,
    title: "Home Theme Two",
    image: "/theme2.png",
  },
  {
    id: 3,
    title: "Home Theme Three",
    image: "/theme3.png",
  },
  {
    id: 4,
    title: "Home Theme Four",
    image: "/theme4.png",
  },
  {
    id: 5,
    title: "Home Theme Five",
    image: "/theme5.png",
  },
];

const SettingsSchema = Yup.object().shape({
  siteName: Yup.string().required("Site name is required"),
  siteDescription: Yup.string().required("Site description is required"),
  siteLogo: Yup.mixed().required("Site logo is required"),
  siteEmail: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  socialMedia: Yup.object().shape({
    facebook: Yup.string().url("Invalid URL"),
    instagram: Yup.string().url("Invalid URL"),
    twitter: Yup.string().url("Invalid URL"),
    linkedin: Yup.string().url("Invalid URL"),
    youtube: Yup.string().url("Invalid URL"),
  }),
});

export default function SettingsPage() {
  // const [activeTab, setActiveTab] = useState('general');
  // const [privacyPolicy, setPrivacyPolicy] = useState('');
  // const [terms, setTerms] = useState('');
  const [settings, setSettings] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  // const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null)

  const fetchSetting = async () => {
    try {
      // setLoading(true);
      const res = await fetch("/api/generalSettings");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch settings");
      setSettings(data.settings);
    } catch (err) {
      // setError(err.message || 'Something went wrong');
      console.error("Error fetching settings:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  useEffect(() => {
    if (settings) {
      setInitialValues({
        siteName: settings.title || "",
        siteDescription: settings.description || "",
        siteLogo: settings.logo || "",
        siteEmail: settings.email || "",
        phoneNumber: settings.phoneNumber || "",
        address: settings.address || "",
        socialMedia: {
          facebook: settings.socialMedia?.facebook || "",
          instagram: settings.socialMedia?.instagram || "",
          twitter: settings.socialMedia?.twitter || "",
          youtube: settings.socialMedia?.youtube || "",
          linkedin: settings.socialMedia?.linkedin || "",
        },
        themeType: settings.themeType
      });
    }
  }, [settings]);

  // const initialValues = ,
  // };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("title", values?.siteName);
    formData.append("description", values?.siteDescription);
    formData.append("logo", values?.siteLogo);
    formData.append("email", values?.siteEmail);
    formData.append("phoneNumber", values?.phoneNumber);
    formData.append("address", values?.address);
    formData.append("socialMedia", JSON.stringify(values?.socialMedia));
    formData.append("themeType", values?.themeType);

    try {
      const res = await apiRequest(
        "/admin/api/generalSettings",
        "PATCH",
        "multipart/form-data",
        formData
      );
      if (res.status === 200) {
        showToast("Settings updated successfully", "success");
        localStorage.setItem('selectedHome', `Home${values?.themeType}`);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      showToast("Error updating settings", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6 border-b pb-2">
        {/* <button
          className={`px-4 py-2 ${activeTab === 'general' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General Settings
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'privacy' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy Policy
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'terms' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          Terms & Conditions
        </button> */}
      </div>

      {/* {activeTab === 'general' && ( */}
      <div>
        <div className="bg-white rounded-lg shadow p-6">
          {initialValues && (
            <Formik
              initialValues={initialValues}
              validationSchema={SettingsSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, setFieldValue }) => {
                return (
                  <Form className="space-y-6">
                    <div>
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Site Name
                          </label>
                          <Field
                            name="siteName"
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="siteName"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Site Description
                          </label>
                          <Field
                            as="textarea"
                            name="siteDescription"
                            rows="3"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="siteDescription"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <FileInput
                            label="Site Logo"
                            name="siteLogo"
                            defaultValue={values.siteLogo}
                            showPreview
                            onChange={(event) => {
                              setFieldValue(
                                "siteLogo",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <ErrorMessage
                            name="siteLogo"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Site Email
                          </label>
                          <Field
                            name="siteEmail"
                            type="email"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="siteEmail"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <Field
                            name="phoneNumber"
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <Field
                            as="textarea"
                            name="address"
                            rows="3"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        Social Media Links
                      </h2>
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Facebook
                          </label>
                          <Field
                            name="socialMedia.facebook"
                            type="url"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="socialMedia.facebook"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Instagram
                          </label>
                          <Field
                            name="socialMedia.instagram"
                            type="url"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="socialMedia.instagram"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Twitter
                          </label>
                          <Field
                            name="socialMedia.twitter"
                            type="url"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="socialMedia.twitter"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            LinkedIn
                          </label>
                          <Field
                            name="socialMedia.linkedin"
                            type="url"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="socialMedia.linkedin"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            YouTube
                          </label>
                          <Field
                            name="socialMedia.youtube"
                            type="url"
                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                          />
                          <ErrorMessage
                            name="socialMedia.youtube"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    {/*Select Homepage Theme Section */}
                    <div>
                      <h2 className="text-lg font-semibold mt-8">
                        Select Homepage Theme
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                        {boxes.map((box) => (
                          <div
                            key={box.id}
                            onClick={() => setFieldValue("themeType", box.id)}
                            className={`border rounded-lg overflow-hidden shadow-sm p-4 cursor-pointer transition-all duration-300 ${values.themeType === box.id
                              ? "border-blue-500 bg-blue-50"
                              : "bg-white"
                              }`}
                          >
                            <img
                              src={box.image}
                              alt={box.title}
                              className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold text-center mb-2">
                              {box.title}
                            </h3>
                            <div className="flex justify-center">
                              <input
                                type="checkbox"
                                checked={values.themeType === box.id}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          )}
        </div>
      </div>
      {/* )} */}

      {/* {activeTab === 'privacy' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Edit Privacy Policy</h2>
          <TextEditor value={privacyPolicy} onChange={setPrivacyPolicy} />
        </div>
      )}

      {activeTab === 'terms' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Edit Terms and Conditions</h2>
          <TextEditor value={terms} onChange={setTerms} />
        </div>
      )} */}
    </div>
  );
}
