import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { ActivityIndicator, LayoutAnimation, TextInput } from 'react-native';

import MissoesScreen from '../app/(tabs)/index';

const mockUseRep = jest.fn();
const mockPlayAsync = jest.fn().mockResolvedValue(undefined);
const mockCreateAsync = jest.fn().mockResolvedValue({
  sound: { playAsync: mockPlayAsync },
});

jest.mock('../contexts/RepContext', () => ({
  useRep: () => mockUseRep(),
}));

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: (...args: unknown[]) => mockCreateAsync(...args),
    },
  },
}));

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    LinearGradient: ({ children, ...props }: any) => React.createElement(View, props, children),
  };
});

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  const Icon = ({ name }: { name: string }) => <Text>{name}</Text>;

  return {
    FontAwesome5: Icon,
    MaterialCommunityIcons: Icon,
  };
});

jest.mock('../components/CardDeMissao', () => ({
  __esModule: true,
  default: ({ titulo, xp, onCompletar }: { titulo: string; xp: number; onCompletar: () => void }) => {
    const { Pressable, Text, View } = require('react-native');

    return (
      <View>
        <Text>{titulo}</Text>
        <Text>{`${xp} RUPES DE RECOMPENSA`}</Text>
        <Pressable onPress={onCompletar}>
          <Text>{`Concluir ${titulo}`}</Text>
        </Pressable>
      </View>
    );
  },
}));

type Missao = {
  id: string;
  titulo: string;
  xp: number;
  icone: string;
};

type RepState = {
  totalRupes: number;
  ganharRupes: jest.Mock;
  missoes: Missao[];
  setMissoesGlobal: jest.Mock;
  loading: boolean;
};

const createRepState = (overrides: Partial<RepState> = {}): RepState => ({
  totalRupes: 1250,
  ganharRupes: jest.fn(),
  missoes: [
    { id: '1', titulo: 'Treinar espada', xp: 75, icone: 'scroll' },
    { id: '2', titulo: 'Explorar templo', xp: 120, icone: 'map' },
  ],
  setMissoesGlobal: jest.fn(),
  loading: false,
  ...overrides,
});

const renderScreen = (overrides: Partial<RepState> = {}) => {
  const repState = createRepState(overrides);
  mockUseRep.mockReturnValue(repState);

  return {
    repState,
    ...render(React.createElement(MissoesScreen)),
  };
};

describe('MissoesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(LayoutAnimation, 'configureNext').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Primeiro cenario: a tela ainda esta esperando os dados.
  // Nesse momento, ela deve mostrar so o loading.
  it('exibe um indicador de carregamento enquanto os dados do contexto ainda nao chegaram', () => {
    const { UNSAFE_getByType, queryByText } = renderScreen({ loading: true });

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    expect(queryByText('Mural da Casa')).toBeNull();
    expect(queryByText('REGISTRO DE AVENTURAS')).toBeNull();
  });

  // Aqui a ideia e validar a tela "normal":
  // cabecalho, saldo e missoes aparecendo como esperado.
  it('renderiza o cabecalho e as missoes vindas do contexto global', () => {
    const { repState } = renderScreen({ totalRupes: 1575 });

    expect(screen.getByText('REGISTRO DE AVENTURAS')).toBeTruthy();
    expect(screen.getByText('Mural da Casa')).toBeTruthy();
    expect(screen.getByText(`${repState.totalRupes.toLocaleString()} RUPES`)).toBeTruthy();
    expect(screen.getByText('Treinar espada')).toBeTruthy();
    expect(screen.getByText('Explorar templo')).toBeTruthy();
  });

  // Esse teste olha para a acao principal da tela.
  // Concluir a missao precisa atualizar tudo que importa.
  it('conclui uma missao, toca o som de sucesso, atualiza o contexto e exibe a recompensa', async () => {
    const scheduledCallbacks: Array<() => void> = [];
    jest.spyOn(global, 'setTimeout').mockImplementation(((callback: TimerHandler) => {
      if (typeof callback === 'function') {
        scheduledCallbacks.push(callback as () => void);
      }

      return 0 as unknown as ReturnType<typeof setTimeout>;
    }) as typeof setTimeout);

    const { repState } = renderScreen();

    await act(async () => {
      fireEvent.press(screen.getByText('Concluir Treinar espada'));
    });

    expect(mockCreateAsync).toHaveBeenCalledTimes(1);
    expect(mockPlayAsync).toHaveBeenCalledTimes(1);
    expect(repState.ganharRupes).toHaveBeenCalledWith(75);
    expect(repState.setMissoesGlobal).toHaveBeenCalledWith([repState.missoes[1]]);
    expect(screen.getByText('RECOMPENSA: +75 RUPES RESGATADAS!')).toBeTruthy();

    act(() => {
      scheduledCallbacks.forEach((callback) => callback());
    });
  });

  // Por fim, cobrimos o formulario do modal.
  // Ele nao pode salvar sem titulo e deve usar 50 como valor padrao.
  it('impede salvar sem titulo e cria uma nova missao com valor padrao quando o campo de rupes fica vazio', () => {
    const { repState, UNSAFE_getAllByType, queryByText } = renderScreen();

    fireEvent.press(screen.getByText('plus'));

    expect(screen.getByText('Novo Registro')).toBeTruthy();

    fireEvent.press(screen.getByText('ATIVAR'));

    expect(repState.setMissoesGlobal).not.toHaveBeenCalled();
    expect(screen.getByText('Novo Registro')).toBeTruthy();

    const [tituloInput] = UNSAFE_getAllByType(TextInput);
    fireEvent.changeText(tituloInput, 'Nova missao');
    fireEvent.press(screen.getByText('ATIVAR'));

    expect(repState.setMissoesGlobal).toHaveBeenCalledWith([
      expect.objectContaining({
        id: expect.any(String),
        titulo: 'Nova missao',
        xp: 50,
        icone: 'scroll',
      }),
      ...repState.missoes,
    ]);
    expect(queryByText('Novo Registro')).toBeNull();

    fireEvent.press(screen.getByText('plus'));

    const reopenedInputs = UNSAFE_getAllByType(TextInput);
    expect(reopenedInputs[0].props.value).toBe('');
    expect(reopenedInputs[1].props.value).toBe('');
  });
});
