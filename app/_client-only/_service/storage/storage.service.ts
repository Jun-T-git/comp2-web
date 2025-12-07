const CART_STORAGE_KEY = "comparison-cart";


/**
 * 比較カートをLocalStorageに保存
 */
export function saveCart(companyIds: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(companyIds));
}

/**
 * 比較カートをLocalStorageから取得
 */
export function loadCart(): string[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as string[];
  } catch {
    return [];
  }
}



/**
 * カートをクリア
 */
export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
}
