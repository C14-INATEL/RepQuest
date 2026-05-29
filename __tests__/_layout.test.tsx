import { fireEvent, render, screen } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform } from 'react-native';
import Layout from '../app/(tabs)/_layout';

// ------------------ Mocks ------------------

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light' },
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return { FontAwesome5: (props: any) => <View testID="mock-icon" {...props} /> };
});

let mockCapturedScreenOptions: Record<string, any> = {};
let mockCapturedScreens: any[] = [];

jest.mock('expo-router', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Tabs: Object.assign(
      ({ screenOptions, children }: any) => {
        mockCapturedScreenOptions = screenOptions;

        // Simulamos as props que o Expo Router injeta no componente de aba
        const focusedProps   = { accessibilityState: { selected: true },  onPress: jest.fn(), children: <View /> };
        const unfocusedProps = { accessibilityState: { selected: false }, onPress: jest.fn(), children: <View /> };
        const noStateProps   = { accessibilityState: undefined,           onPress: jest.fn(), children: <View /> };

        return (
          <View testID="tab-container">
            <View testID="tab-focused">  {screenOptions.tabBarButton(focusedProps)}   </View>
            <View testID="tab-unfocused">{screenOptions.tabBarButton(unfocusedProps)} </View>
            <View testID="tab-nostate"> {screenOptions.tabBarButton(noStateProps)}   </View>
            {children}
          </View>
        );
      },
      {
        Screen: (props: any) => {
          mockCapturedScreens.push(props);
          return null;
        },
      }
    ),
  };
});

// ------------------ Testes ------------------

describe('Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCapturedScreens = [];
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

  // Confirma que a função onPress é chamada corretamente ao clicar em um TabButton
  it('Deve executar a função onPress ao clicar no TabButton', () => {
    render(<Layout />);
    const container = screen.getByTestId('tab-container');
    const clickTarget = container.findAll((n: { props: { onPress: any; }; }) => n.props.onPress)[0];

    fireEvent.press(clickTarget);
    expect(clickTarget.props.onPress).toHaveBeenCalled();
  });

  // -------------------- Testes adicionais (branch coverage) --------------------

  // Correção direta da IA no teste abaixo
  it('Não deve renderizar o indicador de Runa Ativa quando a aba não estiver selecionada', () => {
    const { toJSON } = render(<Layout />);
    const unfocusedIndicator = JSON.stringify(toJSON());
    const targets = unfocusedIndicator.match(/"backgroundColor":"#00FFD1"/g) || [];
    expect(targets?.length ?? 0).toBe(1);
  });

  it('Deve aplicar estilos corretos simulando hover no TabButton', () => {
    render(<Layout />);

    const focusedTab = screen.getByTestId('tab-focused');

    const pressable = focusedTab.findAll((n: any) => n.props.onPressIn)[0];
    const style = pressable.props.style;

    // Simula o estado de hover
    const styleWhenHovered = style({ hovered: true });
    expect(styleWhenHovered).toContainEqual(expect.objectContaining({ backgroundColor: 'rgba(0, 255, 209, 0.05)' }));
    expect(styleWhenHovered).toContainEqual(expect.objectContaining({ transform: [{ scale: 1.1 }] }));

    // Simula o estado normal (não hover)
    const styleWhenNotHovered = style({ hovered: false });
    expect(styleWhenNotHovered).not.toContainEqual(expect.objectContaining({ backgroundColor: 'rgba(0, 255, 209, 0.05)' }));
    expect(styleWhenNotHovered).toContainEqual(expect.objectContaining({ transform: [{ scale: 1 }] }));
  });

  it('Deve testar tabBarIcon para todas telas (focado e não focado)', () => {
    render(<Layout />);
    expect(mockCapturedScreens.length).toBe(4);

    mockCapturedScreens.forEach((screen) => {
      const tabBarIcon = screen.options.tabBarIcon;

      // Simula o estado focado
      const { toJSON: toJSONFocused } = render(
        tabBarIcon({ color: 'black', focused: true })
      );
      const focusedProps = toJSONFocused() as any;
      expect(focusedProps.props.style).toBeDefined();
      expect(focusedProps.props.style.textShadowColor).toBe('#00FFD1');

      const { toJSON: toJSONUnfocused } = render(
        tabBarIcon({ color: 'black', focused: false })
      );
      const unfocusedProps = toJSONUnfocused() as any;

      expect(unfocusedProps.props.style).toBeFalsy();
    });
  });

  it('Deve tratar accessibilityState undefined como focused=false (sem indicador ativo)', () => {
    render(<Layout />);
    const noStateTab = screen.getByTestId('tab-nostate');
    const targets = noStateTab.findAll(() => true);
    const hasIndicator = targets.some(
      (n: any) => n.props?.style?.backgroundColor === '#00FFD1'
    );
    expect(hasIndicator).toBe(false);
  });
});

// ------------------ Testes Mobile ------------------

describe('Layout - Mobile Android', () => {
  beforeEach(() => {
    mockCapturedScreenOptions = {};
    jest.clearAllMocks();
    Object.defineProperty(Platform, 'OS', {
      get: () => 'android',
      configurable: true,
    });
  });

  it('Deve aplicar altura 70 e paddingBottom 0 no tabBarStyle para Android', () => {
    render(<Layout />);

    const style = mockCapturedScreenOptions.tabBarStyle;
    expect(style).toBeDefined();
    expect(style.height).toBe(70);
    expect(style.paddingBottom).toBe(0);
  });
});

describe('Layout - Mobile iOS', () => {
  beforeEach(() => {
    mockCapturedScreenOptions = {};
    jest.clearAllMocks();
    Object.defineProperty(Platform, 'OS', {
      get: () => 'ios',
      configurable: true,
    });
  });

  it('Deve aplicar altura 88 e paddingBottom 28 no tabBarStyle para iOS', () => {
    render(<Layout />);

    const style = mockCapturedScreenOptions.tabBarStyle;
    expect(style).toBeDefined();
    expect(style.height).toBe(88);
    expect(style.paddingBottom).toBe(28);
  });
});