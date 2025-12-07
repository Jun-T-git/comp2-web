const CART_STORAGE_KEY = "comparison-cart";
const HISTORY_STORAGE_KEY = "browsing-history";

export type ComparisonHistory = {
  companyIds: string[];
  timestamp: number;
};

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
 * 比較履歴を保存（最大10件）
 */
export function saveHistory(companyIds: string[]): void {
  if (typeof window === "undefined") return;
  if (companyIds.length < 2) return;

  const history = loadHistory();
  const newEntry: ComparisonHistory = {
    companyIds,
    timestamp: Date.now(),
  };

  // 同じ組み合わせがあれば削除
  const filtered = history.filter(
    (h) => JSON.stringify(h.companyIds.sort()) !== JSON.stringify(companyIds.sort())
  );

  // 先頭に追加して最大10件に制限
  const updated = [newEntry, ...filtered].slice(0, 10);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
}

/**
 * 比較履歴をLocalStorageから取得
 */
export function loadHistory(): ComparisonHistory[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as ComparisonHistory[];
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
