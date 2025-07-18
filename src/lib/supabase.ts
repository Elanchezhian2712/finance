import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.F_VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.F_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'income' | 'expense';
          amount: number;
          category: string;
          description: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'income' | 'expense';
          amount: number;
          category: string;
          description: string;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'income' | 'expense';
          amount?: number;
          category?: string;
          description?: string;
          date?: string;
          created_at?: string;
        };
      };
    };
  };
}