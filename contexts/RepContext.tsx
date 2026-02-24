import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Tipagem das Entidades
interface Missao { id: string; titulo: string; xp: number; icone: string; }
interface Despesa { id: string; titulo: string; valor: number; categoria: string; icon: string; }

interface RepContextData {
  totalRupes: number;
  missoes: Missao[];
  despesas: Despesa[];
  loading: boolean;
  ganharRupes: (valor: number) => void;
  gastarRupes: (valor: number) => void;
  setMissoesGlobal: (lista: Missao[]) => void;
  setDespesasGlobal: (lista: Despesa[]) => void;
}

const RepContext = createContext<RepContextData>({} as RepContextData);

const MISSOES_PADRAO = [
  { id: '1', titulo: 'Derrotar a montanha de louça', xp: 50, icone: 'sink' },
  { id: '2', titulo: 'Banir o lixo da cozinha', xp: 20, icone: 'trash' },
];

const DESPESAS_PADRAO = [
  { id: '1', titulo: 'Tributo ao Aluguel', valor: 1200, categoria: 'casa', icon: 'home' },
];

export function RepProvider({ children }: { children: ReactNode }) {
  const [totalRupes, setTotalRupes] = useState(1250);
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);

  // CARREGAR TUDO NO STARTUP
  useEffect(() => {
    async function loadAllData() {
      try {
        const [savedRupes, savedMissoes, savedDespesas] = await Promise.all([
          AsyncStorage.getItem('@RepQuest:rupes'),
          AsyncStorage.getItem('@RepQuest:missoes'),
          AsyncStorage.getItem('@RepQuest:despesas'),
        ]);

        if (savedRupes) setTotalRupes(Number(savedRupes));
        setMissoes(savedMissoes ? JSON.parse(savedMissoes) : MISSOES_PADRAO);
        setDespesas(savedDespesas ? JSON.parse(savedDespesas) : DESPESAS_PADRAO);
      } catch (e) {
        console.error("Erro ao ler banco de dados Zonai.");
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, []);

  // SALVAR SEMPRE QUE ALGO MUDAR
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem('@RepQuest:rupes', totalRupes.toString());
      AsyncStorage.setItem('@RepQuest:missoes', JSON.stringify(missoes));
      AsyncStorage.setItem('@RepQuest:despesas', JSON.stringify(despesas));
    }
  }, [totalRupes, missoes, despesas, loading]);

  const ganharRupes = (valor: number) => setTotalRupes(prev => prev + valor);
  const gastarRupes = (valor: number) => setTotalRupes(prev => prev - valor);
  const setMissoesGlobal = (lista: Missao[]) => setMissoes(lista);
  const setDespesasGlobal = (lista: Despesa[]) => setDespesas(lista);

  return (
    <RepContext.Provider value={{ 
      totalRupes, missoes, despesas, loading, 
      ganharRupes, gastarRupes, setMissoesGlobal, setDespesasGlobal 
    }}>
      {children}
    </RepContext.Provider>
  );
}

export const useRep = () => useContext(RepContext);