import { db } from './firebase';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp 
} from 'firebase/firestore';

const COLLECTION_NAME = 'animals';

export const AnimalService = {
  // Escuta atualizações em tempo real
  subscribe: (callback) => {
    const q = collection(db, COLLECTION_NAME);
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Lógica de ordenação
      const sorted = data.sort((a, b) => {
        if (a.status === 'disponivel' && b.status === 'adotado') return -1;
        if (a.status === 'adotado' && b.status === 'disponivel') return 1;
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      });

      callback(sorted);
    });
  },

  add: async (animalData) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...animalData,
      createdAt: serverTimestamp()
    });
  },

  delete: async (id) => {
    return await deleteDoc(doc(db, COLLECTION_NAME, id));
  },

  toggleStatus: async (animal) => {
    const newStatus = animal.status === 'disponivel' ? 'adotado' : 'disponivel';
    return await updateDoc(doc(db, COLLECTION_NAME, animal.id), {
      status: newStatus
    });
  }
};