"use client";

import { Button } from "@/app/_shared/components/ui/button";
import { Input } from "@/app/_shared/components/ui/input";
import { Label } from "@/app/_shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/app/_shared/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_shared/components/ui/sheet";
import { Filter, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

export type NumericFilterState = {
  min: number | "";
  max: number | "";
};

export type AdvancedFilters = {
  salary: NumericFilterState;
  overtime: NumericFilterState;
  paid_leave: NumericFilterState;
  age: NumericFilterState;
  duration: NumericFilterState;
  employees: NumericFilterState;
  revenue: NumericFilterState;
};

export const initialAdvancedFilters: AdvancedFilters = {
  salary: { min: "", max: "" },
  overtime: { min: "", max: "" },
  paid_leave: { min: "", max: "" },
  age: { min: "", max: "" },
  duration: { min: "", max: "" },
  employees: { min: "", max: "" },
  revenue: { min: "", max: "" },
};

// Filter keys include AdvancedFilters keys AND 'industry'
type FilterKey = keyof AdvancedFilters | "industry";

const FILTER_LABELS: Record<FilterKey, string> = {
  industry: "業種",
  salary: "平均年収 (万円)",
  overtime: "月間残業時間 (h)",
  paid_leave: "有休消化率 (%)",
  age: "平均年齢 (歳)",
  duration: "平均勤続年数 (年)",
  employees: "従業員数 (人)",
  revenue: "売上高 (億円)",
};

type FilterSheetProps = {
  industries: string[];
  selectedIndustries: string[];
  onIndustriesChange: (value: string[]) => void;
  advancedFilters: AdvancedFilters;
  onAdvancedFilterChange: (key: keyof AdvancedFilters, type: "min" | "max", value: number | "") => void;
  onClear: () => void;
};

export function FilterSheet({
  industries,
  selectedIndustries,
  onIndustriesChange,
  advancedFilters,
  onAdvancedFilterChange,
  onClear,
}: FilterSheetProps) {
  // Track which filters are currently visible/active in the UI
  const [activeKeys, setActiveKeys] = useState<Set<FilterKey>>(new Set());

  // Initialize activeKeys based on current values
  useEffect(() => {
    const keysWithValues = new Set<FilterKey>();
    
    // Check Numeric Filters
    Object.entries(advancedFilters).forEach(([key, val]) => {
      if (val.min !== "" || val.max !== "") {
        keysWithValues.add(key as keyof AdvancedFilters);
      }
    });

    // Check Industry Filter
    if (selectedIndustries.length > 0) {
      keysWithValues.add("industry");
    }

    if (keysWithValues.size > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveKeys(prev => {
        const next = new Set(prev);
        keysWithValues.forEach(k => next.add(k));
        return next;
      });
    }
  }, [advancedFilters, selectedIndustries]);

  // Count active filters
  const activeCount = 
    (selectedIndustries.length > 0 ? 1 : 0) +
    Object.values(advancedFilters).filter(f => f.min !== "" || f.max !== "").length;

  const handleAddFilter = (key: FilterKey) => {
    setActiveKeys(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const handleRemoveFilter = (key: FilterKey) => {
    // 1. Remove from UI
    setActiveKeys(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });

    // 2. Clear values
    if (key === "industry") {
      onIndustriesChange([]);
    } else {
      onAdvancedFilterChange(key as keyof AdvancedFilters, "min", "");
      onAdvancedFilterChange(key as keyof AdvancedFilters, "max", "");
    }
  };

  const handleClearAll = () => {
    setActiveKeys(new Set());
    onClear();
  };

  const unusedFilters = (Object.keys(FILTER_LABELS) as FilterKey[])
    .filter(key => !activeKeys.has(key));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 relative">
          <Filter className="h-4 w-4" />
          {activeCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground border border-white">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-[90%] sm:max-w-[450px] px-3">
        <SheetHeader className="mb-6">
          <SheetTitle>絞り込み条件</SheetTitle>
          <SheetDescription>
            必要な条件を追加して、企業を絞り込みます。
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-10">
          {/* Active Filters List */}
          <div className="space-y-4">
            {Array.from(activeKeys).map(key => (
              <div key={key} className="relative bg-muted/30 p-3 rounded-md border animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-medium text-muted-foreground">{FILTER_LABELS[key]}</Label>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 -mr-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemoveFilter(key)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                {key === "industry" ? (
                  <IndustryFilter 
                    allIndustries={industries} 
                    selected={selectedIndustries}
                    onChange={onIndustriesChange}
                  />
                ) : (
                  <FilterInputs 
                    min={advancedFilters[key as keyof AdvancedFilters].min} 
                    max={advancedFilters[key as keyof AdvancedFilters].max}
                    onChange={(type, val) => onAdvancedFilterChange(key as keyof AdvancedFilters, type, val)}
                  />
                )}
              </div>
            ))}

            {activeKeys.size === 0 && (
                 <div className="text-center py-8 px-4 bg-muted/10 rounded-lg border border-dashed">
                   <Filter className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
                   <p className="text-sm text-muted-foreground mb-1">条件が設定されていません</p>
                   <p className="text-xs text-muted-foreground/70">下のボタンから条件を追加してください</p>
                 </div>
              )}
          </div>

          {/* Add Filter Button */}
          {unusedFilters.length > 0 && (
            <div className="pt-2">
              <Select onValueChange={(val) => handleAddFilter(val as FilterKey)} value="">
                <SelectTrigger className="w-full border-dashed text-muted-foreground hover:text-foreground">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    条件を追加する
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {unusedFilters.map(key => (
                    <SelectItem key={key} value={key}>
                      {FILTER_LABELS[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="pt-4 sticky bottom-0 bg-background pb-4 border-t">
             <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50" onClick={handleClearAll}>
              全ての条件をクリア
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function FilterInputs({ min, max, onChange }: { min: number | ""; max: number | ""; onChange: (type: "min" | "max", value: number | "") => void; }) {
  return (
    <div className="flex items-center gap-2">
      <Input 
        type="number" 
        placeholder="Min" 
        value={min} 
        onChange={(e) => onChange("min", e.target.value === "" ? "" : Number(e.target.value))} 
        className="h-9 text-sm bg-background" 
        min={0} 
      />
      <span className="text-muted-foreground text-xs">~</span>
      <Input 
        type="number" 
        placeholder="Max" 
        value={max} 
        onChange={(e) => onChange("max", e.target.value === "" ? "" : Number(e.target.value))} 
        className="h-9 text-sm bg-background" 
        min={0} 
      />
    </div>
  );
}

function IndustryFilter({ allIndustries, selected, onChange }: { allIndustries: string[], selected: string[], onChange: (val: string[]) => void }) {
    const toggleIndustry = (industry: string) => {
        if (selected.includes(industry)) {
            onChange(selected.filter(i => i !== industry));
        } else {
            onChange([...selected, industry]);
        }
    };

    return (
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {allIndustries.map(industry => (
                <div key={industry} className="flex items-center space-x-2">
                    {/* Native checkbox for now as we lack a Checkbox component */}
                    <input
                        type="checkbox"
                        id={`ind-${industry}`}
                        checked={selected.includes(industry)}
                        onChange={() => toggleIndustry(industry)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                    />
                    <label 
                        htmlFor={`ind-${industry}`} 
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                        {industry}
                    </label>
                </div>
            ))}
        </div>
    );
}
