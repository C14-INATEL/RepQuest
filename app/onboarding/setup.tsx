import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler'; // Melhor para inputs em listas/scrolls

const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export default function OnboardingSubFlow() {
  const router = useRouter();
  const { mode } = useLocalSearchParams();
  
  const [step, setStep] = useState<'create' | 'join'>('create');
  const [nomeRep, setNomeRep] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    if (mode === 'join') setStep('join');
    else setStep('create');
  }, [mode]);

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = (fontsLoaded ? { fontFamily: 'ZeldaFont' } : {}) as TextStyle;

  // Função para voltar com alerta de segurança
  const handleBack = () => {
    if (nomeRep.length > 0 || inviteCode.length > 0) {
      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Alert.alert(
        "Abandonar Missão?",
        "Os dados inseridos serão perdidos ao voltar para o mapa anterior.",
        [
          { text: "Ficar", style: "cancel" },
          { text: "Sair", onPress: () => router.back(), style: "destructive" }
        ]
      );
    } else {
      router.back();
    }
  };

  const handleAction = () => {
  if (Platform.OS !== 'web') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
  
  if (step === 'create') {
    console.log("Consagrando República:", nomeRep);
    // Aqui vamos mandar para a tela de SUCESSO que vamos criar
    // Ela vai mostrar o código para o Admin
    router.push('/onboarding/success?type=admin'); 
  } else {
    console.log("Sintonizando com código:", inviteCode);
    // Aqui, após validar o código, mandamos direto para o Mural
    // Usamos replace para o usuário não conseguir "voltar" pro onboarding
    router.replace('/(tabs)'); 
  }
};

  const currentIcon: IconName = step === 'create' ? 'castle' : 'key-variant';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ImageBackground source={require('../../assets/images/sheikah-bg.jpg')} style={StyleSheet.absoluteFillObject}>
        <LinearGradient colors={['rgba(0,0,0,0.95)', 'rgba(0,25,25,0.85)', 'rgba(0,0,0,1)']} style={StyleSheet.absoluteFillObject} />

        {/* BOTÃO VOLTAR ESTILO IOS (Top Left) */}
        <Pressable 
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && { opacity: 0.6, transform: [{ scale: 0.95 }] }
          ]}
        >
          <LinearGradient 
            colors={['rgba(0, 255, 209, 0.15)', 'transparent']} 
            style={styles.backGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <FontAwesome5 name="chevron-left" size={16} color={ZONAI_CYAN} />
            <Text style={[styles.backText, fontStyle]}>VOLTAR</Text>
          </LinearGradient>
        </Pressable>

        <View style={styles.content}>
          
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons 
              name={currentIcon} 
              size={50} 
              color={step === 'create' ? ZONAI_CYAN : RUPEE_GOLD} 
            />
          </View>

          <Text style={[styles.title, fontStyle]}>
            {step === 'create' ? 'Fundar República' : 'Sincronizar Pad'}
          </Text>
          
          <Text style={styles.subtitle}>
            {step === 'create' 
              ? 'DÊ UM NOME DIGNO À SUA NOVA ALDEIA EM SANTA RITA' 
              : 'INSIRA O CÓDIGO SAGRADO PARA ENTRAR NA VILA'
            }
          </Text>

          <View style={styles.form}>
            {step === 'create' ? (
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>NOME DA REPÚBLICA</Text>
                <TextInput
                  style={styles.input}
                  placeholder="EX: REPÚBLICA DOS SÁBIOS"
                  placeholderTextColor="rgba(0, 255, 209, 0.2)"
                  value={nomeRep}
                  onChangeText={setNomeRep}
                  autoCapitalize="characters"
                />
              </View>
            ) : (
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>CÓDIGO DE CONVITE</Text>
                <TextInput
                  style={[styles.input, { color: RUPEE_GOLD, fontSize: 24, textAlign: 'center' }]}
                  placeholder="SAB-0000"
                  placeholderTextColor="rgba(252, 172, 3, 0.2)"
                  value={inviteCode}
                  onChangeText={setInviteCode}
                  maxLength={8}
                  autoCapitalize="characters"
                />
              </View>
            )}

            <Pressable 
              onPress={handleAction}
              style={({ hovered, pressed }) => [
                styles.actionBtn,
                (hovered || pressed) ? styles.btnActive : null
              ] as ViewStyle[]}
            >
              <LinearGradient 
                colors={step === 'create' ? [ZONAI_CYAN, '#004d4d'] : [RUPEE_GOLD, '#8b5e00']} 
                style={styles.btnGradient}
              >
                <Text style={[styles.btnText, fontStyle]}>
                  {step === 'create' ? 'CONSAGRAR VILA' : 'SINCRONIZAR'}
                </Text>
                <FontAwesome5 name="bolt" size={14} color="#000" style={{ marginLeft: 10 }} />
              </LinearGradient>
            </Pressable>

            <Pressable onPress={() => setStep(step === 'create' ? 'join' : 'create')}>
               <Text style={styles.switchText}>
                 {step === 'create' ? 'JÁ POSSUO UM CÓDIGO' : 'QUERO FUNDAR UMA REPÚBLICA'}
               </Text>
            </Pressable>
          </View>

        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, paddingHorizontal: 35, justifyContent: 'center', alignItems: 'center' },
  
  // BOTÃO VOLTAR
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 209, 0.2)',
  },
  backGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backText: {
    color: ZONAI_CYAN,
    fontSize: 10,
    marginLeft: 10,
    letterSpacing: 2,
  },

  iconWrapper: { 
    width: 100, height: 100, borderRadius: 50, 
    borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.3)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 25,
    backgroundColor: 'rgba(0, 255, 209, 0.05)'
  },
  title: { color: '#fff', fontSize: 32, textAlign: 'center' },
  subtitle: { color: 'rgba(255,255,255,0.5)', fontSize: 9, letterSpacing: 3, textAlign: 'center', marginTop: 10, lineHeight: 16 },
  
  form: { width: '100%', marginTop: 50 },
  inputBox: { marginBottom: 30 },
  inputLabel: { color: ZONAI_CYAN, fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 12, textAlign: 'center' },
  input: { 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.2)', 
    borderRadius: 4, padding: 18, color: '#fff', fontSize: 16, 
    textAlign: 'center', letterSpacing: 2 
  },
  
  actionBtn: { borderRadius: 4, overflow: 'hidden' },
  btnActive: { transform: [{ scale: 1.02 }], shadowColor: ZONAI_CYAN, shadowRadius: 15, shadowOpacity: 0.6 },
  btnGradient: { flexDirection: 'row', paddingVertical: 20, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#000', fontSize: 14, letterSpacing: 3 },
  
  switchText: { color: 'rgba(255,255,255,0.3)', fontSize: 10, textAlign: 'center', marginTop: 30, letterSpacing: 1, textDecorationLine: 'underline' }
});