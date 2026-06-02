import { useRep } from '../contexts/RepContext';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function IndexGatekeeper() {
  const { nomeUsuario, loading } = useRep();

  if (loading) return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#00FFD1" size="large" />
    </View>
  );

  // Se o nome ainda é o padrão, o usuário nunca passou pelo onboarding
  const hasOnboarded = nomeUsuario !== 'Aventureiro';

  return <Redirect href={hasOnboarded ? '/(tabs)' : '/onboarding/role-select'} />;
}
