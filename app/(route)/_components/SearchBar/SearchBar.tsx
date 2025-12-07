"use client";

import { Badge } from "@/app/_shared/components/ui/badge";
import { Input } from "@/app/_shared/components/ui/input";
import type { Company } from "@/app/_shared/types/company.type";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

type SearchBarProps = {
  companies: Company[];
  onSelect: (company: Company) => void;
  selectedIds: string[];
};

export function SearchBar({ companies, onSelect, selectedIds }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(companies, {
        keys: ["name", "kana", "id", "industry", "content.tags"],
        threshold: 0.3,
        includeScore: true,
      }),
    [companies]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [fuse, query]);

  const handleSelect = (company: Company) => {
    onSelect(company);
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full h-10 pl-10 text-base"
        />
      </div>
      
      {showSuggestions && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-lg shadow-lg overflow-hidden">
          {results.map(({ item }) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                disabled={isSelected}
                className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center justify-between ${
                  isSelected ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground text-sm">
                      ({item.id})
                    </span>
                    {item.flags.is_holding && (
                      <Badge variant="outline" className="text-xs">
                        HD
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.industry}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">
                    {item.metrics.salary}万円
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    平均年収
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
