import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { AuthService } from './services/authService';
import { AnimalService } from './services/animalService';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [view, setView] = useState('gallery');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // 1. Monitorar Autenticação
  useEffect(() => {
    AuthService.loginAnonymous().catch(console.error);
    const unsubscribeAuth = onAuthStateChanged(auth, setUser);
    return () => unsubscribeAuth();
  }, []);

  // 2. Buscar Dados (Animais)
  useEffect(() => {
    if (!user) return;
    
    const unsubscribeData = AnimalService.subscribe((data) => {
      setAnimals(data);
      setLoading(false);
    });
    return () => unsubscribeData();
  }, [user]);

  // Controles de Navegação
  const handleLoginSuccess = () => {
    setIsAdminMode(true);
    setView('adminDashboard');
  };

  const handleLogout = () => {
    setIsAdminMode(false);
    setView('gallery');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        onViewChange={setView} 
        isAdmin={isAdminMode} 
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        {view === 'gallery' && (
          <Home animals={animals} loading={loading} />
        )}
        
        {view === 'adminLogin' && (
          <AdminLogin 
            onLoginSuccess={handleLoginSuccess} 
            onCancel={() => setView('gallery')} 
          />
        )}
        
        {view === 'adminDashboard' && isAdminMode && (
          <AdminDashboard animals={animals} />
        )}
      </main>

      <Footer />
    </div>
  );
}