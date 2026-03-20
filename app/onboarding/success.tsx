import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ImageBackground, // Importado para partilhar o código
    Platform,
    Pressable,
    Share,
    StyleSheet,
    Text,
    TextStyle,
    View
} from 'react-native';

const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

export default function SuccessScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = (fontsLoaded ? { fontFamily: 'ZeldaFont' } : {}) as TextStyle;
  const codigoGerado = "SAB-2026"; 

  // FUNÇÃO PARA PARTILHAR (ESTILO SANTA RITA)
  const handleShare = async () => {
    try {
      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      await Share.share({
        message: `🛡️ RepQuest: O selo da nossa República foi consagrado! \n\nCódigo de Acesso: ${codigoGerado}\n\nBaixe o app e junte-se à jornada!`,
      });
    } catch (error) {
      console.log("Erro ao partilhar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/sheikah-bg.jpg')} style={StyleSheet.absoluteFillObject}>
        <LinearGradient colors={['rgba(0,0,0,0.9)', 'rgba(0,30,30,0.8)', 'rgba(0,0,0,1)']} style={StyleSheet.absoluteFillObject} />

        <View style={styles.content}>
          <View style={styles.crystalWrapper}>
            <LinearGradient colors={[ZONAI_CYAN, 'transparent']} style={styles.crystalGlow} />
            <MaterialCommunityIcons name="crystal-ball" size={120} color={ZONAI_CYAN} style={styles.crystalIcon} />
          </View>

          <Text style={[styles.title, fontStyle]}>Vila Consagrada!</Text>
          <Text style={styles.subtitle}>O SELO FOI REVELADO</Text>

          <View style={styles.codeContainer}>
             <Text style={styles.codeLabel}>CÓDIGO DE ACESSO</Text>
             <Text style={[styles.codeText, fontStyle]}>{codigoGerado}</Text>
             
             <Pressable onPress={handleShare} style={styles.shareBtn}>
                <FontAwesome5 name="share-alt" size={16} color="#000" />
                <Text style={styles.shareBtnText}>PARTILHAR COM A REP</Text>
             </Pressable>
          </View>

          <Pressable onPress={() => router.replace('/(tabs)')} style={styles.entryBtn}>
            <LinearGradient colors={[ZONAI_CYAN, '#004d4d']} style={styles.btnGradient}>
              <Text style={[styles.btnText, fontStyle]}>ENTRAR NO MURAL</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  crystalWrapper: { marginBottom: 40, alignItems: 'center', justifyContent: 'center' },
  crystalGlow: { position: 'absolute', width: 200, height: 200, borderRadius: 100, opacity: 0.2 },
  crystalIcon: { textShadowColor: ZONAI_CYAN, textShadowRadius: 30 },
  title: { color: '#fff', fontSize: 38, textAlign: 'center' },
  subtitle: { color: ZONAI_CYAN, fontSize: 10, letterSpacing: 4, marginTop: 10, marginBottom: 50 },
  codeContainer: { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', padding: 30, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.2)', alignItems: 'center' },
  codeLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 9, letterSpacing: 2, marginBottom: 15 },
  codeText: { color: RUPEE_GOLD, fontSize: 32, letterSpacing: 5, marginBottom: 25 },
  shareBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: ZONAI_CYAN, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 2 },
  shareBtnText: { color: '#000', fontSize: 10, fontWeight: '900', marginLeft: 10 },
  entryBtn: { marginTop: 60, width: '100%', borderRadius: 4, overflow: 'hidden' },
  btnGradient: { paddingVertical: 20, alignItems: 'center' },
  btnText: { color: '#000', fontSize: 14, letterSpacing: 2 },
});