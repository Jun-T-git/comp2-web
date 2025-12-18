"use client";

import { Input } from "@/app/_shared/components/ui/input";
import type { Company } from "@/app/_shared/types/company.type";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

type SearchBarProps = {
  companies: Company[];
  onSelect: (company: Company) => void;
  selectedIds: string[];
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ companies, onSelect, selectedIds, value, onChange }: SearchBarProps) {
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
    if (!value.trim()) return [];
    return fuse.search(value).slice(0, 8);
  }, [fuse, value]);

  const handleSelect = (company: Company) => {
    onSelect(company);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="検索..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full h-10 pl-10 text-base border-0 bg-transparent shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50"
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
                className={`w-full px-3 py-3 text-left hover:bg-accent transition-colors flex items-center justify-between ${isSelected ? 'bg-primary/5 text-primary' : ''}`}
              >
                <span className="font-medium">{item.name}</span>
                {isSelected && <span className="text-xs bg-primary/10 px-2 py-0.5 rounded">選択中</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
