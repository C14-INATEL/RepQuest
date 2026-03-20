import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface CardDeMissaoProps {
  titulo: string;
  xp: number;
  icone?: string;
  onCompletar: () => void;
}

const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

export default function CardDeMissao({ titulo, xp, icone = 'scroll', onCompletar }: CardDeMissaoProps) {
  // 1. Criamos a referência da animação (começa em 1 = visível)
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleCompletar = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // 2. Roda o Fade Out antes de remover o item
    Animated.timing(fadeAnim, {
      toValue: 0,       // Fica invisível
      duration: 400,    // 400ms de transição
      useNativeDriver: true,
    }).start(() => {
      // 3. Só remove da lista após a animação acabar
      onCompletar();
    });
  };

  return (
    // Envolvemos tudo no Animated.View para controlar a opacidade
    <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
      <Pressable
        style={({ pressed, hovered }: any) => [
          { transform: [{ scale: hovered || pressed ? 1.03 : 1 }] }
        ]}
      >
        {({ hovered, pressed }: any) => (
          <LinearGradient
            colors={hovered ? ['#fff', ZONAI_CYAN, RUPEE_GOLD] : [ZONAI_CYAN, RUPEE_GOLD]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.gradientBorder,
              (hovered || pressed) && styles.glowActive
            ]}
          >
            <View style={[styles.cardContainer, hovered && styles.cardContainerHovered]}>
              <View style={[styles.accentLine, hovered && { backgroundColor: '#fff', shadowColor: '#fff', shadowRadius: 10 }]} />
              
              <View style={styles.mainContent}>
                <View style={[
                  styles.iconWrapper, 
                  hovered && { borderColor: '#fff', backgroundColor: 'rgba(0, 255, 209, 0.2)' }
                ]}>
                  <FontAwesome5 
                    name={icone} 
                    size={18} 
                    color={hovered ? '#fff' : ZONAI_CYAN} 
                    style={styles.iconGlow} 
                  />
                </View>

                <View style={styles.textWrapper}>
                  <Text style={[
                    styles.titulo, 
                    hovered && { color: ZONAI_CYAN, textShadowColor: ZONAI_CYAN, textShadowRadius: 8 }
                  ]}>
                    {titulo.toUpperCase()}
                  </Text>
                  <View style={styles.xpRow}>
                    <FontAwesome5 name="star" size={10} color={RUPEE_GOLD} style={{ marginRight: 5 }} />
                    <Text style={styles.xpText}>{xp} RUPES DE RECOMPENSA</Text>
                  </View>
                </View>

                <Pressable 
                  onPress={handleCompletar}
                  style={({ pressed, hovered: btnHovered }: any) => [
                    styles.actionButton,
                    (btnHovered || pressed) && styles.actionButtonActive
                  ]}
                >
                  {({ pressed, hovered: btnHovered }: any) => (
                    <FontAwesome5 
                      name="bolt" 
                      size={14} 
                      color={btnHovered || pressed ? ZONAI_CYAN : "#000"} 
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    ...Platform.select({
      web: { transition: 'transform 0.2s ease-in-out' }
    })
  },
  gradientBorder: { padding: 1.5, borderRadius: 4 },
  glowActive: {
    shadowColor: ZONAI_CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 12,
  },
  cardContainer: { flexDirection: 'row', backgroundColor: '#051212', borderRadius: 3, overflow: 'hidden' },
  cardContainerHovered: { backgroundColor: '#0a1d1d' },
  accentLine: { width: 4, backgroundColor: ZONAI_CYAN, height: '100%' },
  mainContent: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 18, paddingLeft: 12 },
  iconWrapper: {
    width: 40, height: 40, borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.3)',
    justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '45deg' }], marginRight: 20,
    backgroundColor: 'rgba(0, 255, 209, 0.05)',
  },
  iconGlow: { transform: [{ rotate: '-45deg' }], textShadowColor: ZONAI_CYAN, textShadowRadius: 8 },
  textWrapper: { flex: 1 },
  titulo: { color: '#fff', fontSize: 13, fontWeight: '800', letterSpacing: 1.2, marginBottom: 4 },
  xpRow: { flexDirection: 'row', alignItems: 'center' },
  xpText: { color: RUPEE_GOLD, fontSize: 9, fontWeight: '700', letterSpacing: 1.5 },
  actionButton: {
    width: 38, height: 38, backgroundColor: ZONAI_CYAN, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center', shadowColor: ZONAI_CYAN,
    shadowRadius: 10, shadowOpacity: 0.5, marginLeft: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  actionButtonActive: { backgroundColor: '#000', borderColor: ZONAI_CYAN, transform: [{ scale: 1.1 }], shadowRadius: 20, shadowOpacity: 1 },
});