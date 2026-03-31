import { fireEvent, render, screen } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import Layout from '../app/(tabs)/_layout';

// Mocks para isolar o teste das dependências nativas ("Vibração", Ícones e Roteador)
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light' },
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return { FontAwesome5: () => <View testID="mock-icon" /> };
});

jest.mock('expo-router', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Tabs: Object.assign(
      ({ screenOptions, children }: any) => {
        // Simulamos as props que o Expo Router injeta no componente de aba
        const fakeProps = {
          accessibilityState: { selected: true },
          onPress: jest.fn(),
          children: <View />,
        };
        return (
          <View testID="tab-container">
            {screenOptions.tabBarButton(fakeProps)}
            {children}
          </View>
        );
      },
      { Screen: () => null }
    ),
  };
});

describe('Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifica se o feedback haptics é acionado corretamente ao pressionar uma aba
  it('Deve acionar o feedback haptics ao pressionar uma aba', () => {
    render(<Layout />);
    const container = screen.getByTestId('tab-container');
    const hapticTarget = container.findAll((n: { props: { onPressIn: any; }; }) => n.props.onPressIn)[0];
    
    hapticTarget.props.onPressIn();
    expect(Haptics.impactAsync).toHaveBeenCalledWith('light');
  });

  // Garante que o indicador de aba ativa é renderizado corretamente quando a aba está selecionada
  it('Deve renderizar o indicador de Runa Ativa quando a aba estiver selecionada', () => {
    const { toJSON } = render(<Layout />);
    const stringified = JSON.stringify(toJSON());
    expect(stringified).toContain('#00FFD1');
  });

  // Verifica se a estrutura das abas é renderizada sem erros
  it('Deve renderizar a estrutura das abas sem erros', () => {
    const { toJSON } = render(<Layout />);
    expect(toJSON()).not.toBeNull();
  });

  //Confirma que a função onPress é chamada corretamente ao clicar em um TabButton
  it('Deve executar a função onPress ao clicar no TabButton', () => {
    render(<Layout />);
    const container = screen.getByTestId('tab-container');
    const clickTarget = container.findAll((n: { props: { onPress: any; }; }) => n.props.onPress)[0];
    
    fireEvent.press(clickTarget);
    expect(clickTarget.props.onPress).toHaveBeenCalled();
  });
});