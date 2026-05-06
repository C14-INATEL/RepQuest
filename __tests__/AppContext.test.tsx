/**
 * Testes Unitários - AppContext (contexts/)
 *
 * Cenário: persistência de dados via AsyncStorage
 * Mock utilizado: @react-native-async-storage/async-storage
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Mock do AsyncStorage ─────────────────────────────────────────────────
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// ─── Tipos do projeto ─────────────────────────────────────────────────────
interface Member {
  id: string;
  name: string;
  rupees: number;
  level: number;
  githubUrl: string;
}

interface Quest {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
  assignedTo: string | null;
}

// ─── Funções do contexto (espelham contexts/AppContext.tsx) ───────────────
const MEMBERS_KEY = "@repquest:members";
const QUESTS_KEY = "@repquest:quests";

async function persistMembers(members: Member[]): Promise<void> {
  await AsyncStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

async function loadQuests(): Promise<Quest[]> {
  const raw = await AsyncStorage.getItem(QUESTS_KEY);
  return raw ? (JSON.parse(raw) as Quest[]) : [];
}

// ─── Testes ───────────────────────────────────────────────────────────────
describe("AppContext – persistência com AsyncStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve salvar membros no AsyncStorage com a chave e formato corretos", async () => {
    const members: Member[] = [
      {
        id: "m1",
        name: "Link",
        rupees: 120,
        level: 4,
        githubUrl: "https://github.com/link",
      },
      {
        id: "m2",
        name: "Zelda",
        rupees: 200,
        level: 6,
        githubUrl: "https://github.com/zelda",
      },
    ];

    await persistMembers(members);

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      MEMBERS_KEY,
      JSON.stringify(members),
    );
  });

  it("deve retornar array vazio quando não houver quests salvas no AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const result = await loadQuests();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(QUESTS_KEY);
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
