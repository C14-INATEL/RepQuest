import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface Missao { id: string; titulo: string; xp: number; icone: string; }
interface Despesa { id: string; titulo: string; valor: number; categoria: string; icon: string; }

interface RepContextData {
  totalRupes: number;
  missoes: Missao[];
  despesas: Despesa[];
  nomeUsuario: string;
  avatarUsuario: string;
  loading: boolean;
  ganharRupes: (valor: number) => void;
  gastarRupes: (valor: number) => void;
  setMissoesGlobal: (lista: Missao[]) => void;
  setDespesasGlobal: (lista: Despesa[]) => void;
  setNomeUsuario: (nome: string) => void;
  setAvatarUsuario: (avatar: string) => void;
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
  const [nomeUsuario, setNomeUsuarioState] = useState('Aventureiro');
  const [avatarUsuario, setAvatarUsuarioState] = useState('user-astronaut');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        const [savedRupes, savedMissoes, savedDespesas, savedNome, savedAvatar] = await Promise.all([
          AsyncStorage.getItem('@RepQuest:rupes'),
          AsyncStorage.getItem('@RepQuest:missoes'),
          AsyncStorage.getItem('@RepQuest:despesas'),
          AsyncStorage.getItem('@RepQuest:nome'),
          AsyncStorage.getItem('@RepQuest:avatar'),
        ]);

        if (savedRupes) setTotalRupes(Number(savedRupes));
        setMissoes(savedMissoes ? JSON.parse(savedMissoes) : MISSOES_PADRAO);
        setDespesas(savedDespesas ? JSON.parse(savedDespesas) : DESPESAS_PADRAO);
        if (savedNome) setNomeUsuarioState(savedNome);
        if (savedAvatar) setAvatarUsuarioState(savedAvatar);
      } catch (e) {
        console.error('Erro ao carregar dados do RepQuest.');
      } finally {
        setLoading(false);
      }
    }
    loadAllData();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem('@RepQuest:rupes', totalRupes.toString());
      AsyncStorage.setItem('@RepQuest:missoes', JSON.stringify(missoes));
      AsyncStorage.setItem('@RepQuest:despesas', JSON.stringify(despesas));
      AsyncStorage.setItem('@RepQuest:nome', nomeUsuario);
      AsyncStorage.setItem('@RepQuest:avatar', avatarUsuario);
    }
  }, [totalRupes, missoes, despesas, nomeUsuario, avatarUsuario, loading]);

  const ganharRupes = (valor: number) => setTotalRupes(prev => prev + valor);
  const gastarRupes = (valor: number) => setTotalRupes(prev => prev - valor);
  const setMissoesGlobal = (lista: Missao[]) => setMissoes(lista);
  const setDespesasGlobal = (lista: Despesa[]) => setDespesas(lista);
  const setNomeUsuario = (nome: string) => setNomeUsuarioState(nome);
  const setAvatarUsuario = (avatar: string) => setAvatarUsuarioState(avatar);

  return (
    <RepContext.Provider value={{
      totalRupes, missoes, despesas, nomeUsuario, avatarUsuario, loading,
      ganharRupes, gastarRupes, setMissoesGlobal, setDespesasGlobal,
      setNomeUsuario, setAvatarUsuario,
    }}>
      {children}
    </RepContext.Provider>
  );
}

export const useRep = () => useContext(RepContext);
