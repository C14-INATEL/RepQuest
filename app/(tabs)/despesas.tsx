import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
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
  View,
} from "react-native";

import { useRep } from "../../contexts/RepContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");
const ZONAI_CYAN = "#00FFD1";
const RUPEE_GOLD = "#fcac03";

export default function DespesasScreen() {
  const { totalRupes, gastarRupes, despesas, setDespesasGlobal, loading } =
    useRep();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [novaDespesa, setNovaDespesa] = useState({ titulo: "", valor: "" });

  const [fontsLoaded] = useFonts({
    ZeldaFont: require("../../assets/fonts/HyliaSerif.otf"),
  });

  const fontStyle = fontsLoaded ? { fontFamily: "ZeldaFont" } : {};

  const totalDivida = despesas.reduce((acc, curr) => acc + curr.valor, 0);

  const adicionarDespesa = () => {
    if (!novaDespesa.titulo || !novaDespesa.valor) return;

    const idUnico = Math.random().toString(36).substr(2, 9);
    const itemFormatado = {
      id: idUnico,
      titulo: novaDespesa.titulo,
      valor: parseFloat(novaDespesa.valor),
      categoria: "coins",
      icon: "coins",
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setDespesasGlobal([itemFormatado, ...despesas]);

    setModalVisivel(false);
    setNovaDespesa({ titulo: "", valor: "" });
  };

  const pagarDespesa = (id: string, valor: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    gastarRupes(valor);
    setDespesasGlobal(despesas.filter((item) => item.id !== id));
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerSubtitle}>INVENTÁRIO DE DÉBITOS</Text>
      <Text style={[styles.headerTitle, fontStyle]}>Tesouro da Casa</Text>

      <View style={styles.totalBox}>
        <LinearGradient
          colors={["rgba(252, 172, 3, 0.15)", "rgba(0,0,0,0.6)"]}
          style={styles.totalGradient}
        >
          <Text style={[styles.balanceLabel, fontStyle]}>
            SALDO ATUAL: {totalRupes.toLocaleString()} R
          </Text>

          <View style={styles.dividerTotal} />

          <Text style={[styles.totalLabel, fontStyle]}>TOTAL A RECOLHER</Text>
          <View style={styles.totalRow}>
            <Text style={[styles.totalValue, fontStyle]}>
              {totalDivida.toLocaleString()}
            </Text>
            <MaterialCommunityIcons
              name="triforce"
              size={24}
              color={RUPEE_GOLD}
              style={{ marginLeft: 10 }}
            />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <MaterialCommunityIcons
          name="shield-outline"
          size={20}
          color={ZONAI_CYAN}
          style={{ marginHorizontal: 15 }}
        />
        <View style={styles.dividerLine} />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={RUPEE_GOLD} />
        <Text style={[styles.balanceLabel, fontStyle, { marginTop: 20 }]}>
          CARREGANDO TESOURO...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../assets/images/sheikah-bg.jpg")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.96)",
            "rgba(0,30,30,0.85)",
            "rgba(0,0,0,0.98)",
          ]}
          style={StyleSheet.absoluteFillObject}
        />

        <FlatList
          data={despesas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={({ hovered }: any) => [
                styles.itemCard,
                hovered && styles.itemCardHover,
              ]}
            >
              <View style={styles.iconCircle}>
                <FontAwesome5
                  name={item.icon as any}
                  size={18}
                  color={ZONAI_CYAN}
                />
              </View>

              <View style={styles.infoWrapper}>
                <Text style={[styles.itemTitle, fontStyle]}>
                  {item.titulo.toUpperCase()}
                </Text>
                <Text style={styles.itemCategory}>
                  {item.categoria.toUpperCase()}
                </Text>
              </View>

              <View style={styles.valueWrapper}>
                <Text style={[styles.itemValue, fontStyle]}>
                  {item.valor} R
                </Text>

                <Pressable
                  testID={`pagar-despesa-${item.id}`}
                  onPress={() => pagarDespesa(item.id, item.valor)}
                  style={styles.deleteBtn}
                >
                  <FontAwesome5
                    name="check-circle"
                    size={18}
                    color={RUPEE_GOLD}
                  />
                </Pressable>
              </View>
            </Pressable>
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <Pressable
          testID="fab-add-despesa"
          style={({ pressed }) => [
            styles.fab,
            pressed && { transform: [{ scale: 1.1 }] },
          ]}
          onPress={() => setModalVisivel(true)}
        >
          <LinearGradient
            colors={[RUPEE_GOLD, "#8b5e00"]}
            style={styles.fabGradient}
          >
            <FontAwesome5 name="coins" size={20} color="#000" />
          </LinearGradient>
        </Pressable>

        <Modal
          animationType="fade"
          transparent
          visible={modalVisivel}
          onRequestClose={() => setModalVisivel(false)}
        >
          <View style={styles.modalOverlay}>
            <LinearGradient
              colors={["rgba(25,20,5,0.98)", "rgba(0,0,0,1)"]}
              style={styles.modalContent}
            >
              <Text style={[styles.modalTitle, fontStyle]}>Novo Débito</Text>

              <TextInput
                style={styles.input}
                placeholder="DESCRIÇÃO DA DESPESA..."
                placeholderTextColor="rgba(252, 172, 3, 0.3)"
                value={novaDespesa.titulo}
                onChangeText={(txt) =>
                  setNovaDespesa({ ...novaDespesa, titulo: txt })
                }
              />

              <TextInput
                style={styles.input}
                placeholder="VALOR EM RÚPIAS..."
                placeholderTextColor="rgba(252, 172, 3, 0.3)"
                keyboardType="numeric"
                value={novaDespesa.valor}
                onChangeText={(txt) =>
                  setNovaDespesa({ ...novaDespesa, valor: txt })
                }
              />

              <View style={styles.modalButtons}>
                <Pressable
                  testID="btn-descartar"
                  style={styles.btnCancel}
                  onPress={() => setModalVisivel(false)}
                >
                  <Text style={styles.btnText}>DESCARTAR</Text>
                </Pressable>

                <Pressable
                  testID="btn-registrar"
                  style={[styles.btnConfirm, { backgroundColor: RUPEE_GOLD }]}
                  onPress={adicionarDespesa}
                >
                  <Text style={[styles.btnText, { color: "#000" }]}>
                    REGISTRAR
                  </Text>
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
  container: { flex: 1, backgroundColor: "#000" },
  listContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 180 },
  headerContainer: { marginBottom: 30, alignItems: "flex-start" },
  headerSubtitle: {
    color: ZONAI_CYAN,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 5,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 42, marginBottom: 25 },

  totalBox: {
    width: "100%",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: RUPEE_GOLD,
    overflow: "hidden",
    marginBottom: 30,
  },
  totalGradient: { padding: 25, alignItems: "center" },
  balanceLabel: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 15,
    opacity: 0.9,
  },
  dividerTotal: {
    width: "60%",
    height: 1,
    backgroundColor: "rgba(252, 172, 3, 0.3)",
    marginBottom: 15,
  },
  totalLabel: {
    color: RUPEE_GOLD,
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 10,
  },
  totalRow: { flexDirection: "row", alignItems: "center" },
  totalValue: { color: "#fff", fontSize: 48 },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 255, 209, 0.2)",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(5, 15, 15, 0.8)",
    padding: 20,
    borderRadius: 2,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 209, 0.15)",
  },
  itemCardHover: {
    borderColor: ZONAI_CYAN,
    backgroundColor: "rgba(0, 255, 209, 0.05)",
    transform: [{ scale: 1.02 }],
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 209, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 209, 0.2)",
  },
  infoWrapper: { flex: 1 },
  itemTitle: { color: "#fff", fontSize: 14, letterSpacing: 1 },
  itemCategory: {
    color: "rgba(0, 255, 209, 0.5)",
    fontSize: 9,
    fontWeight: "900",
    marginTop: 4,
  },
  valueWrapper: { flexDirection: "row", alignItems: "center" },
  itemValue: { color: RUPEE_GOLD, fontSize: 18, marginRight: 15 },
  deleteBtn: { padding: 5 },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    elevation: 10,
    shadowColor: RUPEE_GOLD,
    shadowRadius: 20,
    shadowOpacity: 0.5,
  },
  fabGradient: {
    flex: 1,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  modalContent: {
    width: "100%",
    padding: 30,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: RUPEE_GOLD,
    shadowColor: RUPEE_GOLD,
    shadowRadius: 30,
    shadowOpacity: 0.3,
  },
  modalTitle: {
    color: RUPEE_GOLD,
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 2,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(252, 172, 3, 0.4)",
    color: "#fff",
    padding: 15,
    marginBottom: 25,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btnCancel: {
    padding: 15,
    width: "45%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  btnConfirm: { padding: 15, width: "45%", alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "900", letterSpacing: 2, fontSize: 10 },
});
