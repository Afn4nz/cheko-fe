// src/features/categories/api/categories.api.ts
import { http } from "@/shared/api/api";
import type { Category } from "../types/category";

export async function getCategories(): Promise<Category[]> {
  // thanks to the interceptor, this returns the unwrapped array directly
return await http.get<Category[], Category[]>("/categories");
}
