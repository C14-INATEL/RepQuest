import { render, screen, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { ActivityIndicator, Linking } from 'react-native';

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

  // --- Novos testes (Samile) ---

  it('nao exibe spinner quando loading=false', () => {
    mockUseRep.mockReturnValue(createRepState({ loading: false }));
    const { UNSAFE_queryByType } = render(<PerfilScreen />);
    expect(UNSAFE_queryByType(ActivityIndicator)).toBeNull();
  });

  it('exibe total de rupes corretamente na tela', () => {
    mockUseRep.mockReturnValue(createRepState({ totalRupes: 750 }));
    render(<PerfilScreen />);
    expect(screen.getByText('750')).toBeTruthy();
  });

  it('calcula nivel 2 para 500 rupias exatas', () => {
    // nivelAtual = floor(500 / 500) + 1 = 2
    mockUseRep.mockReturnValue(createRepState({ totalRupes: 500 }));
    render(<PerfilScreen />);
    expect(screen.getByText('NÍVEL 02')).toBeTruthy();
  });

  it('exibe 0 quests ativas quando missoes esta vazia', () => {
    mockUseRep.mockReturnValue(createRepState({ missoes: [] }));
    render(<PerfilScreen />);
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('abre link do GitHub ao pressionar o card', () => {
    const openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    mockUseRep.mockReturnValue(createRepState());
    render(<PerfilScreen />);
    fireEvent.press(screen.getByText('C14-INATEL/RepQuest'));
    expect(openURLSpy).toHaveBeenCalledWith('https://github.com/C14-INATEL/RepQuest');
  });

  it('exibe texto de progresso da runa com valores corretos', () => {
    // totalRupes=750, xpAtual = 750 % 500 = 250
    mockUseRep.mockReturnValue(createRepState({ totalRupes: 750 }));
    render(<PerfilScreen />);
    expect(screen.getByText('250 / 500 R')).toBeTruthy();
  });
});
