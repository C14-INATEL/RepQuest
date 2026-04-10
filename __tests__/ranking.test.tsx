import {render, screen} from "@testing-library/react-native";
import React from 'react';
import { ActivityIndicator } from 'react-native';

import RankingScreen from '../app/(tabs)/ranking';

// Mock do Contexto (RepContext.tsx)
const mockUseRep = jest.fn();
jest.mock('../contexts/RepContext', () => ({
    useRep: () => mockUseRep(),
}));

// Mock das fontes
jest.mock('expo-font', () => ({
    useFonts: () => [true], // Simula que as fontes estão carregadas
}));

// Mock dos icons
jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  const Icon = ({ name }: { name: string }) => <Text>{name}</Text>;

  return {
    FontAwesome5: Icon,
    MaterialCommunityIcons: Icon,
  };
});

// Mock do Gradiente
jest.mock('expo-linear-gradient', () => {
    const React = require('react');
    const {View} = require('react-native');
    return {
        LinearGradient: ({children, ...props}: any) =>
            React.createElement(View, props,children),
    };
});

// Mock do Background
jest.mock('react-native', () => {
    const rn = jest.requireActual('react-native');
    rn.ImageBackground = ({children}: any) => children;
    return rn;
})

// Mock dos moradores (constants/moradores.ts)
jest.mock('../constants/moradores', () => ({
    OUTROS_MORADORES: [
    { id: '2', nome: 'John Wick', nivel: 3, avatar: 'baby-yaga', rupes_base: 1100 },
    { id: '3', nome: 'Darth Vader', nivel: 2, avatar: 'lego-darth', rupes_base: 500 },
    { id: '4', nome: 'Senhor das Estrelas', nivel: 1, avatar: 'guardiao', rupes_base: 300 },
    ],
}))

const createRepState = (overrides = {}) => ({
    totalRupes: 1250,
    loading: false,
    ...overrides,
});
const renderScreen = (overrides = {}) => {
    const repState = createRepState(overrides);
    mockUseRep.mockReturnValue(repState);
    return {
        repState,
        ...render(<RankingScreen/>),
    };
};

// Limpa os mocks antes de cada teste para evitar interferências entre eles
beforeEach(() => {
    jest.clearAllMocks();
});

// teste de loading (deve exibir um indicador de carregamento quando os dados estão sendo carregados)
it('LoadingTest', () => {
    // renderiza a tela de ranking com o estado de loading definido como true
    const {UNSAFE_getByType, queryByText } = renderScreen({ loading: true});

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    expect(queryByText('ranking')).toBeNull();
});

// teste de ordenação do ranking (deve exibir os moradores na ordem correta com base no total de rupes)
it('OrdemRankingTest', () => {
  renderScreen({ totalRupes: 1250 });

  expect(screen.getByTestId('podium-position-1').props.children).toBe('Eduardo');
  expect(screen.getByTestId('podium-position-2').props.children).toBe('John');
  expect(screen.getByTestId('podium-position-3').props.children).toBe('Darth');
  expect(screen.getByTestId('list-position-4').props.children).toBe('SENHOR DAS ESTRELAS');
});

// teste negativo de ordenação do ranking
it('OrdemRankingTestNegativo', () => {
  renderScreen({ totalRupes: 50 });

  // Eduardo tem poucos rupes, então não deve estar no 1º lugar
  expect(screen.getByTestId('podium-position-1').props.children).not.toBe('Eduardo');

  // John deve assumir o 1º lugar
  expect(screen.getByTestId('podium-position-1').props.children).toBe('John');

  // Eduardo deve cair para a lista, fora do pódio
  expect(screen.getByTestId('list-position-4').props.children).toBe('EDUARDO BERTOZZI');
});

// teste de empate no ranking (quando dois moradores têm o mesmo total de rupes, ambos devem aparecer no pódio)
it('EmpateRupesTest', () => {
  renderScreen({ totalRupes: 1100 });

  const posicao1 = screen.getByTestId('podium-position-1').props.children;
  const posicao2 = screen.getByTestId('podium-position-2').props.children;

  // Verifica que Eduardo e John estão entre os dois primeiros, em qualquer ordem
  expect(['Eduardo', 'John']).toContain(posicao1);
  expect(['Eduardo', 'John']).toContain(posicao2);

  // Darth deve continuar em 3º (500 rupes, sem empate)
  expect(screen.getByTestId('podium-position-3').props.children).toBe('Darth');
});

// teste de exibição de rupes
it('ExibicaoRupesTest', () => {
  renderScreen({ totalRupes: 1250 });

  // Eduardo está em 1º com 1250 rupes — deve aparecer formatado no pódio
  expect(screen.getByText('1.250 R')).toBeTruthy();
});