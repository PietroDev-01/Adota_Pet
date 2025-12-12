import React, { useState } from 'react';
import { PlusCircle, Upload, CheckCircle, Trash2, AlertCircle, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { AnimalService } from '../services/animalService';

export default function AdminDashboard({ animals }) {
  const [formData, setFormData] = useState({
    name: '', type: 'cachorro', breed: '', age: '', description: '', imageUrl: '', status: 'disponivel'
  });
  
  // Estados de controle e validação
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadMode, setUploadMode] = useState('file');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) { 
        alert("A imagem deve ter menos de 800KB para este MVP.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
        if (errors.imageUrl) setErrors({...errors, imageUrl: null});
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!formData.age.trim()) newErrors.age = "A idade é obrigatória.";
    if (!formData.description.trim()) newErrors.description = "A descrição é obrigatória.";
    else if (formData.description.length < 10) newErrors.description = "Descreva melhor (mín. 10 letras).";
    
    if (!formData.imageUrl) newErrors.imageUrl = "A foto é obrigatória.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await AnimalService.add(formData);
      setFormData({ name: '', type: 'cachorro', breed: '', age: '', description: '', imageUrl: '', status: 'disponivel' });
      setErrors({});
      alert('Animal cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar: ' + error.message);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza? Essa ação não pode ser desfeita.')) {
      await AnimalService.delete(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Painel do Protetor</h1>
        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
          {animals.length} animais cadastrados
        </span>
      </div>

      {/* --- Formulário de Cadastro --- */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-12">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="bg-teal-100 p-2 rounded-lg">
            <PlusCircle className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Cadastrar Novo Pet</h2>
            <p className="text-sm text-gray-500">Preencha as informações para adicionar à galeria.</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Coluna da Esquerda: Inputs */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">Nome do Pet</label>
              <input 
                type="text" 
                placeholder="Ex: Paçoca"
                className={`w-full p-3 border rounded-xl outline-none transition ${errors.name ? 'border-red-500 bg-red-50' : 'bg-gray-100 border-gray-200 focus:ring-2 focus:ring-teal-500'}`}
                value={formData.name} 
                onChange={e => {
                  setFormData({...formData, name: e.target.value});
                  if (errors.name) setErrors({...errors, name: null});
                }} 
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-1 block">Tipo</label>
                <div className="relative">
                  <select 
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-teal-500 outline-none transition" 
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="cachorro">🐶 Cachorro</option>
                    <option value="gato">🐱 Gato</option>
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none text-gray-500">▼</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 mb-1 block">Idade</label>
                <input 
                  type="text" 
                  placeholder="Ex: 2 anos" 
                  className={`w-full p-3 border rounded-xl outline-none transition ${errors.age ? 'border-red-500 bg-red-50' : 'bg-gray-100 border-gray-200 focus:ring-2 focus:ring-teal-500'}`}
                  value={formData.age} 
                  onChange={e => {
                    setFormData({...formData, age: e.target.value});
                    if (errors.age) setErrors({...errors, age: null});
                  }} 
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">Raça</label>
              <input 
                type="text" 
                placeholder="Ex: Vira-lata, Siamês..." 
                className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition" 
                value={formData.breed} 
                onChange={e => setFormData({...formData, breed: e.target.value})} 
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">História / Descrição</label>
              <textarea 
                placeholder="Conte um pouco sobre a personalidade dele..." 
                className={`w-full p-3 border rounded-xl h-32 resize-none outline-none transition ${errors.description ? 'border-red-500 bg-red-50' : 'bg-gray-100 border-gray-200 focus:ring-2 focus:ring-teal-500'}`}
                value={formData.description} 
                onChange={e => {
                  setFormData({...formData, description: e.target.value});
                  if (errors.description) setErrors({...errors, description: null});
                }}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Coluna da Direita: Upload (CORRIGIDO) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <label className="text-sm font-bold text-gray-700 mb-2 block">Foto do Pet</label>
            
            <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${uploadMode === 'file' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Upload className="w-4 h-4" /> Enviar Arquivo
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${uploadMode === 'url' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LinkIcon className="w-4 h-4" /> Usar Link
              </button>
            </div>

            <div className={`flex-grow bg-gray-100 border-2 border-dashed rounded-xl relative overflow-hidden group transition-colors min-h-[250px] ${errors.imageUrl ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-teal-400'}`}>
              
              {formData.imageUrl ? (
                <div className="absolute inset-0 z-10 bg-white">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, imageUrl: ''})}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                    title="Remover foto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                  {uploadMode === 'file' ? (
                    <>
                      <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                        <Upload className={`w-8 h-8 ${errors.imageUrl ? 'text-red-400' : 'text-teal-500'}`} />
                      </div>
                      <p className="text-sm font-medium text-gray-600">Clique para selecionar</p>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </>
                  ) : (
                    <>
                      <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                        <LinkIcon className={`w-8 h-8 ${errors.imageUrl ? 'text-red-400' : 'text-blue-500'}`} />
                      </div>
                      <input 
                        type="url" 
                        placeholder="Cole o link da imagem aqui..." 
                        className="w-full p-2 text-sm text-center bg-transparent border-b border-gray-300 focus:border-teal-500 outline-none text-gray-800 placeholder-gray-400"
                        value={formData.imageUrl} 
                        onChange={e => {
                          setFormData({...formData, imageUrl: e.target.value});
                          if (errors.imageUrl) setErrors({...errors, imageUrl: null});
                        }} 
                      />
                    </>
                  )}
                </div>
              )}
            </div>
            {errors.imageUrl && <p className="text-red-500 text-xs mt-2 text-center">{errors.imageUrl}</p>}
            
            <button 
              disabled={isSubmitting} 
              type="submit" 
              className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-teal-200 shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : 'Cadastrar Pet'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Gerenciamento */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <ImageIcon className="w-5 h-5" /> Galeria Atual
          </h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {animals.map(animal => (
            <li key={animal.id} className="p-4 flex flex-col sm:flex-row items-center gap-4 hover:bg-gray-50 transition">
              <img src={animal.imageUrl || 'placeholder'} alt={animal.name} className="w-16 h-16 rounded-xl object-cover shadow-sm bg-gray-200" />
              
              <div className="flex-grow text-center sm:text-left">
                <p className="font-bold text-gray-800 text-lg">{animal.name}</p>
                <p className="text-sm text-gray-500">{animal.type} • {animal.breed}</p>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                <button 
                  onClick={() => AnimalService.toggleStatus(animal)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition border ${
                    animal.status === 'adotado' 
                      ? 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200' 
                      : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                  }`}
                >
                  {animal.status === 'adotado' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {animal.status === 'adotado' ? 'Adotado' : 'Disponível'}
                </button>
                
                <button 
                  onClick={() => handleDelete(animal.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Excluir Registro"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
          {animals.length === 0 && (
            <li className="p-8 text-center text-gray-400">Nenhum animal cadastrado ainda.</li>
          )}
        </ul>
      </div>
    </div>
  );
}