import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import initialNoticias from '../data/noticias.json';

const NoticiasContext = createContext(null);

const COLLECTION = 'noticias';

export const NoticiasProvider = ({ children }) => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeded, setSeeded] = useState(false);

  // Escucha en tiempo real la colección de Firestore
  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('fecha', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setNoticias(data);
      setLoading(false);

      // Si la colección está vacía, cargamos los datos iniciales del JSON
      if (!seeded && data.length === 0) {
        setSeeded(true);
        seedInitialData();
      }
    }, (err) => {
      console.error('Error escuchando noticias:', err);
      setLoading(false);
    });
    return () => unsub();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Seed inicial: cuando Firestore está vacío, sube el JSON local
  const seedInitialData = async () => {
    try {
      const col = collection(db, COLLECTION);
      for (const n of initialNoticias) {
        const { id: _id, ...rest } = n; // omitimos el id local, Firestore genera el suyo
        await addDoc(col, { ...rest, fechaCreacion: serverTimestamp() });
      }
    } catch (e) {
      console.error('Error sembrando datos iniciales:', e);
    }
  };

  // CREATE
  const addNoticia = useCallback(async (noticia) => {
    const tags = typeof noticia.tags === 'string'
      ? noticia.tags.split(',').map(t => t.trim()).filter(Boolean)
      : noticia.tags || [];
    const data = {
      titulo: noticia.titulo || '',
      descripcion: noticia.descripcion || '',
      categoria: noticia.categoria || 'GTA Online',
      autor: noticia.autor || '',
      fecha: noticia.fecha || new Date().toISOString().split('T')[0],
      imagen: noticia.imagen || '',
      likes: 0,
      tags,
      fechaCreacion: serverTimestamp(),
    };
    const ref = await addDoc(collection(db, COLLECTION), data);
    return { id: ref.id, ...data };
  }, []);

  // UPDATE
  const updateNoticia = useCallback(async (id, changes) => {
    const tags = typeof changes.tags === 'string'
      ? changes.tags.split(',').map(t => t.trim()).filter(Boolean)
      : changes.tags;
    const updates = { ...changes };
    if (tags !== undefined) updates.tags = tags;
    await updateDoc(doc(db, COLLECTION, id), updates);
  }, []);

  // DELETE
  const deleteNoticia = useCallback(async (id) => {
    await deleteDoc(doc(db, COLLECTION, id));
  }, []);

  return (
    <NoticiasContext.Provider value={{ noticias, loading, addNoticia, updateNoticia, deleteNoticia }}>
      {children}
    </NoticiasContext.Provider>
  );
};

export const useNoticias = () => {
  const ctx = useContext(NoticiasContext);
  if (!ctx) throw new Error('useNoticias must be used inside NoticiasProvider');
  return ctx;
};
