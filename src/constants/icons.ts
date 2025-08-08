export const categoryIcons = {
  breakfast: require("../../assets/categories/breakfast.png"),
  drinks: require("../../assets/categories/drinks.png"),
  soups: require("../../assets/categories/soups.png"),
  sushi: require("../../assets/categories/sushi.png"),
  orders: require("../../assets/categories/orders.png"),
} as const;

// The type of the keys in categoryIcons
export type IconKey = keyof typeof categoryIcons;

/**
 * Try to match a backend category name/slug to one of our icon keys.
 * Example: "Breakfast" → "breakfast"
 */
export function pickIcon(raw: string): IconKey | undefined {
  const key = raw.toLowerCase().replace(/\s+/g, "");
  return (Object.keys(categoryIcons) as IconKey[]).find((k) => k === key);
}
