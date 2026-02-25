import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';

const { width } = Dimensions.get('window');
const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

export default function RoleSelectScreen() {
  const router = useRouter(); 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = (fontsLoaded ? { fontFamily: 'ZeldaFont' } : {}) as TextStyle;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true })
    ]).start();
  }, []);

  const handleChoice = (role: 'admin' | 'membro') => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    if (role === 'admin') {
      router.push('/onboarding/setup?mode=create');
    } else {
      router.push('/onboarding/setup?mode=join');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/sheikah-bg.jpg')} 
        style={StyleSheet.absoluteFillObject}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.9)', 'rgba(0,40,40,0.8)', 'rgba(0,0,0,1)']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* BOTÃO VOLTAR ESTILO IOS (Top Left) */}
        <Pressable 
          onPress={() => {
            if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
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

        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          
          <View style={styles.header}>
            <MaterialCommunityIcons name="compass" size={30} color={ZONAI_CYAN} />
            <Text style={[styles.title, fontStyle]}>Escolha o seu Destino</Text>
            <Text style={styles.subtitle}>COMO IRÁ ATUAR NA REPÚBLICA?</Text>
          </View>

          <View style={styles.cardsContainer}>
            
            {/* OPÇÃO: ADMIN (FUNDADOR) */}
            <Pressable 
              onPress={() => handleChoice('admin')}
              style={({ hovered, pressed }) => [
                styles.roleCard,
                hovered ? styles.cardHover : null,
                pressed ? styles.cardPressed : null
              ] as ViewStyle[]}
            >
              <LinearGradient colors={['rgba(0, 255, 209, 0.15)', 'transparent']} style={styles.cardGradient}>
                <View style={styles.iconCircle}>
                  <FontAwesome5 name="fort-awesome" size={32} color={ZONAI_CYAN} />
                </View>
                <Text style={[styles.cardTitle, fontStyle]}>Fundar República</Text>
                <Text style={styles.cardDesc}>
                  Serei o Patriarca. Vou gerir membros, criar missões e controlar o tesouro.
                </Text>
                <View style={styles.roleTag}>
                  <Text style={styles.tagText}>ADMINISTRADOR</Text>
                </View>
              </LinearGradient>
            </Pressable>

            {/* OPÇÃO: MEMBRO (GUERREIRO) */}
            <Pressable 
              onPress={() => handleChoice('membro')}
              style={({ hovered, pressed }) => [
                styles.roleCard,
                hovered ? styles.cardHover : null,
                pressed ? styles.cardPressed : null
              ] as ViewStyle[]}
            >
              <LinearGradient colors={['rgba(252, 172, 3, 0.1)', 'transparent']} style={styles.cardGradient}>
                <View style={[styles.iconCircle, { borderColor: RUPEE_GOLD }]}>
                  <FontAwesome5 name="shield-alt" size={32} color={RUPEE_GOLD} />
                </View>
                <Text style={[styles.cardTitle, fontStyle, { color: RUPEE_GOLD }]}>Entrar numa Vila</Text>
                <Text style={styles.cardDesc}>
                  Serei um morador. Vou cumprir quests, ganhar rúpias e subir no ranking.
                </Text>
                <View style={[styles.roleTag, { backgroundColor: RUPEE_GOLD }]}>
                  <Text style={[styles.tagText, { color: '#000' }]}>INTEGRANTE</Text>
                </View>
              </LinearGradient>
            </Pressable>

          </View>

          <Text style={styles.footerNote}>
            O destino escolhido definirá as suas runas no Purah Pad.
          </Text>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  
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

  header: { alignItems: 'center', marginBottom: 50 },
  title: { color: '#fff', fontSize: 36, textAlign: 'center', marginTop: 15 },
  subtitle: { color: ZONAI_CYAN, fontSize: 10, letterSpacing: 4, marginTop: 5 },
  cardsContainer: { gap: 25 },
  roleCard: { borderRadius: 8, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.5)' },
  cardHover: { borderColor: ZONAI_CYAN, shadowColor: ZONAI_CYAN, shadowRadius: 20, shadowOpacity: 0.3 },
  cardPressed: { transform: [{ scale: 0.98 }] },
  cardGradient: { padding: 25, alignItems: 'center' },
  iconCircle: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: ZONAI_CYAN, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  cardTitle: { color: ZONAI_CYAN, fontSize: 22, marginBottom: 10 },
  cardDesc: { color: 'rgba(255,255,255,0.6)', fontSize: 12, textAlign: 'center', lineHeight: 18, paddingHorizontal: 10 },
  roleTag: { marginTop: 20, backgroundColor: ZONAI_CYAN, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 2 },
  tagText: { color: '#000', fontSize: 9, fontWeight: '900', letterSpacing: 2 },
  footerNote: { color: 'rgba(255,255,255,0.3)', fontSize: 10, textAlign: 'center', marginTop: 50, letterSpacing: 1 },
});