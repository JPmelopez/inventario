import React, { useState } from 'react';
import { getData, deleteData } from '../utils/storage';
import SellerForm from './SellerForm';

const SellerList = () => {
  const [sellers, setSellers] = useState(getData('sellers'));
  const [editingSeller, setEditingSeller] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => {
    const updatedSellers = deleteData('sellers', id);
    setSellers(updatedSellers);
  };

  const handleSave = () => {
    setSellers(getData('sellers'));
    setShowForm(false);
    setEditingSeller(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vendedores</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Agregar Vendedor
        </button>
      </div>

      {showForm && (
        <SellerForm
          seller={editingSeller}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingSeller(null);
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{seller.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingSeller(seller);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(seller.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerList;