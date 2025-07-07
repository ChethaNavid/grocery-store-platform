import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const AddEditProduct = ({ mode = 'add', product = {}, onClose, onSubmit }) => {
   const [formData, setFormData] = useState({
    name: '',
    categoryName: '',
    quantity: '',
    price: '',
    image: null,
    inStock: true,
  });

  useEffect(() => {
    if (mode === 'edit' && product) {
      setFormData({
        name: product.name || '',
        categoryName: product.Category?.name || '',
        quantity: product.quantity || '',
        price: product.price || '',
        image: null, // file input can’t be pre-filled
        description: product.description || '',
        inStock: product.inStock ?? true,
      });
    }
  }, [mode, product]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('categoryName', formData.categoryName);
    payload.append('quantity', formData.quantity);
    payload.append('price', formData.price);
    payload.append('description', formData.description);
    payload.append('inStock', formData.inStock);
    if (formData.image) payload.append('image', formData.image);

    if (mode === 'edit' && product.id) {
      payload.append('id', product.id);
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            {mode === 'edit' ? 'Edit Product' : 'Add Product'}
          </h2>
          <MdClose onClick={onClose} className="text-gray-500 hover:text-black"/>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4" encType="multipart/form-data">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="categoryName">Category</label>
            <select
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select a category</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Bakery">Bakery</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>

          { /* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="1"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Product description"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="image">
              Product Image {mode === 'edit' ? '(optional)' : '(required)'}
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              required={mode === 'add'}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border rounded-lg text-center hover:bg-[#f5f5f5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 primary-btn"
            >
              {mode === 'edit' ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditProduct

