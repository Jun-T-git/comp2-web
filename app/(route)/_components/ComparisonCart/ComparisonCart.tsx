"use client";

import { Badge } from "@/app/_shared/components/ui/badge";
import { Button } from "@/app/_shared/components/ui/button";
import { Card } from "@/app/_shared/components/ui/card";
import type { Company } from "@/app/_shared/types/company.type";
import { ArrowLeftRight, X } from "lucide-react";

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

  // Create array of 4 slots, filling empty ones with null
  const slots = Array.from({ length: maxItems }, (_, i) => companies[i] || null);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-transparent pointer-events-none z-50">
      <div className="container mx-auto max-w-5xl pointer-events-auto">
        <Card className="shadow-2xl border-t p-2 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="flex items-center gap-2">
            {/* Left: Company Cards - Grid with max space */}
            <div className="grid grid-cols-4 gap-1.5 flex-1 min-w-0">
              {slots.map((company, index) => (
                company ? (
                  <div
                    key={company.id}
                    className="flex flex-col justify-center px-1.5 py-1 bg-gradient-to-br from-primary/5 to-primary/10 rounded-md border border-primary/20 text-xs relative group hover:border-primary/40 hover:shadow-sm transition-all h-12"
                  >
                    <button
                      onClick={() => onRemove(company.id)}
                      className="absolute -top-1.5 -right-1.5 bg-background border border-border rounded-full p-0.5 text-muted-foreground hover:text-destructive opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-10 shadow-sm"
                      aria-label="削除"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    
                    <div className="w-full text-center">
                      <p className="font-bold text-xs truncate leading-tight text-foreground" title={company.name}>
                        {company.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={`empty-${index}`}
                    className="flex items-center justify-center bg-muted/20 rounded-md border border-dashed border-muted-foreground/15 h-12"
                  >
                    <span className="text-sm font-bold text-muted-foreground/20">{index + 1}</span>
                  </div>
                )
              ))}
            </div>

            {/* Right: Compare Button (Icon Only) */}
            <div className="flex-shrink-0 ml-1">
              <Button
                onClick={onCompare}
                disabled={companies.length < 2}
                className="rounded-full w-12 h-12 p-0 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground relative disabled:opacity-50 transition-all hover:scale-105 flex items-center justify-center"
              >
                <ArrowLeftRight className="w-6 h-6" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px] border-2 border-white shadow-sm"
                >
                  {companies.length}
                </Badge>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
