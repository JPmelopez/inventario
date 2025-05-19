import React, { useState, useEffect } from 'react';
import { getData, saveData, updateData } from '../utils/storage';

const InvoiceForm = ({ invoice, onSave, onCancel }) => {
  const [formData, setFormData] = useState(invoice || { 
    sellerId: '', 
    date: new Date().toISOString().split('T')[0], 
    details: [],
    total: 0
  });
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSellers(getData('sellers'));
    setProducts(getData('products'));
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0) return;
    
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (!product) return;

    const newDetail = {
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: parseInt(quantity),
      subtotal: parseFloat(product.price) * parseInt(quantity)
    };

    const updatedDetails = [...formData.details, newDetail];
    const total = updatedDetails.reduce((sum, item) => sum + item.subtotal, 0);
    
    setFormData({
      ...formData,
      details: updatedDetails,
      total: total
    });

    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleRemoveProduct = (index) => {
    const newDetails = [...formData.details];
    newDetails.splice(index, 1);
    const total = newDetails.reduce((sum, item) => sum + item.subtotal, 0);
    setFormData({ ...formData, details: newDetails, total: total });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.sellerId || formData.details.length === 0) {
      alert('Por favor complete todos los campos requeridos y agregue al menos un producto');
      return;
    }

    const invoiceData = {
      ...formData,
      sellerId: parseInt(formData.sellerId),
      date: formData.date || new Date().toISOString().split('T')[0],
      total: formData.details.reduce((sum, item) => sum + item.subtotal, 0)
    };

    if (invoice) {
      updateData('invoices', invoice.id, invoiceData);
    } else {
      const newInvoice = { ...invoiceData, id: Date.now() };
      const invoices = getData('invoices');
      saveData('invoices', [...invoices, newInvoice]);
    }
    
    onSave();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{invoice ? 'Editar' : 'Agregar'} Factura</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Vendedor *</label>
          <select
            name="sellerId"
            value={formData.sellerId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar Vendedor</option>
            {sellers.map(seller => (
              <option key={seller.id} value={seller.id}>{seller.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Fecha *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6 border-t pt-4">
          <h3 className="text-lg font-medium mb-3">Productos *</h3>
          <div className="flex space-x-2 mb-3">
            <select
              value={selectedProduct || ''}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="flex-1 p-2 border rounded"
            >
              <option value="">Seleccionar Producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${Number(product.price).toFixed(2)}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-20 p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Agregar
            </button>
          </div>

          {formData.details.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Producto</th>
                    <th className="text-left py-2">Precio</th>
                    <th className="text-left py-2">Cantidad</th>
                    <th className="text-left py-2">Subtotal</th>
                    <th className="text-left py-2">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.details.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2">${Number(item.price).toFixed(2)}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">${Number(item.subtotal).toFixed(2)}</td>
                      <td className="py-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-right font-medium pt-2">Total:</td>
                    <td className="font-medium pt-2">
                      ${Number(formData.total).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar Factura
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;

// DONE