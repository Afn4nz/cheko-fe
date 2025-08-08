// src/screens/HomeScreen.tsx
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

// feature API
import { getCategories } from "../features/categories/api/categories.api";
// dynamic icons
import { categoryIcons, pickIcon } from "../constants/icons";

// --- Your own icon images ---
const SEARCH_ICON = require("../../assets/icons/search.png");
const FILTER_ICON = require("../../assets/icons/filter.png");

type UICategory = {
  id: string;
  name: string;
  count: number;
  tint: string;
  iconKey?: keyof typeof categoryIcons;
};

const TINTS = ["#F8CFE0", "#CFE6FF", "#EBD8FF", "#D9D9FF", "#DDF6EE"];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"Home" | "Map">("Home");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<UICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const list = await getCategories(); // unwrapped array
        if (!mounted) return;

        const ui = (list as any[]).map((c, i): UICategory => ({
          id: String(c.id),
          name: c.name,
          count: c.count ?? c.itemCount ?? 0,
          tint: TINTS[i % TINTS.length],
          iconKey: pickIcon(c.name),
        }));

        setData(ui);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load categories");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const renderCategory = ({ item }: { item: UICategory }) => (
    <View style={styles.chip}>
      <View style={[styles.iconPill, { backgroundColor: item.tint }]}>
        {item.iconKey ? (
          <Image source={categoryIcons[item.iconKey]} style={styles.icon} resizeMode="contain" />
        ) : (
          <Text style={{ fontSize: 12 }}>🏷️</Text>
        )}
      </View>
      <Text style={styles.chipLabel}>{item.name}</Text>
      <Text style={styles.chipCount}>{item.count}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {(["Home", "Map"] as const).map((t) => {
          const active = activeTab === t;
          return (
            <TouchableOpacity key={t} onPress={() => setActiveTab(t)} style={[styles.tab, active && styles.tabActive]}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Search row */}
      <View style={styles.searchWrap}>
        <View style={styles.searchLeft}>
          <Image source={SEARCH_ICON} style={styles.iconSmall} resizeMode="contain" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.input}
          />
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.filterBtn} onPress={() => {}}>
          <Image source={FILTER_ICON} style={styles.iconSmall} resizeMode="contain" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal categories */}
      {loading ? (
        <View style={{ padding: 16 }}>
          <ActivityIndicator />
        </View>
      ) : err ? (
        <Text style={{ color: "red", paddingHorizontal: 16 }}>{err}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, paddingVertical: 12 }}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={152}
          ListEmptyComponent={<Text style={{ padding: 16 }}>No categories</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7f9" },

  // Tabs
  tabs: { flexDirection: "row", gap: 16, paddingHorizontal: 16, paddingTop: 12 },
  tab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  tabActive: { backgroundColor: "#F7C7D9" },
  tabText: { fontSize: 14, color: "#bbb" },
  tabTextActive: { color: "#222", fontWeight: "600" },

  // Search bar
  searchWrap: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  searchLeft: { flexDirection: "row", alignItems: "center", flex: 1, gap: 8, paddingLeft: 4 },
  input: { flex: 1, height: 36 },

  iconSmall: { width: 16, height: 16 },
  divider: { width: 1, height: 28, backgroundColor: "#eee", marginHorizontal: 8 },
  filterBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 6 },
  filterText: { fontSize: 14, color: "#444" },
  searchBtn: {
    backgroundColor: "#F7C7D9",
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnText: { fontWeight: "600", color: "#333" },

  // CHIP CARD styles
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eef0f2",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    minWidth: 140,
    justifyContent: "flex-start",
  },
  iconPill: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: { width: 18, height: 18 },
  chipLabel: { fontSize: 14, fontWeight: "600", color: "#333" },
  chipCount: { marginLeft: 8, fontSize: 12, color: "#666" },
});
