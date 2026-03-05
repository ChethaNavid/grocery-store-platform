import { useState } from 'react'
import { MdClose } from 'react-icons/md'

export default function AddToCartModal({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1)
  const subtotal = (product.price * qty).toFixed(2)
  const maxStock = product.quantity || 0

  const handleIncrement = () => {
    if (qty < maxStock) {
      setQty(q => q + 1)
    }
  }

  const handleDecrement = () => {
    setQty(q => Math.max(1, q - 1))
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add to Cart</h2>
          <MdClose onClick={onClose} className="text-gray-500 hover:text-black"/>
        </div>

        {/* Product Info */}
        <div className="flex space-x-4 mb-6">
          <img src={product.imageUrl} alt={product.name}
               className="w-30 h-28 object-cover rounded" />
          <div>
            <p className="text-sm text-primary font-medium">{product.category}</p>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.description}</p>
            <p className="mt-2 text-xl font-semibold">${product.price.toFixed(2)}</p>
            {maxStock > 0 && maxStock <= 10 && (
              <p className="text-xs text-orange-600 mt-1">Only {maxStock} left in stock!</p>
            )}
            {maxStock === 0 && (
              <p className="text-xs text-red-600 mt-1">Out of stock</p>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Quantity (Available: {maxStock})</label>
          <div className="inline-flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={qty <= 1}
            >–</button>
            <span className="w-8 text-center">{qty}</span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={qty >= maxStock}
            >+</button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 mb-6 text-sm text-gray-700">
          <div className="flex justify-between mb-1">
            <span>Subtotal:</span><span>${subtotal}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Delivery:</span><span className="text-primary">Free</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span><span>${subtotal}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded text-center hover:bg-[#f5f5f5]"
          >
            Cancel
          </button>
          <button
            onClick={() => onAdd(qty)}
            className="flex-1 primary-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
