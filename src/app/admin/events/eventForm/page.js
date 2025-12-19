'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { eventSchema } from '../EventSchema';
import { apiRequest } from '../../utils/api';
import { showToast } from '@/src/utils/toast';
import InclusionsExclusionsTab from '../tabs/InclusionsExclusionsTab';
import TicketsTab from '../tabs/TicketsTab';
import DocumentsTab from '../tabs/DocumentsTab';
import FAQsTab from '../tabs/FAQsTab';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const PolicyTab = dynamic(() => import('../tabs/PolicyTab'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
});
const BasicInfoTab = dynamic(() => import('../tabs/BasicInfoTab'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
});
const GuidelinesTab = dynamic(() => import('../tabs/GuidelinesTab'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
});
const ItineraryTab = dynamic(() => import('../tabs/ItineraryTab'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
});

const EventForm = ({ onClose, initialValues, onSubmit, onCancel }) => {
    const [ticketFields, setTicketFields] = useState([{ type: '', price: '', availableSlots: false, startDate: '', endDate: '' }]);
    const [itineraryFields, setItineraryFields] = useState([{ day: '', title: '', description: '' }]);
    const [faqFields, setFaqFields] = useState([{ question: '', answer: '' }]);
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categoryError, setCategoryError] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [subcategoryLoading, setSubcategoryLoading] = useState(false);
    const [subcategoryError, setSubcategoryError] = useState(null);
    const [guidelineFields, setGuidelineFields] = useState([{ title: '', content: '' }]);
    const [inclusionFields, setInclusionFields] = useState(['']);
    const [exclusionFields, setExclusionFields] = useState(['']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const eventId = urlParams.get('id') || initialValues?._id;
    const storageKey = eventId ? `eventForm_${eventId}` : 'eventForm_new';
    const isEditMode = !!eventId;
    const router = useRouter();

    const defaultValues = {
        title: '',
        location: '',
        duration: '',
        bestTime: '',
        maxElevation: '',
        route: '',
        difficulty: '',
        activities: [],
        basePrice: '',
        description: '',
        img: null,
        video: '',
        itinerary: [],
        inclusions: [''],
        exclusions: [''],
        tickets: [],
        guideLines: [{ title: '', content: '' }],
        FAQs: [{ question: '', answer: '' }],
        policy: '',
        subCategoryId: '',
        category: '',
        documents: [{ header: '', headerKey: '', imgFile: null, pdfFile: null }],
        status: 'Active'
    };

    const initialValuesState = useMemo(() => {
        if (typeof window === 'undefined') {
            return { ...defaultValues, ...initialValues };
        }

        if (isEditMode) {
            localStorage.removeItem('eventForm_new');
            const mergedValues = {
                ...defaultValues,
                ...initialValues,
                category: initialValues?.category?._id || initialValues?.category || '',
                subCategoryId: initialValues?.subCategoryId || '',
            };
            return mergedValues;
        }

        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                setTicketFields(data.ticketFields || [{ type: '', price: '', availableSlots: false, startDate: '', endDate: '' }]);
                setItineraryFields(data.itineraryFields || [{ day: '', title: '', description: '' }]);
                setFaqFields(data.faqFields || [{ question: '', answer: '' }]);
                setGuidelineFields(data.guidelineFields || [{ title: '', content: '' }]);
                setInclusionFields(data.inclusionFields || ['']);
                setExclusionFields(data.exclusionFields || ['']);
                setSubcategories(data.subcategories || []);
                return {
                    ...defaultValues,
                    ...initialValues,
                    ...data,
                    tickets: data.ticketFields || [],
                    itinerary: data.itineraryFields || [],
                    FAQs: data.faqFields || [],
                    guideLines: data.guidelineFields || [],
                    inclusions: data.inclusionFields || [''],
                    exclusions: data.exclusionFields || [''],
                    documents: data.documents || [{ header: '', headerKey: '', imgFile: null, pdfFile: null }],
                    img: null,
                    video: null,
                    category: data.category || '',
                    subCategoryId: data.subCategoryId || '',
                };
            } catch (error) {
                console.error(`[${new Date().toISOString()}] Create mode - Error parsing localStorage:`, error);
            }
        }
        return { ...defaultValues, ...initialValues };
    }, [initialValues, isEditMode, storageKey]);

    // Fetch categories on mount
    useEffect(() => {
        let mounted = true;
        const fetchCategories = async () => {
            setCategoryLoading(true);
            try {
                const response = await apiRequest('/api/category', 'GET');
                if (mounted && response) {
                    setCategories(response.categories);
                } else if (mounted) {
                    setCategoryError('Failed to load Categories');
                }
            } catch (error) {
                if (mounted) {
                    setCategoryError('Error fetching Categories');
                    console.error(error);
                }
            } finally {
                if (mounted) {
                    setCategoryLoading(false);
                }
            }
        };
        fetchCategories();
        return () => {
            mounted = false;
        };
    }, []);

    // Fetch subcategories for initial category in edit mode
    useEffect(() => {
        let mounted = true;
        const fetchSubcategories = async () => {
            if (isEditMode && (initialValues?.category?._id || initialValues?.category)) {
                const categoryId = initialValues?.category?._id || initialValues?.category;
                if (categoryId) {
                    setSubcategoryLoading(true);
                    setSubcategories([]);
                    setSubcategoryError(null);
                    try {
                        const response = await apiRequest(`/api/category/${categoryId}`, 'GET');
                        if (mounted && response?.categories?.subCategories) {
                            setSubcategories(response.categories.subCategories);
                        } else if (mounted) {
                            setSubcategoryError('Failed to load subcategories');
                        }
                    } catch (error) {
                        if (mounted) {
                            setSubcategoryError('Error fetching subcategories');
                            console.error(error);
                        }
                    } finally {
                        if (mounted) {
                            setSubcategoryLoading(false);
                        }
                    }
                }
            }
        };
        fetchSubcategories();
        return () => {
            mounted = false;
        };
    }, [initialValues?.category, isEditMode]);

    // Update fields in edit mode
    useEffect(() => {
        if (isEditMode && initialValues) {
            setTicketFields(
                initialValues.tickets?.map((ticket) => ({
                    price: ticket?.price || '',
                    availableSlots: ticket.availableSlots === 'Available' || ticket.availableSlots === true,
                    startDate: ticket?.startDate || '',
                    endDate: ticket?.endDate || '',
                    status: ticket?.status || 'Available',
                })) || [{ type: '', price: '', availableSlots: false, startDate: '', endDate: '' }],
            );
            setItineraryFields(initialValues?.itinerary || [{ day: '', title: '', description: '' }]);
            setFaqFields(
                initialValues.FAQs?.map((faq) => ({
                    question: faq?.question || '',
                    answer: faq?.answer || '',
                })) || [{ question: '', answer: '' }],
            );
            setGuidelineFields(
                initialValues.guideLines?.map((guide) => ({
                    title: guide?.title || '',
                    content: guide?.content || '',
                })) || [{ title: '', content: '' }],
            );
            setInclusionFields(initialValues?.inclusions || ['']);
            setExclusionFields(initialValues?.exclusions || ['']);
        }
    }, [initialValues, isEditMode]);

    const handleManualSave = (values) => {
        if (isEditMode || typeof window === 'undefined') return;
        const saveData = {
            ...values,
            ticketFields,
            itineraryFields,
            faqFields,
            guidelineFields,
            inclusionFields,
            exclusionFields,
            subcategories,
            tickets: ticketFields,
            itinerary: itineraryFields,
            FAQs: faqFields,
            guideLines: guidelineFields,
            inclusions: inclusionFields,
            exclusions: exclusionFields,
            img: null,
            video: null,
            documents: values?.documents?.map((doc) => ({
                ...doc,
                imgFile: null,
                pdfFile: null,
            })),
        };
        try {
            localStorage.setItem(storageKey, JSON.stringify(saveData));
            showToast('Draft saved successfully!', 'success');
        } catch (error) {
            showToast('Error saving draft', 'error');
            console.error(error);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setIsSubmitting(true);
        let timeoutId = null;
        try {
            timeoutId = setTimeout(() => {
                showToast('Form submission is taking longer than expected', 'info');
            }, 30000);

            const formData = new FormData();

            const transformedTickets = values.tickets.map((ticket) => ({
                price: ticket.price,
                availableSlots: ticket.availableSlots === 'on' || ticket.availableSlots === true,
                startDate: ticket.startDate,
                endDate: ticket.endDate,
                status: ticket.status || 'Available',
            }));

            formData.append('title', values.title);
            formData.append('location', values.location);
            formData.append('duration', values.duration);
            formData.append('bestTime', values.bestTime);
            formData.append('maxElevation', values.maxElevation);
            formData.append('route', values.route);
            formData.append('difficulty', values.difficulty);
            formData.append('description', values.description);
            formData.append('basePrice', Number(values.basePrice));
            formData.append('subCategoryId', values.subCategoryId);
            formData.append('status', values.status)
            formData.append('tickets', JSON.stringify(transformedTickets));

            if (values?.documents && values.documents.length > 0) {
                values.documents.forEach((doc, index) => {
                    if (doc.header) {
                        formData.append(`documents[${index}].header`, doc.header);
                        if (doc.imgFile instanceof File) {
                            formData.append(`documents[${index}].imgFile`, doc.imgFile);
                        }
                        if (doc.pdfFile instanceof File) {
                            formData.append(`documents[${index}].pdfFile`, doc.pdfFile);
                        }
                    }
                });
            }

            formData.append('activities', JSON.stringify(values.activities));
            formData.append('guideLines', JSON.stringify(values.guideLines));
            formData.append('FAQs', JSON.stringify(values.FAQs));
            formData.append('inclusions', JSON.stringify(values.inclusions));
            formData.append('exclusions', JSON.stringify(values.exclusions));

            if (values.img instanceof File) {
                formData.append('img', values.img);
            }

            if (values.video instanceof File) {
                formData.append('video', values.video);
            }

            formData.append('itinerary', JSON.stringify(values.itinerary));
            formData.append('policy', values.policy);

            let response = null;
            let data = null;
            if (isEditMode) {
                const id = initialValues?._id || eventId;
                response = await fetch(`/api/event/${id}`, {
                    method: 'PATCH',
                    body: formData,
                });
                data = await response.json();
            } else {
                response = await fetch('/api/event', {
                    method: 'POST',
                    body: formData,
                });
                data = await response.json();
            }

            if (response?.status === 200 || response?.status === 201) {
                localStorage.removeItem(storageKey);
                resetForm({ values: defaultValues });
                setTicketFields([{ type: '', price: '', availableSlots: false, startDate: '', endDate: '' }]);
                setItineraryFields([{ day: '', title: '', description: '' }]);
                setFaqFields([{ question: '', answer: '' }]);
                setGuidelineFields([{ title: '', content: '' }]);
                setInclusionFields(['']);
                setExclusionFields(['']);
                setSubcategories([]);
                setSubcategoryError(null);
                showToast('Event saved successfully!', 'success');
                router.push('/admin/events');
            } else {
                throw new Error(data?.message || `Request failed with status ${response?.status}`);
            }
        } catch (error) {
            showToast(`Error submitting form: ${error.message}`, 'error');
            console.error(error);
        } finally {
            clearTimeout(timeoutId);
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg max-w-5xl mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">{isEditMode ? 'Edit Event' : 'Create New Event'}</h2>
            <Formik
                initialValues={initialValuesState}
                // validationSchema={eventSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values, setFieldValue, isSubmitting, errors, touched }) => {
                    // Fetch subcategories when category changes
                    useEffect(() => {
                        let mounted = true;
                        const fetchSubcategories = async () => {
                            if (values.category) {
                                setSubcategoryLoading(true);
                                setSubcategories([]);
                                setSubcategoryError(null);
                                try {
                                    const response = await apiRequest(`/api/category/${values.category}`, 'GET');
                                    if (mounted && response?.categories?.subCategories) {
                                        setSubcategories(response.categories.subCategories);
                                    } else if (mounted) {
                                        setSubcategoryError('Failed to load subcategories');
                                    }
                                } catch (error) {
                                    if (mounted) {
                                        setSubcategoryError('Error fetching subcategories');
                                        console.error(error);
                                    }
                                } finally {
                                    if (mounted) {
                                        setSubcategoryLoading(false);
                                    }
                                }
                            }
                        };
                        fetchSubcategories();
                        return () => {
                            mounted = false;
                        };
                    }, [values.category]);

                    return (
                        <Form className="space-y-6">
                            <Suspense fallback={<div>Loading tabs...</div>}>
                                <Tabs>
                                    <TabList className="flex flex-wrap gap-2 border-b mb-4">
                                        {['Basic Info', 'Itinerary', 'Inclusions/Exclusions', 'Tickets & Price', 'Documents', 'Guidelines', 'Policy', 'FAQs'].map((tab) => (
                                            <Tab
                                                key={tab}
                                                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-t-md hover:bg-gray-100 cursor-pointer focus:outline-none focus:bg-blue-100 focus:text-blue-600"
                                            >
                                                {tab}
                                            </Tab>
                                        ))}
                                    </TabList>

                                    <TabPanel>
                                        <BasicInfoTab
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            errors={errors}
                                            touched={touched}
                                            categories={categories}
                                            categoryLoading={categoryLoading}
                                            categoryError={categoryError}
                                            subcategories={subcategories}
                                            subcategoryLoading={subcategoryLoading}
                                            subcategoryError={subcategoryError}
                                            isSubmitting={isSubmitting}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <ItineraryTab
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            itineraryFields={itineraryFields}
                                            setItineraryFields={setItineraryFields}
                                            isSubmitting={isSubmitting}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <InclusionsExclusionsTab
                                            inclusionFields={inclusionFields}
                                            setInclusionFields={setInclusionFields}
                                            exclusionFields={exclusionFields}
                                            setExclusionFields={setExclusionFields}
                                            isSubmitting={isSubmitting}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <TicketsTab
                                            ticketFields={ticketFields}
                                            setTicketFields={setTicketFields}
                                            isSubmitting={isSubmitting}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <DocumentsTab setFieldValue={setFieldValue} />
                                    </TabPanel>
                                    <TabPanel>
                                        <GuidelinesTab
                                            values={values}
                                            guidelineFields={guidelineFields}
                                            setGuidelineFields={setGuidelineFields}
                                            setFieldValue={setFieldValue}
                                            isSubmitting={isSubmitting}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <PolicyTab values={values} setFieldValue={setFieldValue} />
                                    </TabPanel>
                                    <TabPanel>
                                        <FAQsTab
                                            faqFields={faqFields}
                                            setFaqFields={setFaqFields}
                                            isSubmitting={isSubmitting}
                                        />
                                    </TabPanel>
                                </Tabs>
                            </Suspense>

                            <div className="flex justify-end space-x-4">
                                {!isEditMode && (
                                    <button
                                        type="button"
                                        onClick={() => handleManualSave(values)}
                                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                                        disabled={isSubmitting}
                                    >
                                        Save Draft
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={onCancel || onClose}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : isEditMode ? 'Update Event' : 'Create Event'}
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default EventForm;