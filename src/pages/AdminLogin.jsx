import React, { useState } from 'react';
import { Dog, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLoginSuccess();
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dog className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Acesso Restrito</h2>
          <p className="text-gray-500 text-sm mt-1">Área exclusiva para administradores do abrigo.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="••••••"
            />
            {error && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
          </div>
          
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg">
            Acessar Painel
          </button>
          
          <button 
            type="button" 
            onClick={onCancel}
            className="w-full text-gray-500 text-sm py-2 hover:text-gray-800 transition"
          >
            Voltar para o site
          </button>
        </form>
      </div>
    </div>
  );
}