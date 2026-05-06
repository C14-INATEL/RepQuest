import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Importando o coração do app e a memória persistente
import { useRep } from '../../contexts/RepContext';
import { OUTROS_MORADORES } from '../../constants/moradores';

const { width } = Dimensions.get('window');
const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

export default function RankingScreen() {
  const { totalRupes, loading } = useRep();

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = fontsLoaded ? { fontFamily: 'ZeldaFont' } : {};

  // LÓGICA DE RANKING: Une os dados do Contexto com os mocks e ordena
  const rankingAtualizado = useMemo(() => {
    const listaCompleta = [
      { id: '1', nome: 'Eduardo Bertozzi', rupes: totalRupes ?? 0 , nivel: 4, avatar: 'user-astronaut' },
      ...OUTROS_MORADORES.map(m => ({ ...m, rupes: m.rupes_base }))
    ];
    // Ordena do maior para o menor saldo
    return listaCompleta.sort((a, b) => b.rupes - a.rupes);
  }, [totalRupes]);

  const renderMorador = ({ item, index }: { item: any, index: number }) => (
    <Pressable style={({ hovered }: any) => [
      styles.rankCard,
      hovered && styles.rankCardHover
    ]}>
      <Text style={[styles.posicaoText, fontStyle]}>#{index + 4}</Text>
      
      <View style={styles.avatarPequeno}>
        <FontAwesome5 name={item.avatar} size={16} color={ZONAI_CYAN} />
      </View>

      <View style={styles.infoWrapper}>
        <Text testID={`list-position-${index + 4}`} style={[styles.nomeText, fontStyle]}>{item.nome?.toUpperCase() ?? 'DESCONHECIDO'}</Text>
        <Text style={styles.nivelPequeno}>NÍVEL {item.nivel}</Text>
      </View>

      <View style={styles.rupesWrapper}>
        <Text style={[styles.rupesValue, fontStyle]}>{item.rupes.toLocaleString()}</Text>
        <MaterialCommunityIcons name="triforce" size={14} color={RUPEE_GOLD} style={styles.triforceMini} />
      </View>
    </Pressable>
  );

  const renderHeader = () => {
    const top3 = rankingAtualizado.slice(0, 3);
    
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerSubtitle}>REGISTRO DE HERÓIS</Text>
        <Text style={[styles.headerTitle, fontStyle]}>Ranking da Rep</Text>
        
        <View style={styles.podiumContainer}>
          {/* 2º LUGAR */}
          {top3[1] && (
            <View style={[styles.podiumSpot, { marginTop: 40 }]}>
              <View style={[styles.podiumAvatar, { borderColor: '#C0C0C0' }]}>
                <FontAwesome5 name={top3[1].avatar} size={30} color="#C0C0C0" />
              </View>
              <Text testID="podium-position-2" style={[styles.podiumName, fontStyle]}>{top3[1].nome?.split(' ')[0] ?? 'DESCONHECIDO'}</Text>
              <Text style={[styles.podiumRupes, fontStyle]}>{top3[1].rupes.toLocaleString()} R</Text>
              <View style={[styles.basePodium, { height: 40, backgroundColor: 'rgba(192,192,192,0.15)' }]} />
            </View>
          )}

          {/* 1º LUGAR */}
          {top3[0] && (
            <View style={styles.podiumSpot}>
              <LinearGradient colors={[RUPEE_GOLD, '#fff']} style={styles.crownGradient}>
                <FontAwesome5 name="crown" size={12} color="#000" />
              </LinearGradient>
              <View style={[styles.podiumAvatar, styles.firstPlaceAvatar]}>
                <FontAwesome5 name={top3[0].avatar} size={40} color={RUPEE_GOLD} />
              </View>
              <Text testID="podium-position-1" style={[styles.podiumName, fontStyle, { color: RUPEE_GOLD, fontSize: 18 }]}>{top3[0].nome?.split(' ')[0] ?? 'DESCONHECIDO'}</Text>
              <Text style={[styles.podiumRupes, fontStyle, { color: '#fff' }]}>{top3[0].rupes.toLocaleString()} R</Text>
              <View style={[styles.basePodium, { height: 70, backgroundColor: 'rgba(252,172,3,0.2)', borderColor: RUPEE_GOLD }]} />
            </View>
          )}

          {/* 3º LUGAR */}
          {top3[2] && (
            <View style={[styles.podiumSpot, { marginTop: 55 }]}>
              <View style={[styles.podiumAvatar, { borderColor: '#CD7F32' }]}>
                <FontAwesome5 name={top3[2].avatar} size={25} color="#CD7F32" />
              </View>
              <Text testID="podium-position-3" style={[styles.podiumName, fontStyle]}>{top3[2].nome?.split(' ')[0] ?? 'DESCONHECIDO'}</Text>
              <Text style={[styles.podiumRupes, fontStyle]}>{top3[2].rupes.toLocaleString()} R</Text>
              <View style={[styles.basePodium, { height: 30, backgroundColor: 'rgba(205,127,50,0.15)' }]} />
            </View>
          )}
        </View>

        <View style={styles.listDivider}>
           <View style={styles.dividerLine} />
           <MaterialCommunityIcons name="sword-cross" size={22} color={ZONAI_CYAN} style={styles.iconCenter} />
           <View style={styles.dividerLine} />
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={ZONAI_CYAN} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/sheikah-bg.jpg')} style={StyleSheet.absoluteFillObject} resizeMode="cover">
        <LinearGradient colors={['rgba(0,0,0,0.96)', 'rgba(0,30,30,0.85)', 'rgba(0,0,0,0.98)']} style={StyleSheet.absoluteFillObject} />

        <FlatList
          data={rankingAtualizado.slice(3)}
          keyExtractor={(item) => item.id}
          renderItem={renderMorador}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 120 },
  headerContainer: { alignItems: 'center', marginBottom: 30 },
  headerSubtitle: { color: ZONAI_CYAN, fontSize: 10, fontWeight: '900', letterSpacing: 4, marginBottom: 5 },
  headerTitle: { color: '#fff', fontSize: 36, textAlign: 'center' },
  podiumContainer: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', width: '100%', height: 320, marginTop: 40 },
  podiumSpot: { alignItems: 'center', width: (width - 60) / 3 },
  podiumAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, backgroundColor: '#051212', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  firstPlaceAvatar: { width: 95, height: 95, borderRadius: 47.5, borderColor: RUPEE_GOLD },
  crownGradient: { padding: 4, borderRadius: 10, position: 'absolute', top: -18, zIndex: 10, borderWidth: 1, borderColor: '#fff' },
  podiumName: { color: '#fff', fontSize: 14, marginTop: 12, letterSpacing: 1 },
  podiumRupes: { color: RUPEE_GOLD, fontSize: 12, marginTop: 2, marginBottom: 10 },
  basePodium: { width: '85%', borderRadius: 2, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  listDivider: { flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 20, marginBottom: 30 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(0, 255, 209, 0.2)' },
  iconCenter: { marginHorizontal: 20, backgroundColor: 'transparent' },
  rankCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(5, 18, 18, 0.8)', padding: 18, borderRadius: 2, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.15)' },
  rankCardHover: { backgroundColor: 'rgba(0, 255, 209, 0.08)', borderColor: ZONAI_CYAN, transform: [{ scale: 1.03 }] },
  posicaoText: { color: ZONAI_CYAN, fontSize: 18, width: 45 },
  avatarPequeno: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0, 255, 209, 0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.2)' },
  infoWrapper: { flex: 1 },
  nomeText: { color: '#fff', fontSize: 14, letterSpacing: 1 },
  nivelPequeno: { color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: '900', marginTop: 4 },
  rupesWrapper: { flexDirection: 'row', alignItems: 'center' },
  rupesValue: { color: RUPEE_GOLD, fontSize: 20 },
  triforceMini: { marginLeft: 8, backgroundColor: 'transparent' }
});
