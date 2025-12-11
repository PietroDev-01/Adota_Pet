import React, { useState } from 'react';
import { Search, Dog, Cat } from 'lucide-react';
import AnimalCard from '../components/AnimalCard';

export default function Home({ animals, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');

  // Lógica de Filtro
  const filteredAnimals = animals.filter(animal => {
    const matchesType = filterType === 'todos' || animal.type === filterType;
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          animal.breed?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-gradient-to-b from-teal-50 to-white py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Encontre seu novo melhor amigo
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Adotar é um ato de amor. Navegue pelos animais disponíveis na nossa região.
        </p>
        
        {/* Barra de Busca e Filtros */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center border border-gray-100">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar nome ou raça..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto justify-center bg-gray-50 p-1 rounded-lg">
            {['todos', 'cachorro', 'gato'].map(type => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize flex items-center gap-1 transition-all ${
                  filterType === type 
                    ? 'bg-white text-teal-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type === 'cachorro' && <Dog className="w-4 h-4" />}
                {type === 'gato' && <Cat className="w-4 h-4" />}
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Galeria */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-400 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            Carregando amigos...
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-xl text-gray-600 mb-2 font-medium">Nenhum pet encontrado.</p>
            <p className="text-sm text-gray-500">Tente ajustar seus filtros de busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
