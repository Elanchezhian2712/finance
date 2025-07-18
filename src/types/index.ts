export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface TransactionFormData {
  type: 'income' | 'expense';
  amount: string;
  category: string;
  description: string;
  date: string;
}

export interface FilterOptions {
  type: 'all' | 'income' | 'expense';
  category: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface SortOptions {
  field: 'date' | 'amount' | 'category';
  order: 'asc' | 'desc';
}