import React from 'react';
import { Field, ErrorMessage } from 'formik';

const TicketsTab = ({ ticketFields, setTicketFields, isSubmitting }) => {
    const addTicketField = () => {
        setTicketFields([...ticketFields, { type: '', price: '', availableSlots: false, startDate: '', endDate: '' }]);
    };

    const removeTicketField = (index) => {
        setTicketFields(ticketFields.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Tickets</label>
            {ticketFields.map((_, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 border p-4 rounded-md">
                    <div>
                        <Field
                            type="number"
                            name={`tickets[${index}].price`}
                            placeholder="Price (e.g., 100)"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            min="0"
                        />
                        <ErrorMessage name={`tickets[${index}].price`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <div>
                        <Field
                            type="date"
                            name={`tickets[${index}].startDate`}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <ErrorMessage name={`tickets[${index}].startDate`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <div>
                        <Field
                            type="date"
                            name={`tickets[${index}].endDate`}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <ErrorMessage name={`tickets[${index}].endDate`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <div>
                        <Field
                            as="select"
                            name={`tickets[${index}].status`}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="Sold Out">Booked</option>
                        </Field>
                        <ErrorMessage name={`tickets[${index}].status`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-sm text-gray-700">
                            <Field
                                type="checkbox"
                                name={`tickets[${index}].availableSlots`}
                                className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            Slots Available
                        </label>
                        <button
                            type="button"
                            onClick={() => removeTicketField(index)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:bg-red-300"
                            disabled={ticketFields.length === 1 || isSubmitting}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={addTicketField}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:bg-green-300"
                disabled={isSubmitting}
            >
                Add Ticket
            </button>
        </div>
    );
};

export default TicketsTab;