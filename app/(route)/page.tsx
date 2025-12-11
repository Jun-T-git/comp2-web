
"use client";

import {
  loadCart,
  saveCart,
} from "@/app/_client-only/_service/storage/storage.service";
import companiesData from "@/app/_shared/data/companies.json";
import type { Company } from "@/app/_shared/types/company.type";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CompanyCard } from "./_components/CompanyCard/CompanyCard";
import { ComparisonCart } from "./_components/ComparisonCart/ComparisonCart";
import { AdvancedFilters, FilterSheet, initialAdvancedFilters } from "./_components/FilterSheet/FilterSheet";
import { Hero } from "./_components/Hero/Hero";
import { SearchBar } from "./_components/SearchBar/SearchBar";
import { SortOption, SortSheet } from "./_components/SortSheet/SortSheet";

const companies = companiesData as Company[];

export default function Home() {
  const router = useRouter();
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // フィルター・ソート状態
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption | null>("salary");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");

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
    setSearchQuery("");
  };

  // フィルタリングとソートの適用
  const filteredAndSortedCompanies = useMemo(() => {
    let result = [...companies];

    // 検索クエリによるフィルタリング (部分一致)
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(query));
    }

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
  }, [selectedIndustries, sortOption, sortOrder, advancedFilters, searchQuery]);

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

  const cartCompanies = cartIds
    .map((id) => companies.find((c) => c.id === id))
    .filter((c): c is Company => c !== undefined);

  const handleAddToCart = (company: Company) => {
    if (cartIds.includes(company.id)) {
      // 既にカートにある場合は削除（トグル動作）
      handleRemoveFromCart(company.id);
      return;
    }
    if (cartIds.length >= 4) return;
    setCartIds((prev) => [...prev, company.id]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartIds((prev) => prev.filter((cId) => cId !== id));
  };

  const handleCompare = () => {
    if (cartIds.length >= 2) {
      const ids = cartIds.join(",");
      router.push(`/compare?companyIds=${ids}`);
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
      <Hero />



      {/* 検索・フィルター・ソートバー (Floating Capsule Layout) */}
      <div id="search-bar-section" className="sticky top-18 z-40 -mt-10 px-4 transition-all duration-300 pointer-events-none">
        <div className="container mx-auto max-w-3xl pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-xl border border-white/50 ring-1 ring-black/5 p-1.5 pl-4 flex items-center gap-2">
            {/* 1. Search Bar (Flexible) */}
            <div className="flex-1 min-w-0">
               <SearchBar
                 companies={companies}
                 onSelect={handleAddToCart}
                 selectedIds={cartIds}
                 value={searchQuery}
                 onChange={setSearchQuery}
               />
            </div>
            
            <div className="h-8 w-px bg-border/60 mx-1 hidden sm:block" />

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
            <div className="flex-shrink-0 mr-1">
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
          
          {/* Active Filter Summary */}
          {(selectedIndustries.length > 0 || Object.values(advancedFilters).some(f => f.min !== "" || f.max !== "")) && (
            <div className="mt-3 flex justify-center">
                <div className="inline-flex items-center gap-2 overflow-x-auto no-scrollbar text-xs bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-border/50">
                  {selectedIndustries.length > 0 && (
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full flex-shrink-0">
                      業種: {selectedIndustries.length}件
                    </span>
                  )}
                  {Object.values(advancedFilters).some(f => f.min !== "" || f.max !== "") && (
                     <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full flex-shrink-0">
                       詳細条件あり
                     </span>
                  )}
                </div>
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
              isCartFull={cartIds.length >= 4}
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
