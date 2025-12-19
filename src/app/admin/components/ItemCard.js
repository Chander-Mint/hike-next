'use client';

import { Icon } from "@iconify/react";

const ItemCard = ({
  title,
  imageUrl,
  onEdit,
  onDelete,
  subcategories = [],
  onAddSubcategory,
  onViewSubcategories
}) => {

  const resolvedImageUrl = imageUrl

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        <img
          src={resolvedImageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        {subcategories.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-600">Subcategories ({subcategories.length})</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {subcategories.map((subcat, index) => (
                <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  {subcat.title}
                </span>
              ))}
            </div>

          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={onViewSubcategories}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              View Subcategories
            </button>
            <button
              onClick={onAddSubcategory}
              className="px-3 py-1 text-sm text-green-600 hover:text-green-800"
            >
              Add Subcategory
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:text-blue-800"
              title="Edit"
            >
              <Icon icon="mdi:pencil" className="text-lg" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-800"
              title="Delete"
            >
              <Icon icon="mdi:delete" className="text-lg" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
