import React from 'react';
import { Phone, Dog, Cat, Image as ImageIcon, Heart } from 'lucide-react';

export default function AnimalCard({ animal }) {
  const isAdopted = animal.status === 'adotado';

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group relative">
      
      {/* Imagem do Animal */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        {animal.imageUrl ? (
          <img 
            src={animal.imageUrl} 
            alt={animal.name} 
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isAdopted ? 'grayscale opacity-80' : ''}`} 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-100">
            <ImageIcon className="w-12 h-12 mb-2" />
            <span className="text-xs">Sem foto</span>
          </div>
        )}

        {/* Badge de Status */}
        <div className="absolute top-4 left-4">
          {isAdopted ? (
            <span className="bg-gray-800/90 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 backdrop-blur-sm">
              🏠 Já Adotado
            </span>
          ) : (
            <span className="bg-white/90 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 backdrop-blur-sm">
              ✨ Disponível
            </span>
          )}
        </div>
      </div>
      
      {/* Informações */}
      <div className="p-5 flex-grow flex flex-col relative">
        <div className="absolute -top-6 right-6 bg-white p-3 rounded-full shadow-md border border-gray-100">
          {animal.type === 'cachorro' ? (
            <Dog className="text-teal-600 w-6 h-6" />
          ) : (
            <Cat className="text-purple-500 w-6 h-6" />
          )}
        </div>

        <div className="mt-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{animal.name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
            <span className="font-medium text-gray-700">{animal.breed || 'SRD'}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{animal.age}</span>
          </p>
        </div>
        
        <div className="bg-teal-50/50 p-3 rounded-lg mb-6 border border-teal-100/50">
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed italic">
            "{animal.description}"
          </p>
        </div>
        
        {/* Botão de Ação */}
        {!isAdopted ? (
          <a 
            href={`https://wa.me/?text=Olá, vi o ${animal.name} no Adota-Pet e tenho interesse em adotá-lo!`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-bold shadow-green-200 shadow-lg hover:-translate-y-1"
          >
            <Phone className="w-5 h-5" />
            Quero Adotar
          </a>
        ) : (
          <button disabled className="mt-auto w-full bg-gray-100 text-gray-400 py-3 rounded-xl cursor-not-allowed font-medium border border-gray-200 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 fill-gray-400" />
            Encontrou um lar
          </button>
        )}
      </div>
    </div>
  );
}