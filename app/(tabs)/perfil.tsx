import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
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
    View
} from 'react-native';

// Importando o coração do app
import { useRep } from '../../contexts/RepContext';

const { width } = Dimensions.get('window');
const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

export default function PerfilScreen() {
  const { totalRupes, missoes, loading } = useRep();

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = fontsLoaded ? { fontFamily: 'ZeldaFont' } : {};

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
          colors={['rgba(0,0,0,0.97)', 'rgba(0,30,30,0.85)', 'rgba(0,0,0,0.98)']}
          style={StyleSheet.absoluteFillObject}
        />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER COM AVATAR MÍSTICO */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <LinearGradient colors={[ZONAI_CYAN, RUPEE_GOLD]} style={styles.avatarGlow}>
                <View style={styles.avatarInner}>
                  <FontAwesome5 name="user-astronaut" size={50} color={ZONAI_CYAN} />
                </View>
              </LinearGradient>
              <View style={styles.levelBadge}>
                <Text style={[styles.levelText, fontStyle]}>NÍVEL 04</Text>
              </View>
            </View>

            <Text style={[styles.userName, fontStyle]}>Eduardo Bertozzi</Text>
            
            <View style={styles.locationWrapper}>
              <MaterialCommunityIcons name="map-marker-radius" size={14} color={ZONAI_CYAN} />
              <Text style={styles.userLocation}>INATEL • SANTA RITA DO SAPUCAÍ</Text>
            </View>
          </View>

          {/* GRID DE STATUS (Estilo Inventário de BoTW) */}
          <View style={styles.statsGrid}>
            <Pressable style={({ hovered }: any) => [
              styles.statBox,
              hovered && styles.statBoxHover
            ]}>
              <Text style={[styles.statValue, fontStyle]}>{totalRupes.toLocaleString()}</Text>
              <Text style={[styles.statLabel, fontStyle]}>RUPES</Text>
              <MaterialCommunityIcons name="triforce" size={16} color={RUPEE_GOLD} style={styles.boxIcon} />
            </Pressable>

            <Pressable style={({ hovered }: any) => [
              styles.statBox,
              hovered && styles.statBoxHover
            ]}>
              <Text style={[styles.statValue, fontStyle]}>{missoes.length}</Text>
              <Text style={[styles.statLabel, fontStyle]}>QUESTS</Text>
              <FontAwesome5 name="scroll" size={14} color={ZONAI_CYAN} style={styles.boxIcon} />
            </Pressable>
          </View>

          {/* CÓDICE DO DESENVOLVEDOR (GitHub Integration) */}
          <Text style={[styles.sectionTitle, fontStyle]}>Códice do Desenvolvedor</Text>
          <Pressable 
            onPress={() => Linking.openURL('https://github.com/EduBertozzi')}
            style={({ hovered }: any) => [
              styles.githubCard,
              hovered && styles.githubCardHover
            ]}
          >
            <View style={styles.githubIconWrapper}>
              <FontAwesome5 name="github" size={28} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.githubUser}>@EduBertozzi</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={12} color={ZONAI_CYAN} />
          </Pressable>

          {/* REGISTROS DE BRAVURA (Achievements) */}
          <Text style={[styles.sectionTitle, fontStyle, { marginTop: 40 }]}>Registros de Bravura</Text>
          <View style={styles.badgeRow}>
            {['shield-star', 'sword-cross', 'flash'].map((icon, index) => (
              <Pressable 
                key={index} 
                style={({ hovered }: any) => [
                  styles.badgeDiamond,
                  hovered && styles.badgeDiamondHover
                ]}
              >
                <MaterialCommunityIcons 
                  name={icon as any} 
                  size={30} 
                  color={index === 1 ? ZONAI_CYAN : RUPEE_GOLD} 
                />
              </Pressable>
            ))}
          </View>

          {/* BOTÃO DE EDIÇÃO SISTÊMICO */}
          <Pressable style={({ hovered, pressed }: any) => [
            styles.editButton,
            hovered && styles.editButtonHover,
            pressed && { opacity: 0.7 }
          ]}>
            <LinearGradient
              colors={['transparent', 'rgba(0, 255, 209, 0.15)']}
              style={styles.btnGradient}
            >
              <Text style={[styles.editButtonText, fontStyle]}>ATUALIZAR REGISTRO</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { paddingHorizontal: 25, paddingTop: 60, paddingBottom: 120 },
  loadingText: { color: ZONAI_CYAN, marginTop: 15, letterSpacing: 2 },
  
  // AVATAR
  profileHeader: { alignItems: 'center', marginBottom: 35 },
  avatarContainer: { position: 'relative', marginBottom: 20 },
  avatarGlow: { width: 120, height: 120, borderRadius: 60, padding: 2, justifyContent: 'center', alignItems: 'center', shadowColor: ZONAI_CYAN, shadowRadius: 20, shadowOpacity: 0.5 },
  avatarInner: { width: 116, height: 116, borderRadius: 58, backgroundColor: '#051212', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.2)' },
  levelBadge: { position: 'absolute', bottom: -5, alignSelf: 'center', backgroundColor: RUPEE_GOLD, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 2, borderWidth: 1, borderColor: '#fff' },
  levelText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  
  // TEXTS
  userName: { color: '#fff', fontSize: 36, textAlign: 'center', letterSpacing: 1 },
  locationWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 10, opacity: 0.8 },
  userLocation: { color: ZONAI_CYAN, fontSize: 9, fontWeight: '900', letterSpacing: 2, marginLeft: 8 },
  
  // STATS
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  statBox: { width: '47%', backgroundColor: 'rgba(0, 255, 209, 0.03)', padding: 22, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.15)', alignItems: 'center', overflow: 'hidden' },
  statBoxHover: { borderColor: ZONAI_CYAN, backgroundColor: 'rgba(0, 255, 209, 0.08)', transform: [{ scale: 1.02 }] },
  statValue: { color: '#fff', fontSize: 26, marginBottom: 5 },
  statLabel: { color: RUPEE_GOLD, fontSize: 10, letterSpacing: 2 },
  boxIcon: { position: 'absolute', top: 5, right: 8, opacity: 0.3 },

  // GITHUB CARD
  sectionTitle: { color: '#fff', fontSize: 14, textAlign: 'center', marginBottom: 20, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.9 },
  githubCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.02)', ...Platform.select({ web: { transition: 'all 0.2s' } }) },
  githubCardHover: { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.06)', transform: [{ translateY: -2 }] },
  githubIconWrapper: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  githubUser: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 0.5 },
  githubRepo: { color: ZONAI_CYAN, fontSize: 10, marginTop: 4, fontWeight: '600', letterSpacing: 1 },

  // BADGES
  badgeRow: { flexDirection: 'row', justifyContent: 'center', gap: 30, marginBottom: 45 },
  badgeDiamond: { width: 65, height: 65, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', transform: [{ rotate: '45deg' }], justifyContent: 'center', alignItems: 'center', ...Platform.select({ web: { transition: 'all 0.3s' } }) },
  badgeDiamondHover: { borderColor: ZONAI_CYAN, backgroundColor: 'rgba(0, 255, 209, 0.1)', transform: [{ rotate: '45deg' }, { scale: 1.1 }] },

  // BUTTON
  editButton: { borderWidth: 1, borderColor: ZONAI_CYAN, borderRadius: 2, marginTop: 20, overflow: 'hidden' },
  editButtonHover: { backgroundColor: 'rgba(0, 255, 209, 0.1)' },
  btnGradient: { paddingVertical: 20, alignItems: 'center' },
  editButtonText: { color: '#fff', fontSize: 13, letterSpacing: 5 }
});