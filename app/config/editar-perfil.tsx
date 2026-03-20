import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ImageBackground,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View,
} from 'react-native';

const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

const AVATARES = ['user-astronaut', 'user-ninja', 'user-tie', 'user-graduate', 'user-secret', 'user-crown'];

export default function EditarPerfil() {
  const router = useRouter();
  const [nome, setNome] = useState('Eduardo Bertozzi');
  const [avatarSelecionado, setAvatarSelecionado] = useState('user-astronaut');

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = (fontsLoaded ? { fontFamily: 'ZeldaFont' } : {}) as TextStyle;

  const salvar = () => {
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log("Perfil Salvo:", { nome, avatarSelecionado });
    router.back();
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/sheikah-bg.jpg')} style={StyleSheet.absoluteFillObject}>
        <LinearGradient colors={['rgba(0,0,0,0.9)', 'rgba(0,25,25,0.95)']} style={StyleSheet.absoluteFillObject} />

        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <FontAwesome5 name="chevron-left" size={20} color={ZONAI_CYAN} />
        </Pressable>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={[styles.title, fontStyle]}>Identidade</Text>

          {/* EDITAR ALCUNHA */}
          <View style={styles.section}>
            <Text style={[styles.label, fontStyle]}>Selo de Nome (Alcunha)</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={[styles.input, fontStyle]}
                value={nome}
                onChangeText={setNome}
                placeholderTextColor="rgba(255,255,255,0.2)"
                selectionColor={ZONAI_CYAN}
              />
              <FontAwesome5 name="pen" size={12} color={ZONAI_CYAN} style={styles.inputIcon} />
            </View>
          </View>

          {/* ALTERAR AVATAR */}
          <View style={styles.section}>
            <Text style={[styles.label, fontStyle]}>Veste de Herói (Avatar)</Text>
            <View style={styles.avatarGrid}>
              {AVATARES.map((icon) => (
                <Pressable 
                  key={icon}
                  onPress={() => {
                    setAvatarSelecionado(icon);
                    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={[
                    styles.avatarBox, 
                    avatarSelecionado === icon && styles.avatarActive
                  ]}
                >
                  <FontAwesome5 
                    name={icon} 
                    size={28} 
                    color={avatarSelecionado === icon ? ZONAI_CYAN : 'rgba(255,255,255,0.3)'} 
                  />
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable onPress={salvar} style={styles.saveBtn}>
            <LinearGradient colors={[ZONAI_CYAN, '#004d4d']} style={styles.btnGradient}>
              <Text style={[styles.btnText, fontStyle]}>GRAVAR NA PEDRA</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { paddingHorizontal: 30, paddingTop: 120, paddingBottom: 50 },
  backBtn: { position: 'absolute', top: 60, left: 25, zIndex: 10, padding: 10 },
  title: { color: '#fff', fontSize: 36, marginBottom: 40 },
  section: { marginBottom: 40 },
  label: { color: RUPEE_GOLD, fontSize: 10, letterSpacing: 3, marginBottom: 15 },
  inputContainer: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.2)', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, color: '#fff', fontSize: 18, paddingVertical: 15 },
  inputIcon: { marginLeft: 10, opacity: 0.5 },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center' },
  avatarBox: { width: 70, height: 70, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  avatarActive: { borderColor: ZONAI_CYAN, backgroundColor: 'rgba(0, 255, 209, 0.1)' },
  saveBtn: { marginTop: 20, borderRadius: 8, overflow: 'hidden' },
  btnGradient: { paddingVertical: 20, alignItems: 'center' },
  btnText: { color: '#000', fontSize: 14, letterSpacing: 2 },
});