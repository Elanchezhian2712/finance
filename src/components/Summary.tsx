import React from 'react';
import { Transaction } from '../types';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { MdCurrencyRupee } from 'react-icons/md';

interface SummaryProps {
  transactions: Transaction[];
}

const Summary: React.FC<SummaryProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const currentMonth = new Date().toISOString().slice(0, 7);
  const thisMonthTransactions = transactions.filter(t => 
    t.date.startsWith(currentMonth)
  );

  const monthlyIncome = thisMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div className="bg-slate-100 rounded-2xl p-6 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-slate-200 rounded-full p-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
            <MdCurrencyRupee className="w-6 h-6 text-slate-600" />
          </div>
          <span className="text-sm font-medium text-slate-600">Total Balance</span>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-slate-800">
          ₹{balance.toFixed(2)}
        </div>
        {/* <div className={`text-sm ${balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {balance >= 0 ? 'Positive' : 'Negative'} Balance
        </div> */}
      </div>

      <div className="bg-slate-100 rounded-2xl p-6 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-slate-200 rounded-full p-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-sm font-medium text-slate-600">Total Income</span>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-slate-800">
          ₹{totalIncome.toFixed(2)}
        </div>
        <div className="text-sm text-slate-600">
          {/* This month: ₹{monthlyIncome.toFixed(2)} */}
        </div>
      </div>

      <div className="bg-slate-100 rounded-2xl p-6 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-slate-200 rounded-full p-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
            <TrendingDown className="w-6 h-6 text-rose-600" />
          </div>
          <span className="text-sm font-medium text-slate-600">Total Expenses</span>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-slate-800">
          ₹{totalExpenses.toFixed(2)}
        </div>
        <div className="text-sm text-slate-600">
          {/* This month: ₹{monthlyExpenses.toFixed(2)} */}
        </div>
      </div>

      <div className="bg-slate-100 rounded-2xl p-6 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-slate-200 rounded-full p-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
            <PieChart className="w-6 h-6 text-slate-600" />
          </div>
          <span className="text-sm font-medium text-slate-600">Transactions</span>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-slate-800">
          {transactions.length}
        </div>
        <div className="text-sm text-slate-600">
          {/* This month: {thisMonthTransactions.length} */}
        </div>
      </div>
    </div>
  );
};

export default Summary;