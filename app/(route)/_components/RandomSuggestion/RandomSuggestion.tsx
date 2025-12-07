"use client";

import type { Company } from "@/app/_shared/types/company.type";
import { Button } from "@/app/_shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_shared/components/ui/card";
import { RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { CompanyCard } from "../CompanyCard/CompanyCard";

type RandomSuggestionProps = {
  companies: Company[];
  onAddToCart: (company: Company) => void;
  selectedIds: string[];
};

/**
 * 隠れ優良企業を判定（時給高 or 利益率高）
 */
function isHiddenGem(company: Company): boolean {
  const { hourly_wage, profit_margin } = company.metrics;
  // 時給が4000円以上 or 利益率が20%以上
  return hourly_wage >= 4000 || profit_margin >= 20;
}

export function RandomSuggestion({
  companies,
  onAddToCart,
  selectedIds,
}: RandomSuggestionProps) {
  const hiddenGems = companies.filter(isHiddenGem);

  const getRandomCompany = useCallback(() => {
    if (hiddenGems.length === 0) return null;
    const index = Math.floor(Math.random() * hiddenGems.length);
    return hiddenGems[index];
  }, [hiddenGems]);

  const [currentCompany, setCurrentCompany] = useState<Company | null>(
    getRandomCompany
  );

  const handleRefresh = () => {
    setCurrentCompany(getRandomCompany());
  };

  if (!currentCompany) {
    return null;
  }

  return (
    <Card className="w-full bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          隠れ優良企業ガチャ
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          高時給 or 高利益率の企業をランダム紹介
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <CompanyCard
          company={currentCompany}
          onAddToCart={onAddToCart}
          isInCart={selectedIds.includes(currentCompany.id)}
        />
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="w-full"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          別の企業を見る
        </Button>
      </CardContent>
    </Card>
  );
}
