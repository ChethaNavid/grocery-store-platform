import React from 'react'
import { Pencil, Trash2 } from 'lucide-react';

const CustomerTable = ({ users, onEdit, onDelete }) => {
  
  return (
    <div className="overflow-x-auto rounded shadow-md">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="text-primary border-b">
          <tr>
            {["ID", "USERNAME", "PHONE NUMBER", "EMAIL", "CREATED AT", "UPDATED AT"].map((header) => (
              <th key={header} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {users?.map((items) => {
                return (
                  <tr key={items.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{items.id}</td>
                      <td className="px-4 py-2">{items.username}</td>
                      <td className="px-4 py-2">{items.phoneNumber}</td>
                      <td className="px-4 py-2">{items.email}</td>
                      <td className="px-4 py-2">{new Date(items.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2">{new Date(items.updatedAt).toLocaleString()}</td>
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

export default CustomerTable