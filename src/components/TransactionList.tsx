import React, { useState } from 'react';
import { Transaction, FilterOptions, SortOptions } from '../types';
import { Filter, ArrowUpDown, Trash2, Calendar, Tag, FileText } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    category: '',
    dateRange: { start: '', end: '' }
  });

  const [sort, setSort] = useState<SortOptions>({
    field: 'date',
    order: 'desc'
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.type !== 'all' && transaction.type !== filters.type) return false;
    if (filters.dateRange.start && transaction.date < filters.dateRange.start) return false;
    if (filters.dateRange.end && transaction.date > filters.dateRange.end) return false;
    return true;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue = a[sort.field];
    let bValue = b[sort.field];

    if (sort.field === 'amount') {
      aValue = a.amount;
      bValue = b.amount;
    }

    if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;
    return 0;
  });


  const toggleSort = (field: SortOptions['field']) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="bg-slate-100 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Transaction History</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-3 sm:px-4 py-2 bg-slate-200 rounded-lg shadow-[2px_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[1px_1px_4px_rgba(0,0,0,0.2)] transition-all duration-200"
        >
          <Filter className="w-4 h-4 mr-2 text-slate-600" />
          <span className="text-sm font-medium text-slate-600 hidden sm:inline">Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 p-6 bg-slate-50 rounded-xl shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1)]">
          {/* --- MODIFIED CODE BLOCK STARTS HERE --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value as FilterOptions['type'] })}
                className="w-full px-3 py-2 bg-slate-200 border-none rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
              <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, start: e.target.value }
                  })}
                  className="w-full sm:flex-1 px-3 py-2 bg-slate-200 border-none rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: { ...filters.dateRange, end: e.target.value }
                  })}
                  className="w-full sm:flex-1 px-3 py-2 bg-slate-200 border-none rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
                />
              </div>
            </div>
          </div>
          {/* --- MODIFIED CODE BLOCK ENDS HERE --- */}
        </div>
      )}

      <div className="hidden sm:flex mb-4 p-4 bg-slate-50 rounded-xl shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <button
            onClick={() => toggleSort('date')}
            className="flex items-center px-3 py-1 bg-slate-200 rounded-lg shadow-[1px_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_6px_rgba(0,0,0,0.2)] transition-all duration-200"
          >
            <Calendar className="w-4 h-4 mr-1 text-slate-600" />
            <span className="text-sm font-medium text-slate-600">Date</span>
            <ArrowUpDown className="w-3 h-3 ml-1 text-slate-600" />
          </button>
          <button
            onClick={() => toggleSort('amount')}
            className="flex items-center px-3 py-1 bg-slate-200 rounded-lg shadow-[1px_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_6px_rgba(0,0,0,0.2)] transition-all duration-200"
          >
            <span className="text-sm font-medium text-slate-600">Amount</span>
            <ArrowUpDown className="w-3 h-3 ml-1 text-slate-600" />
          </button>
          <button
            onClick={() => toggleSort('category')}
            className="flex items-center px-3 py-1 bg-slate-200 rounded-lg shadow-[1px_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_6px_rgba(0,0,0,0.2)] transition-all duration-200"
          >
            <Tag className="w-4 h-4 mr-1 text-slate-600" />
            <span className="text-sm font-medium text-slate-600">Category</span>
            <ArrowUpDown className="w-3 h-3 ml-1 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No transactions found</p>
          </div>
        ) : (
          sortedTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="bg-slate-50 rounded-xl p-3 sm:p-4 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1)] transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'income' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {transaction.type}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600">{transaction.category}</span>
                    <span className="text-xs sm:text-sm text-slate-500">{transaction.date}</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 font-medium">{transaction.description}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                  <span className={`text-base sm:text-lg font-bold ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 bg-rose-100 text-rose-600 rounded-lg shadow-[1px_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_6px_rgba(0,0,0,0.2)] hover:bg-rose-200 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;