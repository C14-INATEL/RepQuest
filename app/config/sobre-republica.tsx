import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';

const ZONAI_CYAN = '#00FFD1';
const RUPEE_GOLD = '#fcac03';

// Definindo os tipos para os ícones para silenciar o TypeScript
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
type FA5IconName = React.ComponentProps<typeof FontAwesome5>['name'];

export default function SobreRepublica() {
    const router = useRouter();
    
    const isAdmin = true; 
    const [repData] = useState({
        nome: "REPÚBLICA ZONAI",
        fundacao: "15 de Janeiro de 2026",
        motto: "Pela glória da louça limpa e do café forte.",
        local: "Santa Rita do Sapucaí, MG"
    });

    const [fontsLoaded] = useFonts({
        'ZeldaFont': require('../../assets/fonts/HyliaSerif.otf'),
    });

    const fontStyle = (fontsLoaded ? { fontFamily: 'ZeldaFont' } : {}) as TextStyle;

    const handleEdit = () => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Alert.alert("Altar de Edição", "Deseja alterar os registros da Vila?");
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/sheikah-bg.jpg')} style={StyleSheet.absoluteFillObject}>
                <LinearGradient colors={['rgba(0,0,0,0.8)', 'rgba(0,20,20,0.95)']} style={StyleSheet.absoluteFillObject} />

                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <FontAwesome5 name="chevron-left" size={20} color={ZONAI_CYAN} />
                </Pressable>

                <ScrollView contentContainerStyle={styles.scroll}>
                    {/* FOTO DA FACHADA */}
                    <View style={styles.bannerContainer}>
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1513584684374-8bdb7489feef' }} 
                            style={styles.bannerImage}
                        />
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.bannerOverlay} />
                        
                        {isAdmin && (
                            <Pressable onPress={handleEdit} style={styles.editPhotoBtn}>
                                <FontAwesome5 name="camera" size={14} color="#000" />
                            </Pressable>
                        )}
                        
                        <Text style={[styles.repName, fontStyle]}>{repData.nome}</Text>
                    </View>

                    <View style={styles.infoContent}>
                        <View style={styles.infoCard}>
                            {/* ITEM: FUNDAÇÃO */}
                            <View style={styles.infoItem}>
                                <MaterialCommunityIcons name="calendar-star" size={20} color={RUPEE_GOLD} />
                                <View style={styles.infoTextGroup}>
                                    <Text style={styles.infoLabel}>FUNDADA EM</Text>
                                    <Text style={styles.infoValue}>{repData.fundacao}</Text>
                                </View>
                            </View>

                            {/* ITEM: COORDENADAS */}
                            <View style={styles.infoItem}>
                                <MaterialCommunityIcons name="map-marker-radius" size={20} color={ZONAI_CYAN} />
                                <View style={styles.infoTextGroup}>
                                    <Text style={styles.infoLabel}>COORDENADAS</Text>
                                    <Text style={styles.infoValue}>{repData.local}</Text>
                                </View>
                            </View>

                            {/* ITEM: MANTRA */}
                            <View style={[styles.infoItem, { borderBottomWidth: 0 }]}>
                                <FontAwesome5 name="quote-left" size={16} color={RUPEE_GOLD} />
                                <View style={styles.infoTextGroup}>
                                    <Text style={styles.infoLabel}>MANTRA DA CASA</Text>
                                    <Text style={styles.infoValue}>{repData.motto}</Text>
                                </View>
                            </View>
                        </View>

                        {isAdmin && (
                            <Pressable 
                                style={({ pressed }) => [styles.adminAction, pressed && { opacity: 0.7 }] as ViewStyle[]} 
                                onPress={handleEdit}
                            >
                                <LinearGradient colors={['rgba(0,255,209,0.1)', 'transparent']} style={styles.adminGradient}>
                                    <FontAwesome5 name="tools" size={14} color={ZONAI_CYAN} />
                                    <Text style={[styles.adminBtnText, fontStyle]}>EDITAR REGISTROS SAGRADOS</Text>
                                </LinearGradient>
                            </Pressable>
                        )}

                        <Text style={styles.footerNote}>
                            Todos os moradores desta vila estão sob o protocolo do INATEL.
                        </Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    backBtn: { position: 'absolute', top: 60, left: 25, zIndex: 20, padding: 10 },
    scroll: { paddingBottom: 50 },
    bannerContainer: { height: 350, width: '100%', justifyContent: 'flex-end', paddingBottom: 30, paddingHorizontal: 25 },
    bannerImage: { ...StyleSheet.absoluteFillObject, opacity: 0.7 },
    bannerOverlay: { ...StyleSheet.absoluteFillObject },
    repName: { color: '#fff', fontSize: 40, textShadowColor: ZONAI_CYAN, textShadowRadius: 15 },
    editPhotoBtn: { position: 'absolute', right: 25, bottom: 80, backgroundColor: ZONAI_CYAN, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 10 },
    infoContent: { paddingHorizontal: 25, marginTop: -20 },
    infoCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', overflow: 'hidden', padding: 10 },
    infoItem: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
    infoTextGroup: { marginLeft: 20 },
    infoLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 8, letterSpacing: 2, marginBottom: 4 },
    infoValue: { color: '#fff', fontSize: 14, fontWeight: '600' },
    adminAction: { marginTop: 30, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(0, 255, 209, 0.3)', overflow: 'hidden' },
    adminGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18 },
    adminBtnText: { color: ZONAI_CYAN, fontSize: 10, marginLeft: 12, letterSpacing: 2 },
    footerNote: { textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 9, marginTop: 40, letterSpacing: 1 }
});