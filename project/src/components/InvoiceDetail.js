import React from 'react';
import { getData } from '../utils/storage';

const InvoiceDetail = ({ invoiceId }) => {
  const invoice = getData('invoices').find(i => i.id === invoiceId);
  const seller = invoice ? getData('sellers').find(s => s.id === invoice.sellerId) : null;
  const details = invoice ? invoice.details : [];

  if (!invoice) {
    return <div className="p-4 text-red-500">Factura no encontrada</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalle de Factura #{invoice.id}</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Información de la Factura</h3>
              <p><span className="font-medium">Fecha:</span> {invoice.date}</p>
              <p><span className="font-medium">Total:</span> ${invoice.total.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Información del Vendedor</h3>
              {seller ? (
                <>
                  <p><span className="font-medium">Nombre:</span> {seller.name}</p>
                  <p><span className="font-medium">Email:</span> {seller.email}</p>
                  <p><span className="font-medium">Teléfono:</span> {seller.phone}</p>
                </>
              ) : (
                <p>Vendedor no encontrado</p>
              )}
            </div>
          </div>

          <h3 className="text-lg font-medium mb-2">Productos</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {details.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right font-medium">Total:</td>
                <td className="px-6 py-4 font-medium">${invoice.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;