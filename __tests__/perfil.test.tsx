import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import PerfilScreen from '../app/(tabs)/perfil';

const mockUseRep = jest.fn();
jest.mock('../contexts/RepContext', () => ({
  useRep: () => mockUseRep(),
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  const Icon = ({ name }: { name: string }) => <Text>{name}</Text>;
  return { FontAwesome5: Icon, MaterialCommunityIcons: Icon };
});

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children, ...props }: any) => React.createElement(View, props, children),
  };
});

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.ImageBackground = ({ children }: any) => children;
  return rn;
});

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'Light' },
  notificationAsync: jest.fn(),
  NotificationFeedbackType: { Warning: 'Warning' },
}));

const createRepState = (overrides = {}) => ({
  totalRupes: 1250,
  missoes: [],
  loading: false,
  nomeUsuario: 'Eduardo Bertozzi',
  avatarUsuario: 'user-astronaut',
  ...overrides,
});

describe('PerfilScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exibe spinner quando loading=true', () => {
    mockUseRep.mockReturnValue(createRepState({ loading: true }));
    const { UNSAFE_getByType } = render(<PerfilScreen />);
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('exibe o nome do usuario vindo do contexto', () => {
    mockUseRep.mockReturnValue(createRepState({ nomeUsuario: 'Link Hyrule' }));
    render(<PerfilScreen />);
    expect(screen.getByText('Link Hyrule')).toBeTruthy();
  });

  it('calcula nivel 3 para 1250 rupias', () => {
    // nivelAtual = floor(1250 / 500) + 1 = 3
    mockUseRep.mockReturnValue(createRepState({ totalRupes: 1250 }));
    render(<PerfilScreen />);
    expect(screen.getByText('NÍVEL 03')).toBeTruthy();
  });

  it('calcula nivel 1 para 0 rupias', () => {
    // nivelAtual = floor(0 / 500) + 1 = 1
    mockUseRep.mockReturnValue(createRepState({ totalRupes: 0 }));
    render(<PerfilScreen />);
    expect(screen.getByText('NÍVEL 01')).toBeTruthy();
  });

  it('exibe contagem correta de quests ativas', () => {
    const missoes = [
      { id: '1', titulo: 'Lavar loca', xp: 50, icone: 'sink' },
      { id: '2', titulo: 'Varrer sala', xp: 20, icone: 'broom' },
    ];
    mockUseRep.mockReturnValue(createRepState({ missoes }));
    render(<PerfilScreen />);
    expect(screen.getByText('2')).toBeTruthy();
  });
});
