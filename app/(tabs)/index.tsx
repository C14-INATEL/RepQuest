import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View
} from 'react-native';

import CardDeMissao from '../../components/CardDeMissao';
// Certifique-se de que o caminho do seu contexto está correto
import { useRep } from '../../contexts/RepContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

export default function MissoesScreen() {
  // Chamando o estado global do RepContext
  const { 
    totalRupes, 
    ganharRupes, 
    missoes, 
    setMissoesGlobal, 
    loading 
  } = useRep();
  
  const [notificacao, setNotificacao] = useState({ visivel: false, texto: '' });
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novaMissao, setNovaMissao] = useState({ titulo: '', xp: '' });

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = fontsLoaded ? { fontFamily: 'ZeldaFont' } : {};

  async function playSuccessSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/success.mp3'));
      await sound.playAsync();
    } catch (e) { 
      console.log("Som não configurado em assets/sounds"); 
    }
  }

  const concluirMissao = async (id: string, titulo: string, xp: number) => {
    await playSuccessSound();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    // LOGICA GLOBAL: Atualiza as Rúpias e a lista de missões no Contexto
    ganharRupes(xp);
    setMissoesGlobal(missoes.filter((m) => m.id !== id));
    
    setNotificacao({ visivel: true, texto: `RECOMPENSA: +${xp} RUPES RESGATADAS!` });
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setNotificacao({ visivel: false, texto: '' });
    }, 3500);
  };

  const adicionarMissao = () => {
    if (!novaMissao.titulo) return;
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      titulo: novaMissao.titulo,
      xp: parseInt(novaMissao.xp) || 50,
      icone: 'scroll'
    };
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // Adiciona à lista global do Contexto
    setMissoesGlobal([item, ...missoes]);
    
    setModalVisivel(false);
    setNovaMissao({ titulo: '', xp: '' });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.sheikahRing} />
      <View style={styles.titleWrapper}>
        <FontAwesome5 name="compass" size={12} color={ZONAI_CYAN} />
        <Text style={styles.headerSubtitle}>REGISTRO DE AVENTURAS</Text>
      </View>
      <Text style={[styles.headerTitle, fontStyle]}>Mural da Casa</Text>
      
      <View style={styles.statsContainer}>
        <Pressable style={({ hovered }: any) => [styles.levelBadge, hovered && styles.badgeHover]}>
          <Text style={[styles.levelText, fontStyle]}>NÍVEL 04</Text>
        </Pressable>
        <Pressable style={({ hovered }: any) => [styles.xpBadge, hovered && styles.badgeHoverXp]}>
          <Text style={[styles.xpText, fontStyle]}>{totalRupes.toLocaleString()} RUPES</Text>
        </Pressable>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <MaterialCommunityIcons name="triforce" size={28} color={RUPEE_GOLD} style={styles.triforceIcon} />
        <View style={styles.dividerLine} />
      </View>
    </View>
  );

  // Exibe um carregamento se o AsyncStorage ainda estiver lendo os dados
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={ZONAI_CYAN} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={require('../../assets/images/sheikah-bg.jpg')} style={StyleSheet.absoluteFillObject} resizeMode="cover">
        <LinearGradient colors={['rgba(0,0,0,0.96)', 'rgba(0,30,30,0.82)', 'rgba(0,0,0,0.98)']} style={StyleSheet.absoluteFillObject} />
        
        {notificacao.visivel && (
          <View style={styles.toastContainer}>
            <LinearGradient colors={[ZONAI_CYAN, '#004d4d']} start={{ x: 0, y: 0 }} style={styles.toastGradient}>
              <MaterialCommunityIcons name="check-decagram" size={20} color="#000" />
              <Text style={styles.toastText}>{notificacao.texto}</Text>
            </LinearGradient>
          </View>
        )}

        <FlatList
          data={missoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardDeMissao
              titulo={item.titulo}
              xp={item.xp}
              icone={item.icone}
              onCompletar={() => concluirMissao(item.id, item.titulo, item.xp)}
            />
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <Pressable 
          style={({ hovered, pressed }) => [styles.fab, (hovered || pressed) && { transform: [{ scale: 1.1 }] }]}
          onPress={() => setModalVisivel(true)}
        >
          <LinearGradient colors={[ZONAI_CYAN, '#004d4d']} style={styles.fabGradient}>
            <FontAwesome5 name="plus" size={22} color="#000" />
          </LinearGradient>
        </Pressable>

        <Modal animationType="fade" transparent visible={modalVisivel} onRequestClose={() => setModalVisivel(false)}>
          <View style={styles.modalOverlay}>
            <LinearGradient colors={['rgba(0,25,25,0.98)', 'rgba(0,0,0,1)']} style={styles.modalContent}>
              <Text style={[styles.modalTitle, fontStyle]}>Novo Registro</Text>
              <TextInput
                style={styles.input}
                placeholder="NOME DA MISSÃO..."
                placeholderTextColor="rgba(0, 255, 209, 0.3)"
                value={novaMissao.titulo}
                onChangeText={(t) => setNovaMissao({...novaMissao, titulo: t})}
              />
              <TextInput
                style={styles.input}
                placeholder="VALOR EM RUPES..."
                placeholderTextColor="rgba(0, 255, 209, 0.3)"
                keyboardType="numeric"
                value={novaMissao.xp}
                onChangeText={(t) => setNovaMissao({...novaMissao, xp: t})}
              />
              <View style={styles.modalButtons}>
                <Pressable style={styles.btnCancel} onPress={() => setModalVisivel(false)}>
                  <Text style={styles.btnText}>DESCARTAR</Text>
                </Pressable>
                <Pressable style={styles.btnConfirm} onPress={adicionarMissao}>
                  <Text style={[styles.btnText, { color: '#000' }]}>ATIVAR</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  listContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 180 },
  headerContainer: { marginBottom: 35, alignItems: 'center' },
  sheikahRing: { position: 'absolute', top: -60, right: -100, width: 200, height: 200, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(0,255,209,0.1)', borderStyle: 'dashed' },
  titleWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  headerSubtitle: { color: ZONAI_CYAN, fontSize: 9, fontWeight: '900', letterSpacing: 4, marginLeft: 8 },
  headerTitle: { color: '#FFFFFF', fontSize: 44, textAlign: 'center' },
  statsContainer: { flexDirection: 'row', marginTop: 20, marginBottom: 30 },
  levelBadge: { backgroundColor: RUPEE_GOLD, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 2, marginRight: 15 },
  levelText: { color: '#000', fontSize: 12 },
  xpBadge: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 2 },
  xpText: { color: '#fff', fontSize: 12 },
  badgeHover: { backgroundColor: '#fff', transform: [{ scale: 1.05 }] },
  badgeHoverXp: { borderColor: ZONAI_CYAN, backgroundColor: 'rgba(0,255,209,0.1)' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(0, 255, 209, 0.2)' },
  triforceIcon: { marginHorizontal: 20, backgroundColor: 'transparent' },
  toastContainer: { position: 'absolute', top: 60, left: 20, right: 20, zIndex: 1000 },
  toastGradient: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 2, borderWidth: 1, borderColor: '#fff' },
  toastText: { color: '#000', fontSize: 11, fontWeight: '900', marginLeft: 12, flex: 1 },
  fab: { position: 'absolute', bottom: 100, right: 30, width: 64, height: 64, borderRadius: 32, elevation: 10, shadowColor: ZONAI_CYAN, shadowRadius: 20, shadowOpacity: 0.5 },
  fabGradient: { flex: 1, borderRadius: 32, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#fff' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 25 },
  modalContent: { padding: 30, borderRadius: 2, borderWidth: 1.5, borderColor: ZONAI_CYAN },
  modalTitle: { color: '#fff', fontSize: 32, textAlign: 'center', marginBottom: 30 },
  input: { borderBottomWidth: 1.5, borderBottomColor: 'rgba(0,255,209,0.4)', color: '#fff', padding: 15, marginBottom: 25, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  btnCancel: { padding: 15, width: '45%', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  btnConfirm: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: ZONAI_CYAN },
  btnText: { color: '#fff', fontWeight: '900', letterSpacing: 2, fontSize: 10 },
});