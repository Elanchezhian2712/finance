import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogIn, UserPlus, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setError(error.message);
      } else if (isSignUp) {
        setError(null);
        // For sign up, show success message
        alert('Account created successfully! You can now sign in.');
        setIsSignUp(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-100 rounded-2xl p-8 shadow-[inset_3px_3px_10px_rgba(0,0,0,0.1),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]">
          <div className="text-center mb-8">
            <div className="bg-slate-200 rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
              {isSignUp ? (
                <UserPlus className="w-8 h-8 text-slate-600" />
              ) : (
                <LogIn className="w-8 h-8 text-slate-600" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-600">
              {isSignUp 
                ? 'Sign up to start tracking your finances' 
                : 'Sign in to access your finance tracker'
              }
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-100 border border-rose-200 rounded-xl text-rose-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-200 border-none rounded-xl shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-200 border-none rounded-xl shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-slate-800"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-blue-500 text-white rounded-xl font-medium shadow-[3px_3px_10px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] active:shadow-[1px_1px_4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {/* <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Auth;