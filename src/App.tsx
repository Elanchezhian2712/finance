import React, { useState, useEffect } from 'react';
import { TransactionFormData } from './types';
import { exportTransactions, printTransactions, exportToPDF } from './utils/storage';
import { useAuth } from './hooks/useAuth';
import { useTransactions } from './hooks/useTransactions';
import Auth from './components/Auth';
import Header from './components/Header';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FloatingActionButton from './components/FloatingActionButton';

function App() {
  const { user, loading: authLoading } = useAuth();
  const { 
    transactions, 
    loading: transactionsLoading, 
    error, 
    addTransaction, 
    deleteTransaction 
  } = useTransactions();

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if user is not logged in
  if (!user) {
    return <Auth />;
  }

  const handleAddTransaction = async (formData: TransactionFormData) => {
    const result = await addTransaction(formData);
    if (!result.success) {
      alert(`Error: ${result.error}`);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    const result = await deleteTransaction(id);
    if (!result.success) {
      alert(`Error: ${result.error}`);
    }
  };

  const handleExport = () => {
    exportTransactions(transactions);
  };

  const handlePrint = () => {
    printTransactions(transactions);
  };

  const handleExportPDF = () => {
    exportToPDF(transactions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-blue-50 p-3 sm:p-4 lg:p-6 xl:p-8">
      <div className="max-w-6xl mx-auto">
        <Header />

        {error && (
          <div className="mb-6 p-4 bg-rose-100 border border-rose-200 rounded-xl text-rose-700">
            <p className="font-medium">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {transactionsLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading transactions...</p>
          </div>
        ) : (
          <>
            <Summary transactions={transactions} />
          </>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          <div className="order-2 xl:order-1">
            <TransactionList 
              transactions={transactions} 
              onDelete={handleDeleteTransaction}
            />
          </div>
          
          <div className="order-1 xl:order-2">
            <TransactionForm onSubmit={handleAddTransaction} />
          </div>
        </div>

        <FloatingActionButton 
          onExport={handleExport}
          onPrint={handlePrint}
          onExportPDF={handleExportPDF}
        />
      </div>
    </div>
  );
}

export default App;