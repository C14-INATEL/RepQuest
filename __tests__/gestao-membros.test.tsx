import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';

import GestaoMembros from '../app/admin/gestao-membros';

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
  rn.Share = { share: jest.fn(() => Promise.resolve({ action: 'sharedAction' })) };
  return rn;
});

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: { Heavy: 'Heavy', Light: 'Light' },
  NotificationFeedbackType: { Success: 'Success' },
}));

const createRepState = (overrides = {}) => ({
  nomeUsuario: 'Gabriel Morass',
  avatarUsuario: 'user-astronaut',
  ...overrides,
});

describe('GestaoMembros', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRep.mockReturnValue(createRepState());
  });

  it('renderiza o titulo e subtitulo da tela', () => {
    render(<GestaoMembros />);
    expect(screen.getByText('Painel do Patriarca')).toBeTruthy();
    expect(screen.getByText('GESTÃO DE INTEGRANTES')).toBeTruthy();
  });

  it('exibe o codigo de convite corretamente', () => {
    render(<GestaoMembros />);
    expect(screen.getByText('SABUGAL-2026')).toBeTruthy();
    expect(screen.getByText('CÓDIGO DE CONVITE')).toBeTruthy();
  });

  it('exibe o nome do fundador vindo do RepContext', () => {
    mockUseRep.mockReturnValue(createRepState({ nomeUsuario: 'Link Hyrule' }));
    render(<GestaoMembros />);
    expect(screen.getByText('LINK HYRULE')).toBeTruthy();
    expect(screen.getByText('Fundador • NIVEL 4')).toBeTruthy();
  });

  it('lista todos os membros da republica', () => {
    render(<GestaoMembros />);
    expect(screen.getByText('GABRIEL MORASS')).toBeTruthy();
    expect(screen.getByText('BRENO ENGENHARIA')).toBeTruthy();
    expect(screen.getByText('CAIO INATEL')).toBeTruthy();
    expect(screen.getByText('CALOURO 01')).toBeTruthy();
  });

  it('fundador nao possui botao de remover', () => {
    render(<GestaoMembros />);
    // 4 membros no total, 3 nao-fundadores -> 3 botoes de remover (icone account-remove)
    const botoesRemover = screen.getAllByText('account-remove');
    expect(botoesRemover).toHaveLength(3);
  });

  it('abre alert de confirmacao ao pressionar remover um morador', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    render(<GestaoMembros />);

    const botoesRemover = screen.getAllByText('account-remove');
    fireEvent.press(botoesRemover[0]); // Breno e o primeiro nao-fundador

    expect(alertSpy).toHaveBeenCalledWith(
      'Expulsar Morador?',
      expect.stringContaining('Breno Engenharia'),
      expect.any(Array),
    );
  });

  it('remove o morador ao confirmar EXPULSAR no alert', () => {
    jest.spyOn(Alert, 'alert').mockImplementation((_title, _msg, buttons: any) => {
      const expulsar = buttons?.find((b: any) => b.text === 'EXPULSAR');
      expulsar?.onPress?.();
    });

    render(<GestaoMembros />);

    const botoesRemover = screen.getAllByText('account-remove');
    fireEvent.press(botoesRemover[0]); // Remove Breno

    expect(screen.queryByText('BRENO ENGENHARIA')).toBeNull();
    expect(screen.getByText('CAIO INATEL')).toBeTruthy();
  });

  it('nao remove o morador ao cancelar o alert', () => {
    jest.spyOn(Alert, 'alert').mockImplementation((_title, _msg, buttons: any) => {
      const cancelar = buttons?.find((b: any) => b.text === 'Cancelar');
      cancelar?.onPress?.(); // onPress e undefined no cancelar, nao faz nada
    });

    render(<GestaoMembros />);

    const botoesRemover = screen.getAllByText('account-remove');
    fireEvent.press(botoesRemover[0]);

    expect(screen.getByText('BRENO ENGENHARIA')).toBeTruthy();
  });
});
