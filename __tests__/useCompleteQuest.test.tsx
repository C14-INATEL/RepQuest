/**
 * Testes Unitarios - Fluxo de recompensa de missoes (contexts/RepContext.tsx)
 *
 * Foco: ECONOMIA DE RUPIAS. No RepQuest, concluir uma missao credita Rupias
 * ao morador (ganharRupes) e quitar uma despesa debita do saldo (gastarRupes).
 * Estes testes exercitam essa logica real de recompensa e o gerenciamento
 * do mural de missoes atraves do contexto global (useRep).
 */

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

describe('RepContext – recompensa de missoes e mural', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('credita Rupias ao concluir uma missao (ganharRupes)', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    // Saldo inicial: 1250. Missao de 50 XP concluida.
    act(() => {
      result.current.ganharRupes(50);
    });

    expect(result.current.totalRupes).toBe(1300);
  });

  it('acumula recompensas de varias missoes concluidas em sequencia', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    act(() => {
      result.current.ganharRupes(50);
      result.current.ganharRupes(20);
    });

    expect(result.current.totalRupes).toBe(1320);
  });

  it('debita o saldo ao quitar uma despesa (gastarRupes)', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    // Ganha 100 e paga um tributo de 1200.
    act(() => {
      result.current.ganharRupes(100);
      result.current.gastarRupes(1200);
    });

    expect(result.current.totalRupes).toBe(150);
  });

  it('nao altera o saldo quando a recompensa concluida vale 0 XP', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    act(() => {
      result.current.ganharRupes(0);
    });

    expect(result.current.totalRupes).toBe(1250);
  });

  it('remove uma missao do mural ao atualizar a lista global', async () => {
    const { result } = renderHook(() => useRep(), { wrapper });
    await act(async () => {});

    // Comeca com as 2 missoes padrao; conclui/remove uma e resta 1.
    expect(result.current.missoes).toHaveLength(2);

    const restante = result.current.missoes.filter((m) => m.id !== '1');

    act(() => {
      result.current.setMissoesGlobal(restante);
    });

    expect(result.current.missoes).toHaveLength(1);
    expect(result.current.missoes[0].id).toBe('2');
  });
});
