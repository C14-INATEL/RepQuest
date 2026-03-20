import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Importação necessária para navegar
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View
} from 'react-native';

// Importando a memória do app
import { useRep } from '../../contexts/RepContext';

const { width } = Dimensions.get('window');
const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

export default function PerfilScreen() {
  const router = useRouter();
  const { totalRupes, missoes, loading } = useRep();

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = (fontsLoaded ? { fontFamily: 'ZeldaFont' } : {}) as TextStyle;

  // GAMIFICAÇÃO: Sistema de Níveis Dinâmico
  const xpPorNivel = 500;
  const nivelAtual = Math.floor(totalRupes / xpPorNivel) + 1;
  const xpAtual = totalRupes % xpPorNivel;
  const progressoBarra = (xpAtual / xpPorNivel) * 100;

  const badges = [
    { id: 1, icon: 'shield-star', color: RUPEE_GOLD, unlocked: nivelAtual >= 1 },
    { id: 2, icon: 'sword-cross', color: ZONAI_CYAN, unlocked: nivelAtual >= 2 },
    { id: 3, icon: 'flash', color: '#fff', unlocked: nivelAtual >= 3 },
  ];

  const handleLinkPress = (url: string) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={ZONAI_CYAN} />
        <Text style={[styles.loadingText, fontStyle]}>Sincronizando Purah Pad...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/sheikah-bg.jpg')} 
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.97)', 'rgba(0,35,35,0.88)', 'rgba(0,0,0,0.99)']}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.ambientGlow} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER COM AVATAR MÍSTICO */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.sheikahRing} />
              <LinearGradient colors={[ZONAI_CYAN, RUPEE_GOLD]} style={styles.avatarGlow}>
                <View style={styles.avatarInner}>
                  <FontAwesome5 name="user-astronaut" size={50} color={ZONAI_CYAN} style={styles.avatarIconGlow} />
                </View>
              </LinearGradient>
              <View style={styles.levelBadge}>
                <Text style={[styles.levelText, fontStyle]}>NÍVEL 0{nivelAtual}</Text>
              </View>
            </View>

            <Text style={[styles.userName, fontStyle]}>Eduardo Bertozzi</Text>
            
            <View style={styles.locationWrapper}>
              <MaterialCommunityIcons name="map-marker-radius" size={14} color={ZONAI_CYAN} />
              <Text style={styles.userLocation}>INATEL • SANTA RITA DO SAPUCAÍ</Text>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>PROGRESSO DA RUNA</Text>
                <Text style={styles.progressValue}>{xpAtual} / {xpPorNivel} R</Text>
              </View>
              <View style={styles.progressBarBg}>
                <LinearGradient 
                  colors={[ZONAI_CYAN, RUPEE_GOLD]} 
                  start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                  style={[styles.progressBarFill, { width: `${progressoBarra}%` }]} 
                />
              </View>
            </View>
          </View>

          {/* GRID DE STATUS */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, fontStyle]}>{totalRupes.toLocaleString()}</Text>
              <Text style={[styles.statLabel, fontStyle]}>RUPES TOTAIS</Text>
              <MaterialCommunityIcons name="triforce" size={24} color={RUPEE_GOLD} style={styles.boxIcon} />
            </View>

            <View style={styles.statBox}>
              <Text style={[styles.statValue, fontStyle]}>{missoes.length}</Text>
              <Text style={[styles.statLabel, fontStyle]}>QUESTS ATIVAS</Text>
              <FontAwesome5 name="scroll" size={20} color={ZONAI_CYAN} style={styles.boxIcon} />
            </View>
          </View>

          {/* CÓDICE DO DESENVOLVEDOR */}
          <Text style={[styles.sectionTitle, fontStyle]}>Códice do Desenvolvedor</Text>
          <Pressable 
            onPress={() => handleLinkPress('https://github.com/EduBertozzi')}
            style={({ hovered, pressed }: any) => [
              styles.githubCard,
              (hovered || pressed) && styles.githubCardHover
            ]}
          >
            <View style={styles.githubIconWrapper}>
              <FontAwesome5 name="github" size={28} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.githubUser}>@EduBertozzi</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={14} color={ZONAI_CYAN} />
          </Pressable>

          {/* RELÍQUIAS DE BRAVURA */}
          <Text style={[styles.sectionTitle, fontStyle, { marginTop: 40 }]}>Relíquias de Bravura</Text>
          <View style={styles.badgeRow}>
            {badges.map((badge) => (
              <View 
                key={badge.id} 
                style={[styles.badgeDiamond, badge.unlocked ? styles.badgeUnlocked : styles.badgeLocked]}
              >
                <MaterialCommunityIcons 
                  name={badge.icon as any} 
                  size={32} 
                  color={badge.unlocked ? badge.color : 'rgba(255,255,255,0.1)'} 
                />
              </View>
            ))}
          </View>

          {/* AJUSTES DO PURAH PAD (Estilo iOS + Zelda) */}
          <Text style={[styles.sectionTitle, fontStyle, { marginTop: 10 }]}>Sintonizar Purah Pad</Text>
          <View style={styles.settingsGroup}>
            <Pressable 
              onPress={() => router.push('/config')}
              style={({ hovered }: any) => [styles.settingsItem, hovered && styles.settingsItemHover]}
            >
              <View style={styles.settingsLeft}>
                <View style={[styles.settingsIconWrapper, { backgroundColor: 'rgba(0, 255, 209, 0.1)' }]}>
                  <FontAwesome5 name="cog" size={14} color={ZONAI_CYAN} />
                </View>
                <Text style={[styles.settingsText, fontStyle]}>CONFIGURAÇÕES DO SISTEMA</Text>
              </View>
              <FontAwesome5 name="chevron-right" size={12} color="rgba(255,255,255,0.2)" />
            </Pressable>

            <Pressable 
              style={({ hovered }: any) => [styles.settingsItem, hovered && styles.settingsItemHover, { borderBottomWidth: 0 }]}
              onPress={() => handleLinkPress('https://inatelsr.com.br')}
            >
              <View style={styles.settingsLeft}>
                <View style={[styles.settingsIconWrapper, { backgroundColor: 'rgba(252, 172, 3, 0.1)' }]}>
                  <FontAwesome5 name="map-marked-alt" size={14} color={RUPEE_GOLD} />
                </View>
                <Text style={[styles.settingsText, fontStyle]}>COORDENADAS DA REPÚBLICA</Text>
              </View>
              <FontAwesome5 name="chevron-right" size={12} color="rgba(255,255,255,0.2)" />
            </Pressable>
          </View>

          {/* BOTÃO DE CALIBRAR SISTEMA */}
          <Pressable 
            onPress={() => {
              if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }}
            style={({ hovered, pressed }: any) => [
              styles.editButton,
              hovered && styles.editButtonHover,
              pressed && { opacity: 0.7 }
            ]}
          >
            <LinearGradient colors={['transparent', 'rgba(0, 255, 209, 0.15)']} style={styles.btnGradient}>
              <FontAwesome5 name="magic" size={12} color={ZONAI_CYAN} style={{ marginRight: 10 }} />
              <Text style={[styles.editButtonText, fontStyle]}>CALIBRAR RUNAS</Text>
            </LinearGradient>
          </Pressable>

        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  ambientGlow: { position: 'absolute', top: '10%', right: '10%', width: '50%', height: '30%', backgroundColor: ZONAI_CYAN, opacity: 0.05, borderRadius: width },
  scrollContent: { paddingHorizontal: 25, paddingTop: 60, paddingBottom: 120 },
  loadingText: { color: ZONAI_CYAN, marginTop: 15, letterSpacing: 2 },
  profileHeader: { alignItems: 'center', marginBottom: 35 },
  avatarContainer: { position: 'relative', marginBottom: 25, marginTop: 10 },
  sheikahRing: { position: 'absolute', top: -15, left: -15, right: -15, bottom: -15, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(0,255,209,0.3)', borderStyle: 'dashed', opacity: 0.5 },
  avatarGlow: { width: 130, height: 130, borderRadius: 65, padding: 2, justifyContent: 'center', alignItems: 'center' },
  avatarInner: { width: 126, height: 126, borderRadius: 63, backgroundColor: '#051212', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.2)' },
  avatarIconGlow: { textShadowColor: ZONAI_CYAN, textShadowRadius: 10 },
  levelBadge: { position: 'absolute', bottom: -10, alignSelf: 'center', backgroundColor: RUPEE_GOLD, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 4, borderWidth: 2, borderColor: '#000' },
  levelText: { color: '#000', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  userName: { color: '#fff', fontSize: 38, textAlign: 'center', letterSpacing: 1 },
  locationWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 12, opacity: 0.9 },
  userLocation: { color: ZONAI_CYAN, fontSize: 10, fontWeight: '900', letterSpacing: 3, marginLeft: 8 },
  progressContainer: { width: '100%', marginTop: 30, paddingHorizontal: 10 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: ZONAI_CYAN, fontSize: 9, fontWeight: '900', letterSpacing: 2 },
  progressValue: { color: RUPEE_GOLD, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  progressBarBg: { width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 45 },
  statBox: { width: '47%', backgroundColor: 'rgba(0, 255, 209, 0.02)', padding: 22, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.15)', alignItems: 'center' },
  statBoxHover: { borderColor: ZONAI_CYAN, backgroundColor: 'rgba(0, 255, 209, 0.08)' },
  statValue: { color: '#fff', fontSize: 28, marginBottom: 5 },
  statLabel: { color: RUPEE_GOLD, fontSize: 10, letterSpacing: 2 },
  boxIcon: { position: 'absolute', top: -10, right: -10, opacity: 0.1, transform: [{ scale: 2 }] },
  sectionTitle: { color: '#fff', fontSize: 13, textAlign: 'center', marginBottom: 20, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.8 },
  githubCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.03)' },
  githubCardHover: { borderColor: ZONAI_CYAN, backgroundColor: 'rgba(0, 255, 209, 0.05)' },
  githubIconWrapper: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  githubUser: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  githubArrow: { opacity: 0.5 },
  badgeRow: { flexDirection: 'row', justifyContent: 'center', gap: 30, marginBottom: 40 },
  badgeDiamond: { width: 70, height: 70, borderWidth: 1, transform: [{ rotate: '45deg' }], justifyContent: 'center', alignItems: 'center' },
  badgeUnlocked: { backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.2)' },
  badgeLocked: { backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.05)' },
  badgeDiamondHover: { borderColor: ZONAI_CYAN, backgroundColor: 'rgba(0, 255, 209, 0.15)' },
  badgeIconGlow: { transform: [{ rotate: '-45deg' }], textShadowColor: 'rgba(255,255,255,0.5)', textShadowRadius: 10 },
  
  // ESTILOS DAS CONFIGURAÇÕES (iOS Style)
  settingsGroup: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    marginBottom: 40,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  settingsItemHover: {
    backgroundColor: 'rgba(0, 255, 209, 0.05)',
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingsText: {
    color: '#fff',
    fontSize: 11,
    letterSpacing: 2,
  },

  editButton: { borderWidth: 1, borderColor: ZONAI_CYAN, borderRadius: 4, overflow: 'hidden' },
  editButtonHover: { backgroundColor: 'rgba(0, 255, 209, 0.1)' },
  btnGradient: { flexDirection: 'row', paddingVertical: 20, justifyContent: 'center', alignItems: 'center' },
  editButtonText: { color: '#fff', fontSize: 12, letterSpacing: 4 }
});