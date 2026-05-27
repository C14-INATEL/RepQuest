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

describe('RepContext – estado global', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  it('inicializa com saldo de 1250 rupias e nome padrao Aventureiro', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});
    expect(result.current.totalRupes).toBe(1250);
    expect(result.current.nomeUsuario).toBe('Aventureiro');
  });

  it('loading muda para false apos carregar os dados', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});
    expect(result.current.loading).toBe(false);
  });

  it('ganharRupes incrementa o saldo corretamente', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});
    act(() => { result.current.ganharRupes(100); });
    expect(result.current.totalRupes).toBe(1350);
  });

  it('gastarRupes decrementa o saldo corretamente', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});
    act(() => { result.current.gastarRupes(250); });
    expect(result.current.totalRupes).toBe(1000);
  });

  it('setNomeUsuario atualiza o nome no contexto', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});
    act(() => { result.current.setNomeUsuario('Link'); });
    expect(result.current.nomeUsuario).toBe('Link');
  });

  it('setAvatarUsuario atualiza o avatar no contexto', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});
    act(() => { result.current.setAvatarUsuario('user-ninja'); });
    expect(result.current.avatarUsuario).toBe('user-ninja');
  });

  it('carrega rupes e nome salvos no AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      if (key === '@RepQuest:rupes') return Promise.resolve('500');
      if (key === '@RepQuest:nome') return Promise.resolve('Zelda');
      return Promise.resolve(null);
    });

    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    expect(result.current.totalRupes).toBe(500);
    expect(result.current.nomeUsuario).toBe('Zelda');
  });
});
