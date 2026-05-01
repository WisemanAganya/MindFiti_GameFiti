import React, { useState } from 'react';
import { api } from '../../services/apiService';
import { User } from '../../types';

interface LoginFormProps {
    onLogin: (token: string, user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        try {
            // Validate inputs
            if (!email.trim()) throw new Error('Email is required.');
            if (!password.trim()) throw new Error('Password is required.');
            if (!isLogin && !fullName.trim()) throw new Error('Full Name is required.');

            if (isLogin) {
                const { token, user } = await api.login({ email, password });
                onLogin(token, user);
            } else {
                const { token, user } = await api.signup({ email, password, fullName });
                onLogin(token, user);
                // Note: If email confirmation is required, this might catch an error or return null session
            }
        } catch (err: any) {
            const errorMessage = err.message || (isLogin ? 'Login failed.' : 'Signup failed.');
            if (errorMessage.includes('Signup successful')) {
                setSuccessMessage(errorMessage);
                setIsLogin(true); // Switch to login
            } else {
                setError(errorMessage);
            }
            console.error('Auth error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 font-montserrat">{isLogin ? 'Admin Access' : 'Create Account'}</h2>
                <p className="mt-2 text-sm text-gray-600">{isLogin ? 'Enter your credentials to access the dashboard' : 'Sign up to get started'}</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label htmlFor="fullName" className="text-sm font-semibold text-gray-700 block mb-1">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            disabled={isLoading}
                            className="w-full px-4 py-2 text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition"
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={isLoading}
                        className="w-full px-4 py-2 text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-semibold text-gray-700 block mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        disabled={isLoading}
                        className="w-full px-4 py-2 text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition"
                    />
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                        <i className="fas fa-exclamation-circle mt-0.5"></i><span>{error}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="p-3 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-2">
                        <i className="fas fa-check-circle mt-0.5"></i><span>{successMessage}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-primary hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'}`}></i>}
                    <span>{isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}</span>
                </button>
            </form>

            <div className="text-center pt-2">
                <button
                    type="button"
                    onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMessage(''); }}
                    className="text-sm text-primary hover:underline font-medium"
                >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                    This is a protected area. Only authorized administrators can access.
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
