import React, { useState } from 'react';
import { TransactionFormData } from '../types';
import { incomeCategories, expenseCategories } from '../utils/categories';
import { Plus, IndianRupee } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.description) {
      onSubmit(formData);
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="bg-slate-100 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]">
      <div className="flex items-center mb-6">
        <div className="bg-slate-200 rounded-full p-3 mr-4 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
          <Plus className="w-6 h-6 text-slate-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Add Transaction</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Transaction Type
            </label>
            <div className="flex rounded-xl overflow-hidden shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                  formData.type === 'income'
                    ? 'bg-emerald-500 text-white shadow-[2px_2px_6px_rgba(0,0,0,0.2)]'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                  formData.type === 'expense'
                    ? 'bg-rose-500 text-white shadow-[2px_2px_6px_rgba(0,0,0,0.2)]'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-200 border-none rounded-xl shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-slate-200 border-none rounded-xl shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-slate-200 border-none rounded-xl shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-slate-200 border-none rounded-xl shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
            placeholder="Enter transaction description"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-blue-500 text-white rounded-xl font-medium shadow-[3px_3px_10px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] active:shadow-[1px_1px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;