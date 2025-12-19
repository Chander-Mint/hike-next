'use client';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import CommonTable from '@/src/app/admin/components/CommonTable';
import { apiRequest } from '../utils/api';

export default function QueryScreen() {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const columns = [
    { label: 'Name', accessor: 'name' },
    { label: 'Email', accessor: 'email' },
    { label: 'Phone', accessor: 'phoneNumber' },
    {
      label: 'Message',
      accessor: 'message',
      render: (message) => (
        <div className="max-w-xs truncate" title={message}>
          {message}
        </div>
      )
    },

    {
      label: 'Actions',
      accessor: 'id',
      render: (id) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            const query = queries.find(q => q.id === id);
            if (query) {
              alert(`Query Details:\nName: ${query.name}\nEmail: ${query.email}\nPhone: ${query.phoneNumber}\n\nMessage: ${query.message}`);
            }
          }}
          className="text-blue-600 hover:text-blue-900 p-1"
          title="View Details"
        >
          <Icon icon="mdi:eye" width="18" height="18" />
        </button>
      )
    }
  ];

  const fetchQueries = async (page) => {
    setIsLoading(true);
    try {
      const response = await apiRequest(`/api/query?page=${page}&limit=${pageSize}`, 'GET');
      const { data, pagination } = response

      const formattedQueries = data.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        phoneNumber: item.phoneNumber,
        message: item.message,
      }));

      setQueries(formattedQueries);
      setFilteredQueries(formattedQueries);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredQueries(queries);
    } else {
      const filtered = queries.filter((query) =>
        Object.values(query).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredQueries(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, queries]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-gray-600">
            <Icon icon="mdi:loading" width="24" height="24" className="animate-spin" />
            <span>Loading queries...</span>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Customer Queries</h1>
      </div>

      {/* <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon icon="mdi:magnify" className="text-gray-400" width="20" height="20" />
          </div>
          <input
            type="text"
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
      </div> */}

      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md border border-red-200 flex items-center">
          <Icon icon="mdi:alert-circle" width="24" height="24" className="mr-2" />
          {error}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <CommonTable
              columns={columns}
              data={filteredQueries}
              onRowClick={(query) => {
                alert(`Query Details:\nName: ${query.name}\nEmail: ${query.email}\nPhone: ${query.phoneNumber}\n\nMessage: ${query.message}`);
              }}
              rowClassName="hover:bg-gray-50 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}