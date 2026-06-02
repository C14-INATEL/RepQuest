/**
 * Testes Unitarios - Contexto Global da Aplicacao (contexts/RepContext.tsx)
 *
 * Foco: PERSISTENCIA. Garante que as alteracoes de estado feitas pelo
 * contexto global do app sao gravadas no AsyncStorage com as chaves e
 * formatos corretos, e que os valores padrao sao carregados quando o
 * armazenamento esta vazio.
 *
 * Observacao: o contexto global do RepQuest e o RepProvider/useRep.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-native';
import React from 'react';

import { RepProvider, useRep } from '../contexts/RepContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RepProvider>{children}</RepProvider>
);

describe('RepContext – persistencia no AsyncStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  it('persiste o saldo inicial de rupias com a chave correta apos carregar', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@RepQuest:rupes', '1250');
  });

  it('persiste o nome do usuario como string quando alterado', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    await act(async () => {
      result.current.setNomeUsuario('Link');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@RepQuest:nome', 'Link');
  });

  it('persiste a lista de missoes serializada em JSON', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    const novasMissoes = [
      { id: '99', titulo: 'Domar o Lynel da baguncha', xp: 80, icone: 'broom' },
    ];

    await act(async () => {
      result.current.setMissoesGlobal(novasMissoes);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@RepQuest:missoes',
      JSON.stringify(novasMissoes),
    );
  });

  it('persiste a lista de despesas serializada em JSON', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    const novasDespesas = [
      { id: '7', titulo: 'Tributo da Internet', valor: 100, categoria: 'casa', icon: 'wifi' },
    ];

    await act(async () => {
      result.current.setDespesasGlobal(novasDespesas);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@RepQuest:despesas',
      JSON.stringify(novasDespesas),
    );
  });

  it('carrega missoes e despesas padrao quando o AsyncStorage esta vazio', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    // Defaults definidos no proprio RepContext
    expect(result.current.missoes).toHaveLength(2);
    expect(result.current.despesas).toHaveLength(1);
    expect(result.current.missoes[0].xp).toBe(50);
    expect(result.current.missoes[0].icone).toBe('sink');
  });
});
