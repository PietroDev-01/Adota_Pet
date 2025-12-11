import React from 'react';
import { Heart, LogOut } from 'lucide-react';

export default function Navbar({ onViewChange, isAdmin, onLogout }) {
  return (
    <nav className="bg-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition" 
          onClick={() => onViewChange('gallery')}
        >
          <div className="bg-white p-1 rounded-full">
             <Heart className="w-6 h-6 text-teal-600 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight">Adota-Pet</span>
        </div>
        
        {/* Botão de Login/Logout */}
        <div>
          {isAdmin ? (
            <button 
              onClick={onLogout}
              className="flex items-center space-x-1 bg-teal-800 hover:bg-teal-900 px-3 py-1.5 rounded text-sm transition"
            >
              <LogOut className="w-4 h-4" /> <span>Sair Admin</span>
            </button>
          ) : (
            <button 
              onClick={() => onViewChange('adminLogin')}
              className="text-teal-100 hover:text-white text-sm font-medium hover:underline transition"
            >
              Área do Protetor
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}