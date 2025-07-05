import React from 'react';

const ProductCard = ({ product, isAuthorized, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col sm:flex-row sm:items-center gap-4 max-w-full sm:max-w-3xl mx-auto w-full max-h-64 relative">
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full sm:w-48 h-48 object-cover rounded-lg flex-shrink-0"
        />
      ) : (
        <div className="w-full sm:w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
          No Image
        </div>
      )}
      <div className="flex flex-col flex-grow w-full">
        <h3 className="text-xl font-semibold truncate">{product.name}</h3>
        <p className="text-gray-700 mt-2 text-lg font-medium">₹{product.price}</p>
        <p className="text-sm text-gray-500 mt-1 truncate">Added by {product.added_by_username || product.added_by_email}</p>
        {isAuthorized && (
          <div className="absolute top-2 right-2 flex space-x-4 z-10">
            <button
              onClick={() => onEdit(product)}
              className="text-green-600 hover:text-green-800 font-semibold"
              aria-label="Edit product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 010 2.828l-9.193 9.193a1 1 0 01-.464.263l-4 1a1 1 0 01-1.263-1.263l1-4a1 1 0 01.263-.464l9.193-9.193a2 2 0 012.828 0z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="text-red-600 hover:text-red-800 font-semibold"
              aria-label="Delete product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
