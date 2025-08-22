import React from 'react'
import { Pencil, Trash2 } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {

  return (
    <div className="overflow-x-auto rounded shadow-md">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="text-primary border-b">
          <tr>
            {["IMAGE", "PRODUCT NAME", "CATEGORY", "QUANTITY", "PRICE", "STOCK"].map((header) => (
              <th key={header} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {products.map((items) => {
                return (
                  <tr key={items.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2"><img src={items.imageUrl} alt={items.productName} className="w-16 h-16 rounded" /></td>
                      <td className="px-4 py-2">{items.name}</td>
                      <td className="px-4 py-2">{items.Category?.name}</td>
                      <td className="px-4 py-2">{items.quantity}</td>
                      <td className="px-4 py-2">{`$${items.price}`}</td>
                      <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs 
                              ${items.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                              {items.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2 justify-around mt-6">
                          <button className="text-blue-600 hover:text-blue-800" onClick={() => onEdit(items)} >
                              <Pencil size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(items)}>
                              <Trash2 size={18} />
                          </button>
                      </td>
                  </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable