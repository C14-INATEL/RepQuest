import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextStyle,
    View,
} from 'react-native';

const ZONAI_CYAN = '#00FFD1';

export default function Privacidade() {
  const router = useRouter();
  const [config, setConfig] = useState({
    perfilPublico: true,
    mostrarRupias: true,
    incognito: false
  });

  const [fontsLoaded] = useFonts({
    'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
  });

  const fontStyle = (fontsLoaded ? { fontFamily: 'ZeldaFont' } : {}) as TextStyle;

  const toggle = (key: keyof typeof config) => setConfig(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/sheikah-bg.jpg')} style={StyleSheet.absoluteFillObject}>
        <LinearGradient colors={['rgba(0,0,0,0.95)', 'rgba(0,30,30,0.9)']} style={StyleSheet.absoluteFillObject} />

        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <FontAwesome5 name="chevron-left" size={20} color={ZONAI_CYAN} />
        </Pressable>

        <View style={styles.content}>
          <Text style={[styles.title, fontStyle]}>Privacidade</Text>
          <Text style={styles.desc}>CONTROLE QUEM PODE RASTREAR SUAS RUNAS</Text>

          <View style={styles.group}>
            <View style={styles.item}>
              <Text style={styles.itemText}>PERFIL VISÍVEL NA ALDEIA</Text>
              <Switch 
                value={config.perfilPublico} 
                onValueChange={() => toggle('perfilPublico')}
                trackColor={{ false: '#333', true: ZONAI_CYAN }}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.itemText}>EXIBIR RÚPIAS NO RANKING</Text>
              <Switch 
                value={config.mostrarRupias} 
                onValueChange={() => toggle('mostrarRupias')}
                trackColor={{ false: '#333', true: ZONAI_CYAN }}
              />
            </View>

            <View style={[styles.item, { borderBottomWidth: 0 }]}>
              <Text style={styles.itemText}>MODO STEALTH (INCOGNITO)</Text>
              <Switch 
                value={config.incognito} 
                onValueChange={() => toggle('incognito')}
                trackColor={{ false: '#333', true: ZONAI_CYAN }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { paddingHorizontal: 30, paddingTop: 120 },
  backBtn: { position: 'absolute', top: 60, left: 25, zIndex: 10, padding: 10 },
  title: { color: '#fff', fontSize: 36, marginBottom: 10 },
  desc: { color: ZONAI_CYAN, fontSize: 9, letterSpacing: 2, marginBottom: 40 },
  group: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 22, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  itemText: { color: '#fff', fontSize: 11, letterSpacing: 1.5, fontWeight: '600' },
});