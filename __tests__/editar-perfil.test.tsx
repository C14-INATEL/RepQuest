import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import EditarPerfil from '../app/config/editar-perfil';

const mockSetNomeUsuario = jest.fn();
const mockSetAvatarUsuario = jest.fn();
const mockBack = jest.fn();
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
  return { FontAwesome5: Icon };
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
  useRouter: () => ({ back: mockBack }),
}));

jest.mock('expo-haptics', () => ({
  notificationAsync: jest.fn(),
  impactAsync: jest.fn(),
  NotificationFeedbackType: { Success: 'Success' },
  ImpactFeedbackStyle: { Light: 'Light' },
}));

const createRepState = (overrides = {}) => ({
  nomeUsuario: 'Gabriel Morass',
  avatarUsuario: 'user-astronaut',
  setNomeUsuario: mockSetNomeUsuario,
  setAvatarUsuario: mockSetAvatarUsuario,
  ...overrides,
});

describe('EditarPerfil', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRep.mockReturnValue(createRepState());
  });

  it('renderiza o titulo da tela', () => {
    render(<EditarPerfil />);
    expect(screen.getByText('Identidade')).toBeTruthy();
  });

  it('exibe o nome atual do contexto no input', () => {
    mockUseRep.mockReturnValue(createRepState({ nomeUsuario: 'Link Hyrule' }));
    render(<EditarPerfil />);
    const input = screen.getByDisplayValue('Link Hyrule');
    expect(input).toBeTruthy();
  });

  it('exibe os 6 avatares disponiveis para selecao', () => {
    render(<EditarPerfil />);
    expect(screen.getByText('user-astronaut')).toBeTruthy();
    expect(screen.getByText('user-ninja')).toBeTruthy();
    expect(screen.getByText('user-tie')).toBeTruthy();
    expect(screen.getByText('user-graduate')).toBeTruthy();
    expect(screen.getByText('user-secret')).toBeTruthy();
    expect(screen.getByText('user-crown')).toBeTruthy();
  });

  it('atualiza o campo ao digitar um novo nome', () => {
    render(<EditarPerfil />);
    const input = screen.getByDisplayValue('Gabriel Morass');
    fireEvent.changeText(input, 'Zelda Hyrule');
    expect(screen.getByDisplayValue('Zelda Hyrule')).toBeTruthy();
  });

  it('ao salvar chama setNomeUsuario com o nome digitado', () => {
    render(<EditarPerfil />);
    const input = screen.getByDisplayValue('Gabriel Morass');
    fireEvent.changeText(input, 'Novo Nome');
    fireEvent.press(screen.getByText('GRAVAR NA PEDRA'));
    expect(mockSetNomeUsuario).toHaveBeenCalledWith('Novo Nome');
  });

  it('ao salvar chama setAvatarUsuario com o avatar selecionado', () => {
    render(<EditarPerfil />);
    fireEvent.press(screen.getByText('user-ninja'));
    fireEvent.press(screen.getByText('GRAVAR NA PEDRA'));
    expect(mockSetAvatarUsuario).toHaveBeenCalledWith('user-ninja');
  });

  it('ao salvar navega de volta com router.back()', () => {
    render(<EditarPerfil />);
    fireEvent.press(screen.getByText('GRAVAR NA PEDRA'));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('botao voltar navega de volta sem salvar', () => {
    render(<EditarPerfil />);
    fireEvent.press(screen.getByText('chevron-left'));
    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockSetNomeUsuario).not.toHaveBeenCalled();
  });
});
