import React from 'react';

const getNestedValue = (obj, path) => {
    try {
        return path.split('.').reduce((acc, key) => acc && acc[key], obj) ?? '-';
    } catch {
        return '-';
    }
};

export default function CommonTable({ columns, data, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {columns?.map((col) => (
                            <th key={col?.accessor} className="px-6 py-2 text-left font-semibold text-gray-700">
                                {col?.label}
                            </th>
                        ))}
                        {(onEdit || onDelete) && <th className="px-6 py-3">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data?.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns?.length + (onEdit || onDelete ? 1 : 0)}
                                className="px-6 py-4 text-center text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data?.map((row, idx) => (
                            <tr key={row?._id || idx}>
                                {columns?.map((col) => (
                                    <td
                                        key={col?.accessor}
                                        className="px-6 py-4 whitespace-nowrap"
                                    >
                                        {col?.render
                                            ? col.render(getNestedValue(row, col?.accessor))
                                            : getNestedValue(row, col?.accessor)}
                                    </td>
                                ))}
                                {(onEdit || onDelete) && (
                                    <td className="px-6 py-4 space-x-2">
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(row)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(row)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}