import React from 'react'

const OrderTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto rounded shadow-md">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="text-primary border-b">
          <tr>
            {["ID", "TOTAL AMOUNT", "TOTAL PRICE", "USER ID", "ORDER DATE"].map((header) => (
              <th key={header} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {orders?.map((items) => {
              return (
                <tr key={items.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{items.id}</td>
                  <td className="px-4 py-2">{items.totalAmount}</td>
                  <td className="px-4 py-2">{items.totalPrice}</td>
                  <td className="px-4 py-2">{items.userId}</td>
                  <td className="px-4 py-2">{new Date(items.orderDate).toLocaleString()}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable