import { View, Text, Image, StyleSheet } from "react-native";
import type { Category } from "../types/category";
import { categoryIcons, pickIcon } from "@/constants/icons"; // or "../.../constants/icons" if you didn't set "@/*"

type Props = { item: Category };

export default function CategoryCard({ item }: Props) {
  // choose a fallback icon if we don't have a matching one
  const iconKey = pickIcon(item.name);

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        {iconKey ? (
          <Image source={categoryIcons[iconKey]} style={{ width: 22, height: 22 }} />
        ) : (
          <Text style={{ fontSize: 16 }}>🏷️</Text>
        )}
      </View>

      <Text style={styles.label}>{item.name}</Text>
      <Text style={styles.count}>{item.count ?? 0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    height: 72,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eef0f2",
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F2F4",
  },
  label: { fontSize: 16, fontWeight: "700", color: "#242424" },
  count: { marginLeft: "auto", fontSize: 14, color: "#666" },
});
