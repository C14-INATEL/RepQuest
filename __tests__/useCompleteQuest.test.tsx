/**
 * Testes Unitários - useCompleteQuest (hooks/)
 *
 * Cenário: hook de conclusão de quest com atribuição de recompensa
 * Mock utilizado: callbacks de atualização de estado (updateQuest / updateMember)
 */

// ─── Tipos do projeto ─────────────────────────────────────────────────────
interface Quest {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
  assignedTo: string | null;
}

interface Member {
  id: string;
  name: string;
  rupees: number;
  level: number;
}

// ─── Lógica do hook (espelha hooks/useCompleteQuest.ts) ───────────────────
function completeQuest(
  quest: Quest,
  member: Member,
  updateQuest: (q: Quest) => void,
  updateMember: (m: Member) => void,
): void {
  if (quest.completed) {
    throw new Error("Quest já concluída.");
  }
  if (quest.assignedTo !== member.name) {
    throw new Error("Este herói não é responsável pela quest.");
  }

  updateQuest({ ...quest, completed: true });
  updateMember({ ...member, rupees: member.rupees + quest.reward });
}

// ─── Testes ───────────────────────────────────────────────────────────────
describe("useCompleteQuest – regras de negócio", () => {
  const mockUpdateQuest = jest.fn();
  const mockUpdateMember = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve concluir a quest e creditar Rúpias ao membro responsável", () => {
    const quest: Quest = {
      id: "q1",
      title: "Lavar a louça",
      reward: 25,
      completed: false,
      assignedTo: "Link",
    };
    const member: Member = { id: "m1", name: "Link", rupees: 50, level: 2 };

    completeQuest(quest, member, mockUpdateQuest, mockUpdateMember);

    expect(mockUpdateQuest).toHaveBeenCalledWith({ ...quest, completed: true });
    expect(mockUpdateMember).toHaveBeenCalledWith({ ...member, rupees: 75 });
  });

  it("deve lançar erro e não atualizar estado se a quest já foi concluída", () => {
    const quest: Quest = {
      id: "q2",
      title: "Varrer a sala",
      reward: 15,
      completed: true,
      assignedTo: "Zelda",
    };
    const member: Member = { id: "m2", name: "Zelda", rupees: 100, level: 3 };

    expect(() =>
      completeQuest(quest, member, mockUpdateQuest, mockUpdateMember),
    ).toThrow("Quest já concluída.");

    expect(mockUpdateQuest).not.toHaveBeenCalled();
    expect(mockUpdateMember).not.toHaveBeenCalled();
  });
});
