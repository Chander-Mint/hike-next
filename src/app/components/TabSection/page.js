"use client";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchApiData } from "@/src/app/utils/api";
import { useState } from "react";
import TicketPrice from "./TicketPrice";
import Image from "next/image";
import parse from "html-react-parser";
import { showToast } from "@/src/utils/toast";

export default function TabContent({
  activeTab,
  event,
  comments,
  selectedDayIndex,
  setSelectedDayIndex,
  selectedGuidelineIndex,
  setSelectedGuidelineIndex,
}) {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      comment: Yup.string().required("Comment is required"),
      phoneNumber: Yup.string()
        // .required('Phone number is required')
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const commentData = {
          email: values.email,
          event: event._id,
          content: values.comment,
          name: values.name,
          phoneNumber: values.phoneNumber,
        };

        const response = await fetchApiData(
          "/api/comment",
          "POST",
          "application/json",
          commentData
        );

        comments.push({
          _id: response?._id,
          name: values.name,
          content: values.comment,
          email: values.email,
          phoneNumber: values.phoneNumber,
          createdAt: new Date().toISOString(),
          replies: [],
        });
        resetForm();
        showToast("Comment submitted successfully!", "success");
      } catch (error) {
        showToast("Failed to submit comment: " + error.message, "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const renderComment = (comment, depth = 0) => {
    return (
      <li
        key={comment._id}
        className={`border-b border-gray-200 pb-4 ${
          depth > 0 ? "ml-4 sm:ml-8" : ""
        }`}
      >
        <div className="flex items-start">
          <Icon
            icon="mdi:account-circle"
            className="text-gray-500 text-2xl sm:text-3xl mr-2 sm:mr-3"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
              <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                {comment?.name}
              </h4>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              {comment?.content || comment?.comment}
            </p>
            {comment?.replies && comment?.replies?.length > 0 && (
              <ul className="space-y-4 mt-4">
                {comment?.replies?.map((reply) =>
                  renderComment(reply, depth + 1)
                )}
              </ul>
            )}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-0 mb-8 sm:mb-12">
      {activeTab === "index" && event?.guideLines && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-1">
            {event?.guideLines?.map((item, index) => (
              <div
                key={item?._id}
                className={`p-3 sm:p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedGuidelineIndex === index
                    ? "bg-gray-100 border-l-4 border border-gray-300"
                    : "bg-transparent  hover:bg-gray-100"
                }`}
                onClick={() => setSelectedGuidelineIndex(index)}
              >
                <h3 className="text-base sm:text-md font-semibold text-gray-800">
                  {item?.title}
                </h3>
              </div>
            ))}
          </div>
          <div className="md:col-span-2 mt-4 md:mt-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              {event?.guideLines[selectedGuidelineIndex]?.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              {event?.guideLines[selectedGuidelineIndex]?.content &&
              typeof event?.guideLines[selectedGuidelineIndex]?.content ===
                "string" ? (
                parse(event?.guideLines[selectedGuidelineIndex]?.content)
              ) : (
                <p>No description available.</p>
              )}
            </p>
          </div>
        </div>
      )}

      {activeTab === "itinerary" && event?.itinerary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-1">
            {event?.itinerary?.map((item, index) => (
              <div
                key={item?._id}
                className={`p-3 sm:p-4 rounded-lg cursor-pointer text-sm transition-colors mb-2 
    ${
      selectedDayIndex === index
        ? "bg-[#333] text-white border-l-4 border-orange-500"
        : "bg-transparent border border-gray-200 hover:bg-gray-100 text-black"
    }`}
                onClick={() => setSelectedDayIndex(index)}
              >
                <h3
                  className={`text-base sm:text-md font-medium ${
                    selectedDayIndex === index ? "text-white" : "text-black"
                  }`}
                >
                    <span className="mr-2 font-bold">
                  Day {item?.day}:</span> {item?.title}{" "}
                  {item?.altitude ? `(${item?.altitude})` : ""}
                </h3>
              </div>
            ))}
          </div>
          <div className="md:col-span-2 mt-4 md:mt-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              {event.itinerary[selectedDayIndex].title}{" "}
              {event.itinerary[selectedDayIndex].altitude
                ? `(${event?.itinerary[selectedDayIndex]?.altitude})`
                : ""}
            </h3>
            {event?.itinerary[selectedDayIndex]?.altitude && (
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                <span className="font-semibold">Altitude:</span>{" "}
                {event?.itinerary[selectedDayIndex]?.altitude}
              </p>
            )}
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              {event?.itinerary[selectedDayIndex]?.description &&
              typeof event?.itinerary[selectedDayIndex]?.description ===
                "string" ? (
                parse(event?.itinerary[selectedDayIndex]?.description)
              ) : (
                <p></p>
              )}
            </p>
            {event?.itinerary[selectedDayIndex]?.meals && (
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                <span className="font-semibold">Meals:</span>{" "}
                {event?.itinerary[selectedDayIndex]?.meals}
              </p>
            )}
            {event?.itinerary[selectedDayIndex]?.image && (
              <Image
                width={640}
                height={480}
                src={event?.itinerary[selectedDayIndex]?.image}
                alt={event?.itinerary[selectedDayIndex]?.title}
                className="w-full h-48 sm:h-64 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      )}

      {activeTab === "inclusion-exclusion" &&
        event?.inclusions &&
        event?.exclusions && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">
              Inclusion & Exclusion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold p-2 bg-gray-100 text-orange-700 mb-6">
                  Inclusions
                </h3>
                <ul className="space-y-2">
                  {event?.inclusions?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start pb-3 border-b border-gray-100"
                    >
                      <span className="bg-green-400 p-1 rounded-full mr-2">
                        <Icon
                          icon="mdi:check"
                          className="text-white  text-md sm:text-md"
                        />
                      </span>
                      <span className="text-gray-600 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-orange-700 p-2 bg-gray-100 mb-6">
                  Exclusions
                </h3>
                <ul className="space-y-2">
                  {event?.exclusions?.map((item, index) => (
                    <li key={index} className="flex items-start pb-3">
                      <span className="p-1 bg-red-400 rounded-full mr-2">
                        <Icon
                          icon="mdi:close"
                          className="text-white text-md sm:text-md"
                        />
                      </span>
                      <span className="text-gray-600 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      {activeTab === "policy" && event?.policy && (
        <div>
          {/* <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Policy</h2> */}
          <p className="text-gray-600 text-sm sm:text-base">
            {event?.policy && typeof event?.policy === "string" ? (
              parse(event?.policy)
            ) : (
              <p>No Policy available.</p>
            )}
          </p>
        </div>
      )}

      {activeTab === "ticket-price" && event?.tickets && (
        <TicketPrice event={event} />
      )}

      {activeTab === "download-docs" && event?.documents && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Download Documents
          </h2>
          {event?.documents?.length > 0 ? (
            <ul className="space-y-2">
              {event?.documents?.map((doc, index) => (
                <li key={index}>
                  <a
                    href={doc?.pdfUrl}
                    download
                    className="text-blue-600 hover:underline text-sm sm:text-base"
                  >
                    {doc?.header}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              No documents available for download.
            </p>
          )}
        </div>
      )}

      {activeTab === "faq" && event?.FAQs && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {event?.FAQs.map((faq, index) => (
              <div key={faq?._id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-3 sm:p-4 flex justify-between items-center text-left focus:outline-none"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {faq?.question}
                  </h3>
                  <Icon
                    icon={
                      expandedFAQ === index
                        ? "mdi:chevron-up"
                        : "mdi:chevron-down"
                    }
                    className="text-gray-500 text-lg sm:text-xl"
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFAQ === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm sm:text-base p-3 sm:p-4 pt-0">
                    {faq?.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "comments" && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Comments
          </h2>
          <div className="mb-6 sm:mb-8">
            {/* <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Recent Comments</h3> */}
            {comments?.length > 0 ? (
              <ul className="space-y-4 sm:space-y-6">
                {comments?.map((comment) => renderComment(comment))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Post a Comment
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your Name"
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your Email"
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  maxLength={10}
                  placeholder="Your Phone Number (10 digits)"
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {formik.errors.phoneNumber}
                  </p>
                ) : null}
              </div>
              <div className="mb-4">
                <textarea
                  name="comment"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Comment"
                  rows="5"
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base ${
                    formik.touched.comment && formik.errors.comment
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.comment && formik.errors.comment ? (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {formik.errors.comment}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base ${
                  formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {formik.isSubmitting ? "Submitting..." : "POST COMMENT"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
