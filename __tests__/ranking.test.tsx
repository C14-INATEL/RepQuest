import { render, screen } from "@testing-library/react-native";
import React from 'react';
import { ActivityIndicator } from 'react-native';

import RankingScreen from '../app/(tabs)/ranking';

// ─────────────────────────────────────────────
// MOCKS GLOBAIS
// ─────────────────────────────────────────────

const mockUseRep = jest.fn();
jest.mock('../contexts/RepContext', () => ({
  useRep: () => mockUseRep(),
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  const Icon = ({ name }: { name: string }) => <Text>{name}</Text>;
  return { FontAwesome5: Icon, MaterialCommunityIcons: Icon };
});

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
  };
});

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.ImageBackground = ({ children }: any) => children;
  return rn;
});

// ─────────────────────────────────────────────
// MOCK DOS MORADORES — controlável por variável
// Usando get() para permitir sobrescrever em testes específicos
// ─────────────────────────────────────────────

let mockMoradores = [
  { id: '2', nome: 'Breno Engenharia', nivel: 3, avatar: 'user-ninja',    rupes_base: 1100 },
  { id: '3', nome: 'Caio Inatel',      nivel: 3, avatar: 'user-tie',      rupes_base: 950  },
  { id: '4', nome: 'Gustavo Dev',      nivel: 2, avatar: 'user-secret',   rupes_base: 800  },
  { id: '5', nome: 'Morador Fantasma', nivel: 1, avatar: 'user-ghost',    rupes_base: 450  },
  { id: '6', nome: 'Calouro 01',       nivel: 1, avatar: 'user-graduate', rupes_base: 200  },
];

jest.mock('../constants/moradores', () => ({
  get OUTROS_MORADORES() { return mockMoradores; }
}));

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const createRepState = (overrides = {}) => ({
  totalRupes: 1250,
  loading: false,
  ...overrides,
});

const renderScreen = (overrides = {}) => {
  const repState = createRepState(overrides);
  mockUseRep.mockReturnValue(repState);
  return { repState, ...render(<RankingScreen />) };
};

// Reseta tudo antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
  mockMoradores = [
    { id: '2', nome: 'Breno Engenharia', nivel: 3, avatar: 'user-ninja',    rupes_base: 1100 },
    { id: '3', nome: 'Caio Inatel',      nivel: 3, avatar: 'user-tie',      rupes_base: 950  },
    { id: '4', nome: 'Gustavo Dev',      nivel: 2, avatar: 'user-secret',   rupes_base: 800  },
    { id: '5', nome: 'Morador Fantasma', nivel: 1, avatar: 'user-ghost',    rupes_base: 450  },
    { id: '6', nome: 'Calouro 01',       nivel: 1, avatar: 'user-graduate', rupes_base: 200  },
  ];
});

// ─────────────────────────────────────────────
// TESTES
// ─────────────────────────────────────────────

// Exibe spinner quando loading = true
it('LoadingTest', () => {
  const { UNSAFE_getByType, queryByText } = renderScreen({ loading: true });
  expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  expect(queryByText('ranking')).toBeNull();
});

// OrdemRankingTest — Gustavo é o 4º
it('OrdemRankingTest', () => {
  renderScreen({ totalRupes: 1250 });
  expect(screen.getByTestId('podium-position-1').props.children).toBe('Eduardo');
  expect(screen.getByTestId('podium-position-2').props.children).toBe('Breno');
  expect(screen.getByTestId('podium-position-3').props.children).toBe('Caio');
  expect(screen.getByTestId('list-position-4').props.children).toBe('GUSTAVO DEV'); // ← era list-position-6
});

// OrdemRankingTestNegativo — Eduardo cai para o 6º
it('OrdemRankingTestNegativo', () => {
  renderScreen({ totalRupes: 50 });
  expect(screen.getByTestId('podium-position-1').props.children).not.toBe('Eduardo');
  expect(screen.getByTestId('podium-position-1').props.children).toBe('Breno');
  expect(screen.getByTestId('list-position-6').props.children).toBe('EDUARDO BERTOZZI'); // ← era list-position-4
});

// Empate entre Eduardo e Breno (ambos 1100)
it('EmpateRupesTest', () => {
  renderScreen({ totalRupes: 1100 });

  const posicao1 = screen.getByTestId('podium-position-1').props.children;
  const posicao2 = screen.getByTestId('podium-position-2').props.children;

  expect(['Eduardo', 'Breno']).toContain(posicao1);
  expect(['Eduardo', 'Breno']).toContain(posicao2);
  expect(posicao1).not.toBe(posicao2);

  expect(screen.getByTestId('podium-position-3').props.children).toBe('Caio');
});

// Rupes sem separador de milhar para evitar problema de locale
it('ExibicaoRupesTest', () => {
  renderScreen({ totalRupes: 999 });
  expect(screen.getByText('999 R')).toBeTruthy();
});

// totalRupesUndefinedTest — Eduardo com 0 rupes cai para o 6º
it('totalRupesUndefinedTest', () => {
  mockUseRep.mockReturnValue({ totalRupes: undefined, loading: false });
  expect(() => render(<RankingScreen />)).not.toThrow();
  expect(screen.getByTestId("podium-position-1").props.children).toBe("Breno");
  expect(screen.getByTestId("list-position-6").props.children).toBe("EDUARDO BERTOZZI"); // ← era list-position-4
});

// nome undefined não crasha e exibe DESCONHECIDO
it('NomeUndefinedTest', () => {
  // Sobrescreve a variável — só esse teste usa morador sem nome
  mockMoradores = [
    { id: '2', nome: undefined as string | undefined,         nivel: 3, avatar: 'user-ninja',    rupes_base: 1100 },
    { id: '3', nome: 'Caio Inatel',      nivel: 3, avatar: 'user-tie',      rupes_base: 950  },
    { id: '4', nome: 'Gustavo Dev',      nivel: 2, avatar: 'user-secret',   rupes_base: 800  },
    { id: '5', nome: 'Morador Fantasma', nivel: 1, avatar: 'user-ghost',    rupes_base: 450  },
    { id: '6', nome: 'Calouro 01',       nivel: 1, avatar: 'user-graduate', rupes_base: 200  },
  ];

  mockUseRep.mockReturnValue({ totalRupes: 999, loading: false });

  expect(() => render(<RankingScreen />)).not.toThrow();
  // Eduardo (999) em 1º, desconhecido (1100) em... espera, 1100 > 999
  // então desconhecido fica em 1º e Eduardo em 2º
  expect(screen.getByTestId("podium-position-1").props.children).toBe("DESCONHECIDO");
});