import React, { useState } from 'react';
import SellerList from './SellerList';
import ProductList from './ProductList';
import InvoiceList from './InvoiceList';
import InvoiceDetail from './InvoiceDetail';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('sellers');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleViewInvoice = (invoiceId) => {
    setSelectedInvoice(invoiceId);
    setActiveTab('invoiceDetail');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">SalesMaster</h1>
        </div>
        <nav className="p-2">
          <button
            onClick={() => {
              setActiveTab('sellers');
              setSelectedInvoice(null);
            }}
            className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeTab === 'sellers' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Vendedores
          </button>
          <button
            onClick={() => {
              setActiveTab('products');
              setSelectedInvoice(null);
            }}
            className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeTab === 'products' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Productos
          </button>
          <button
            onClick={() => {
              setActiveTab('invoices');
              setSelectedInvoice(null);
            }}
            className={`w-full text-left px-4 py-2 rounded-md mb-1 ${activeTab === 'invoices' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Facturas
          </button>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'sellers' && <SellerList />}
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'invoices' && <InvoiceList onViewInvoice={handleViewInvoice} />}
        {activeTab === 'invoiceDetail' && <InvoiceDetail invoiceId={selectedInvoice} />}
      </div>
    </div>
  );
};

export default Dashboard;