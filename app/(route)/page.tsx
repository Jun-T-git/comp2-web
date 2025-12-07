
"use client";

import {
  loadCart,
  saveCart,
  saveHistory,
} from "@/app/_client-only/_service/storage/storage.service";
import companiesData from "@/app/_shared/data/companies.json";
import type { Company } from "@/app/_shared/types/company.type";
import { useEffect, useMemo, useState } from "react";
import { CompanyCard } from "./_components/CompanyCard/CompanyCard";
import { ComparisonCart } from "./_components/ComparisonCart/ComparisonCart";
import { AdvancedFilters, FilterSheet, initialAdvancedFilters } from "./_components/FilterSheet/FilterSheet";
import { SearchBar } from "./_components/SearchBar/SearchBar";
import { SortOption, SortSheet } from "./_components/SortSheet/SortSheet";

const companies = companiesData as Company[];

export default function Home() {
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // フィルター・ソート状態
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption | null>("salary");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Advanced Filters State
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(initialAdvancedFilters);

  // 業種リストの作成
  const industries = useMemo(() => {
    return Array.from(new Set(companies.map((c) => c.industry)));
  }, []);

  // ハンドラー: Advanced Filter Update
  const handleAdvancedFilterChange = (
    key: keyof AdvancedFilters, 
    type: "min" | "max", 
    value: number | ""
  ) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: value
      }
    }));
  };

  // ハンドラー: Clear Filters
  const handleClearFilters = () => {
    setAdvancedFilters(initialAdvancedFilters);
    setSelectedIndustries([]);
  };

  // フィルタリングとソートの適用
  const filteredAndSortedCompanies = useMemo(() => {
    let result = [...companies];

    // 業種フィルター (Multi-select OR logic)
    if (selectedIndustries.length > 0) {
      result = result.filter((c) => selectedIndustries.includes(c.industry));
    }

    // Numeric Filters
    result = result.filter(c => {
      // Helper for range check
      const checkRange = (val: number | null, filter: { min: number | ""; max: number | "" }) => {
        if (filter.min === "" && filter.max === "") return true; // No filter applied for this metric
        if (val === null) return false; // Exclude null if filter is active

        if (filter.min !== "" && val < filter.min) return false;
        if (filter.max !== "" && val > filter.max) return false;
        return true;
      };

      if (!checkRange(c.metrics.salary, advancedFilters.salary)) return false;
      if (!checkRange(c.metrics.overtime, advancedFilters.overtime)) return false;
      if (!checkRange(c.metrics.paid_leave, advancedFilters.paid_leave)) return false;
      if (!checkRange(c.metrics.age, advancedFilters.age)) return false;
      if (!checkRange(c.metrics.duration, advancedFilters.duration)) return false;
      if (!checkRange(c.metrics.employees, advancedFilters.employees)) return false;
      if (!checkRange(c.metrics.revenue, advancedFilters.revenue)) return false;
      
      return true;
    });

    // ソート
    if (sortOption) {
      result.sort((a, b) => {
        // null値のハンドリング: 常に最後尾にするため、極端な値を返す
        // desc(降順)なら -Infinity, asc(昇順)なら Infinity にしたいが
        // 単純化のため、nullチェックを行う
        
        const valA = a.metrics[sortOption];
        const valB = b.metrics[sortOption];

        if (valA === null && valB === null) return 0;
        if (valA === null) return 1; // nullは常に後ろ
        if (valB === null) return -1; // nullは常に後ろ

        const modifier = sortOrder === "asc" ? 1 : -1;
        return (valA - valB) * modifier;
      });
    }

    return result;
  }, [selectedIndustries, sortOption, sortOrder, advancedFilters]);

  // LocalStorageからカートを復元
  useEffect(() => {
    const savedCart = loadCart();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartIds(savedCart);
    setIsLoaded(true);
  }, []);

  // カート変更時にLocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      saveCart(cartIds);
    }
  }, [cartIds, isLoaded]);

  const cartCompanies = companies.filter((c) => cartIds.includes(c.id));

  const handleAddToCart = (company: Company) => {
    if (cartIds.length >= 4) return;
    if (cartIds.includes(company.id)) {
      // 既にカートにある場合は削除（トグル動作）
      handleRemoveFromCart(company.id);
      return;
    }
    setCartIds((prev) => [...prev, company.id]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartIds((prev) => prev.filter((cId) => cId !== id));
  };

  const handleCompare = () => {
    if (cartIds.length >= 2) {
      saveHistory(cartIds);
      // TODO: 比較ページへ遷移
      alert(`比較機能は次のステップで実装します: ${cartIds.join(", ")}`);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-32">
      {/* ヒーローセクション */}
      <section className="bg-primary pt-20 pb-24 relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground tracking-tight">
              キギョヒカ
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium">
              企業データを、分かりやすく比較できる就活アプリ
            </p>
          </div>
        </div>
      </section>



      {/* 検索・フィルター・ソートバー (Compact Layout) */}
      <div className="bg-white sticky top-16 z-40 border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            {/* 1. Search Bar (Flexible) */}
            <div className="flex-1 min-w-0">
               <SearchBar
                 companies={companies}
                 onSelect={handleAddToCart}
                 selectedIds={cartIds}
               />
            </div>
            
            {/* 2. Filter Button (Icon) */}
            <div className="flex-shrink-0">
              <FilterSheet
                industries={industries}
                selectedIndustries={selectedIndustries}
                onIndustriesChange={setSelectedIndustries}
                advancedFilters={advancedFilters}
                onAdvancedFilterChange={handleAdvancedFilterChange}
                onClear={handleClearFilters}
              />
            </div>

            {/* 3. Sort Button (Icon) */}
            <div className="flex-shrink-0">
              <SortSheet
                sortOption={sortOption}
                onSortChange={(option) => {
                  setSortOption(option);
                }}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
              />
            </div>
          </div>
          
          {/* Active Filter Summary (Optional: Below the bar for context) */}
          {(selectedIndustries.length > 0 || Object.values(advancedFilters).some(f => f.min !== "" || f.max !== "")) && (
            <div className="mt-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
              {selectedIndustries.length > 0 && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded flex-shrink-0">
                  業種: {selectedIndustries.length}件
                </span>
              )}
              {Object.values(advancedFilters).some(f => f.min !== "" || f.max !== "") && (
                 <span className="bg-primary/10 text-primary px-2 py-0.5 rounded flex-shrink-0">
                   詳細条件あり
                 </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 企業リスト */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-muted-foreground text-sm">
            {filteredAndSortedCompanies.length}件の企業が見つかりました
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onAddToCart={handleAddToCart}
              isInCart={cartIds.includes(company.id)}
              highlightMetric={sortOption}
            />
          ))}
        </div>
      </section>

      {/* フローティング比較カート */}
      <ComparisonCart
        companies={cartCompanies}
        onRemove={handleRemoveFromCart}
        onCompare={handleCompare}
      />
    </main>
  );
}
