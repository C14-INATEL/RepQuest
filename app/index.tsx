import { Redirect } from 'expo-router';
import { useRep } from '../contexts/RepContext'; // Ajuste o caminho se necessário

export default function IndexGatekeeper() {
  const { totalRupes } = useRep();

  // LÓGICA TEMPORÁRIA: 
  // Se o usuário não tem rúpias (ou seja, nunca usou o app), 
  // mandamos para o Role Select.
  // Caso contrário, ele já é um morador e vai direto para o Feed (tabs).
  
  const hasRepublic = false; // Aqui você trocará por uma lógica real de banco depois

  if (!hasRepublic) {
    return <Redirect href="/onboarding/role-select" />;
  }

  return <Redirect href="/(tabs)" />;
}