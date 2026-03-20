import { Slot } from 'expo-router';
import { RepProvider } from '../contexts/RepContext';

export default function RootLayout() {
  return (
    <RepProvider>
      <Slot />
    </RepProvider>
  );
}