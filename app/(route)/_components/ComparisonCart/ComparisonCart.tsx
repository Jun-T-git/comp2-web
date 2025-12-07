"use client";

import { Button } from "@/app/_shared/components/ui/button";
import { Card } from "@/app/_shared/components/ui/card";
import type { Company } from "@/app/_shared/types/company.type";
import { ChevronRight, X } from "lucide-react";

type ComparisonCartProps = {
  companies: Company[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  maxItems?: number;
};

export function ComparisonCart({
  companies,
  onRemove,
  onCompare,
  maxItems = 4,
}: ComparisonCartProps) {
  if (companies.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent pointer-events-none z-50">
      <div className="container mx-auto max-w-5xl pointer-events-auto">
        <Card className="shadow-2xl border-t p-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 overflow-x-auto min-w-0">
              <div className="flex-shrink-0 font-bold whitespace-nowrap mr-2">
                比較リスト ({companies.length}/{maxItems})
              </div>
              
              <div className="flex gap-3">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex flex-col justify-between w-40 p-2 bg-muted/50 rounded-lg border text-sm relative group shrink-0"
                  >
                    <button
                      onClick={() => onRemove(company.id)}
                      className="absolute top-1 right-1 text-muted-foreground hover:text-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="pr-4">
                      <p className="text-xs text-muted-foreground truncate mb-0.5">
                        {company.industry}
                      </p>
                      <p className="font-bold truncate" title={company.name}>
                        {company.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <Button
                onClick={onCompare}
                disabled={companies.length < 2}
                className="rounded-full px-6 h-12 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                比較する
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
