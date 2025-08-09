import { SafeAreaView, FlatList, Text, View } from "react-native";
import { useCategories } from "../hooks/useCategories";
import CategoryCard from "../components/CategoryCard";

export default function CategoriesScreen() {
  const { data, loading, error } = useCategories();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading…</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ padding: 16, color: "red" }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f7f9" }}>
      <FlatList
        data={data}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => <CategoryCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingVertical: 12,
        }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        ListEmptyComponent={<Text style={{ padding: 16 }}>No categories</Text>}
      />
    </SafeAreaView>
  );
}
