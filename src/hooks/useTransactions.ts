import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Transaction, TransactionFormData } from '../types';
import { useAuth } from './useAuth';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch transactions from Supabase
  const fetchTransactions = async () => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedTransactions: Transaction[] = data.map(item => ({
        id: item.id,
        type: item.type,
        amount: Number(item.amount),
        category: item.category,
        description: item.description,
        date: item.date,
        createdAt: item.created_at,
      }));

      setTransactions(formattedTransactions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new transaction
  const addTransaction = async (formData: TransactionFormData) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: formData.type,
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date,
        })
        .select()
        .single();

      if (error) throw error;

      const newTransaction: Transaction = {
        id: data.id,
        type: data.type,
        amount: Number(data.amount),
        category: data.category,
        description: data.description,
        date: data.date,
        createdAt: data.created_at,
      };

      setTransactions(prev => [newTransaction, ...prev]);
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add transaction';
      setError(errorMessage);
      console.error('Error adding transaction:', err);
      return { success: false, error: errorMessage };
    }
  };

  // Delete transaction
  const deleteTransaction = async (id: string) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTransactions(prev => prev.filter(t => t.id !== id));
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete transaction';
      setError(errorMessage);
      console.error('Error deleting transaction:', err);
      return { success: false, error: errorMessage };
    }
  };

  // Fetch transactions when user changes
  useEffect(() => {
    fetchTransactions();
  }, [user]);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    refetch: fetchTransactions,
  };
};