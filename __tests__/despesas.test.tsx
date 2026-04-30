import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { LayoutAnimation } from "react-native";

import DespesasScreen from "../app/(tabs)/despesas";

const mockUseRep = jest.fn();

jest.mock("../contexts/RepContext", () => ({
  useRep: () => mockUseRep(),
}));

jest.mock("expo-font", () => ({
  useFonts: () => [true],
}));

jest.mock("expo-linear-gradient", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    LinearGradient: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
  };
});

jest.mock("react-native/Libraries/Image/ImageBackground", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    __esModule: true,
    default: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
  };
});

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  const Icon = ({ name }: { name: string }) => <Text>{name}</Text>;

  return {
    FontAwesome5: Icon,
    MaterialCommunityIcons: Icon,
  };
});

type Despesa = {
  id: string;
  titulo: string;
  valor: number;
  categoria: string;
  icon: string;
};

type RepState = {
  totalRupes: number;
  gastarRupes: jest.Mock;
  despesas: Despesa[];
  setDespesasGlobal: jest.Mock;
  loading: boolean;
};

const createRepState = (overrides: Partial<RepState> = {}): RepState => ({
  totalRupes: 1250,
  gastarRupes: jest.fn(),
  despesas: [
    {
      id: "1",
      titulo: "Internet",
      valor: 100,
      categoria: "coins",
      icon: "coins",
    },
    {
      id: "2",
      titulo: "Energia",
      valor: 200,
      categoria: "coins",
      icon: "coins",
    },
  ],
  setDespesasGlobal: jest.fn(),
  loading: false,
  ...overrides,
});

const renderScreen = (overrides: Partial<RepState> = {}) => {
  const repState = createRepState(overrides);
  mockUseRep.mockReturnValue(repState);

  return {
    repState,
    ...render(<DespesasScreen />),
  };
};

let randomSpy: jest.SpyInstance;

describe("DespesasScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(LayoutAnimation, "configureNext").mockImplementation(() => {});
    randomSpy = jest.spyOn(Math, "random");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renderiza a tela corretamente", () => {
    renderScreen();

    expect(screen.getByText("Tesouro da Casa")).toBeTruthy();
    expect(screen.getByText("INVENTÁRIO DE DÉBITOS")).toBeTruthy();
    expect(screen.getByText("TOTAL A RECOLHER")).toBeTruthy();
  });

  it("exibe um indicador de carregamento enquanto os dados do contexto ainda nao chegaram", () => {
    renderScreen({ loading: true });

    expect(screen.getByText("CARREGANDO TESOURO...")).toBeTruthy();
    expect(screen.queryByText("Tesouro da Casa")).toBeNull();
    expect(screen.queryByText("INVENTÁRIO DE DÉBITOS")).toBeNull();
  });

  it("renderiza o cabecalho, saldo, total da divida e despesas vindas do contexto global", () => {
    const { repState } = renderScreen({ totalRupes: 1575 });

    expect(screen.getByText("INVENTÁRIO DE DÉBITOS")).toBeTruthy();
    expect(screen.getByText("Tesouro da Casa")).toBeTruthy();
    expect(
      screen.getByText(
        `SALDO ATUAL: ${repState.totalRupes.toLocaleString()} R`,
      ),
    ).toBeTruthy();
    expect(screen.getByText("TOTAL A RECOLHER")).toBeTruthy();
    expect(screen.getByText("300")).toBeTruthy();
    expect(screen.getByText("INTERNET")).toBeTruthy();
    expect(screen.getByText("ENERGIA")).toBeTruthy();
  });

  it("calcula corretamente o total das despesas", () => {
    renderScreen({
      despesas: [
        {
          id: "1",
          titulo: "Internet",
          valor: 100,
          categoria: "coins",
          icon: "coins",
        },
        {
          id: "2",
          titulo: "Energia",
          valor: 200,
          categoria: "coins",
          icon: "coins",
        },
        {
          id: "3",
          titulo: "Água",
          valor: 50,
          categoria: "coins",
          icon: "coins",
        },
      ],
    });

    expect(screen.getByText("350")).toBeTruthy();
  });

  it("paga uma despesa, atualiza o saldo e remove o item da lista global", async () => {
    const { repState } = renderScreen();

    await act(async () => {
      fireEvent.press(screen.getByTestId("pagar-despesa-1"));
    });

    expect(repState.gastarRupes).toHaveBeenCalledTimes(1);
    expect(repState.gastarRupes).toHaveBeenCalledWith(100);
    expect(repState.setDespesasGlobal).toHaveBeenCalledTimes(1);
    expect(repState.setDespesasGlobal).toHaveBeenCalledWith([
      repState.despesas[1],
    ]);
  });

  it("abre o modal ao clicar no botao flutuante", () => {
    renderScreen();

    fireEvent.press(screen.getByTestId("fab-add-despesa"));

    expect(screen.getByText("Novo Débito")).toBeTruthy();
    expect(screen.getByTestId("btn-registrar")).toBeTruthy();
    expect(screen.getByTestId("btn-descartar")).toBeTruthy();
  });

  it("fecha o modal ao clicar em DESCARTAR", () => {
    renderScreen();

    fireEvent.press(screen.getByTestId("fab-add-despesa"));
    expect(screen.getByText("Novo Débito")).toBeTruthy();

    fireEvent.press(screen.getByTestId("btn-descartar"));

    expect(screen.queryByText("Novo Débito")).toBeNull();
  });

  it("impede salvar sem preencher os campos do modal", () => {
    const { repState } = renderScreen();

    fireEvent.press(screen.getByTestId("fab-add-despesa"));

    expect(screen.getByText("Novo Débito")).toBeTruthy();

    fireEvent.press(screen.getByTestId("btn-registrar"));

    expect(repState.setDespesasGlobal).not.toHaveBeenCalled();
    expect(screen.getByText("Novo Débito")).toBeTruthy();
  });

  it("impede salvar quando apenas o titulo e preenchido", () => {
    const { repState } = renderScreen();

    fireEvent.press(screen.getByTestId("fab-add-despesa"));

    fireEvent.changeText(
      screen.getByPlaceholderText("DESCRIÇÃO DA DESPESA..."),
      "Aluguel",
    );

    fireEvent.press(screen.getByTestId("btn-registrar"));

    expect(repState.setDespesasGlobal).not.toHaveBeenCalled();
    expect(screen.getByText("Novo Débito")).toBeTruthy();
  });

  it("impede salvar quando apenas o valor e preenchido", () => {
    const { repState } = renderScreen();

    fireEvent.press(screen.getByTestId("fab-add-despesa"));

    fireEvent.changeText(
      screen.getByPlaceholderText("VALOR EM RÚPIAS..."),
      "450",
    );

    fireEvent.press(screen.getByTestId("btn-registrar"));

    expect(repState.setDespesasGlobal).not.toHaveBeenCalled();
    expect(screen.getByText("Novo Débito")).toBeTruthy();
  });

  it("cria uma nova despesa ao preencher titulo e valor", () => {
    randomSpy.mockReturnValue(0.123456789);

    const { repState } = renderScreen();

    fireEvent.press(screen.getByTestId("fab-add-despesa"));

    expect(screen.getByText("Novo Débito")).toBeTruthy();

    fireEvent.changeText(
      screen.getByPlaceholderText("DESCRIÇÃO DA DESPESA..."),
      "Aluguel",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("VALOR EM RÚPIAS..."),
      "450",
    );

    fireEvent.press(screen.getByTestId("btn-registrar"));

    expect(repState.setDespesasGlobal).toHaveBeenCalledTimes(1);
    expect(repState.setDespesasGlobal).toHaveBeenCalledWith([
      expect.objectContaining({
        id: expect.any(String),
        titulo: "Aluguel",
        valor: 450,
        categoria: "coins",
        icon: "coins",
      }),
      ...repState.despesas,
    ]);

    expect(screen.queryByText("Novo Débito")).toBeNull();
  });

  it("limpa os campos apos adicionar uma nova despesa", () => {
    randomSpy.mockReturnValue(0.123456789);

    renderScreen();

    fireEvent.press(screen.getByTestId("fab-add-despesa"));

    fireEvent.changeText(
      screen.getByPlaceholderText("DESCRIÇÃO DA DESPESA..."),
      "Aluguel",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("VALOR EM RÚPIAS..."),
      "450",
    );

    fireEvent.press(screen.getByTestId("btn-registrar"));

    fireEvent.press(screen.getByTestId("fab-add-despesa"));

    expect(
      screen.getByPlaceholderText("DESCRIÇÃO DA DESPESA...").props.value,
    ).toBe("");
    expect(
      screen.getByPlaceholderText("VALOR EM RÚPIAS...").props.value,
    ).toBe("");
  });

  it("adiciona a nova despesa no inicio da lista enviada ao contexto", () => {
    randomSpy.mockReturnValue(0.987654321);

    const { repState } = renderScreen();

    fireEvent.press(screen.getByTestId("fab-add-despesa"));

    fireEvent.changeText(
      screen.getByPlaceholderText("DESCRIÇÃO DA DESPESA..."),
      "Condomínio",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("VALOR EM RÚPIAS..."),
      "300",
    );

    fireEvent.press(screen.getByTestId("btn-registrar"));

    const listaEnviada = repState.setDespesasGlobal.mock.calls[0][0];

    expect(listaEnviada[0]).toMatchObject({
      titulo: "Condomínio",
      valor: 300,
      categoria: "coins",
      icon: "coins",
    });
  });
});
