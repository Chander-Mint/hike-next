'use client';
import { useState } from 'react';

export default function Treks() {
  const [treks, setTreks] = useState([
    {
      id: 1,
      title: 'Triund Trek',
      difficulty: 'Moderate',
      duration: '1 Day',
      price: 1499,
      status: 'active'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-bold">Treks</h1> */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Trek
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treks.map((trek) => (
          <div key={trek.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200">
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{trek.title}</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Difficulty: {trek.difficulty}</p>
                <p className="text-gray-600">Duration: {trek.duration}</p>
                <p className="text-gray-600">Price: ₹{trek.price}</p>
                <p className="text-gray-600">Status:
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${trek.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {trek.status}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-blue-600 hover:text-blue-900">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}