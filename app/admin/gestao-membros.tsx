import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // 1. Importação necessária
import React, { useState } from 'react';
import {
    Alert,
    Clipboard,
    FlatList,
    ImageBackground,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View
} from 'react-native';

const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';
const ERROR_RED = '#ff4444';

const MOCK_MORADORES = [
  { id: '1', nome: 'Eduardo Bertozzi', cargo: 'Fundador', nivel: 4, avatar: 'user-astronaut' },
  { id: '2', nome: 'Breno Engenharia', cargo: 'Morador', nivel: 3, avatar: 'user-ninja' },
  { id: '3', nome: 'Caio Inatel', cargo: 'Morador', nivel: 3, avatar: 'user-tie' },
  { id: '6', nome: 'Calouro 01', cargo: 'Calouro', nivel: 1, avatar: 'user-graduate' },
];

export default function GestaoMembros() {
  const router = useRouter(); // 2. Inicializando o roteador
  const [moradores, setMoradores] = useState(MOCK_MORADORES);
  const repoCode = "SABUGAL-2026";

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = (fontsLoaded ? { fontFamily: 'ZeldaFont' } : {}) as TextStyle;

  const copiarCodigo = () => {
    Clipboard.setString(repoCode);
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Código Copiado!", "Mande para o novo morador entrar na República.");
  };

  const removerMorador = (id: string, nome: string) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      "Expulsar Morador?",
      `Tem certeza que deseja remover ${nome} da República? Ele perderá acesso às missões.`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "EXPULSAR", 
          style: "destructive",
          onPress: () => setMoradores(prev => prev.filter(m => m.id !== id))
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberInfo}>
        <View style={styles.avatarMini}>
          <FontAwesome5 name={item.avatar} size={18} color={ZONAI_CYAN} />
        </View>
        <View>
          <Text style={[styles.memberName, fontStyle]}>{item.nome.toUpperCase()}</Text>
          <Text style={styles.memberRole}>{item.cargo} • NIVEL {item.nivel}</Text>
        </View>
      </View>

      {item.cargo !== 'Fundador' && (
        <Pressable 
          onPress={() => removerMorador(item.id, item.nome)}
          style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.5 }]}
        >
          <MaterialCommunityIcons name="account-remove" size={20} color={ERROR_RED} />
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/sheikah-bg.jpg')} style={StyleSheet.absoluteFillObject}>
        <LinearGradient colors={['rgba(0,0,0,0.95)', 'rgba(0,20,20,0.9)']} style={StyleSheet.absoluteFillObject} />
        
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

        <View style={styles.content}>
          <Text style={[styles.title, fontStyle]}>Painel do Patriarca</Text>
          <Text style={styles.subtitle}>GESTÃO DE INTEGRANTES</Text>

          {/* CARD DE CONVITE */}
          <LinearGradient colors={['rgba(0,255,209,0.1)', 'transparent']} style={styles.inviteCard}>
            <Text style={styles.inviteLabel}>CÓDIGO DE CONVITE</Text>
            <View style={styles.codeRow}>
              <Text style={[styles.codeText, fontStyle]}>{repoCode}</Text>
              <Pressable onPress={copiarCodigo} style={styles.copyBtn}>
                <FontAwesome5 name="copy" size={16} color="#000" />
              </Pressable>
            </View>
            <Text style={styles.inviteHint}>Novos membros usam esse código para entrar.</Text>
          </LinearGradient>

          <View style={styles.divider} />

          <FlatList
            data={moradores}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Ninguém na República além de você...</Text>
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 120 }, // Ajustado o padding para o botão não cobrir o título
  
  // ESTILO BOTÃO VOLTAR
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

  title: { color: '#fff', fontSize: 32, textAlign: 'center' },
  subtitle: { color: ZONAI_CYAN, fontSize: 10, letterSpacing: 4, textAlign: 'center', marginBottom: 30 },
  inviteCard: { padding: 20, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(0,255,209,0.3)', marginBottom: 30 },
  inviteLabel: { color: ZONAI_CYAN, fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 10 },
  codeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.05)', padding: 15, borderRadius: 4 },
  codeText: { color: RUPEE_GOLD, fontSize: 24, letterSpacing: 2 },
  copyBtn: { backgroundColor: ZONAI_CYAN, padding: 10, borderRadius: 4 },
  inviteHint: { color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 10, textAlign: 'center' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 20 },
  memberCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.03)', padding: 15, borderRadius: 4, marginBottom: 10, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)' },
  memberInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarMini: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,255,209,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: 'rgba(0,255,209,0.2)' },
  memberName: { color: '#fff', fontSize: 14, letterSpacing: 1 },
  memberRole: { color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: '900', marginTop: 2 },
  deleteBtn: { padding: 10 },
  emptyText: { color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 50, fontStyle: 'italic' }
});