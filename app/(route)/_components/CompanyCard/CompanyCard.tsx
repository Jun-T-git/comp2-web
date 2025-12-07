
"use client";

import { Badge } from "@/app/_shared/components/ui/badge";
import { Button } from "@/app/_shared/components/ui/button";
import { Card, CardContent } from "@/app/_shared/components/ui/card";
import type { Company } from "@/app/_shared/types/company.type";
import { Banknote, Building2, Calendar, Clock, Hourglass, User, Users } from "lucide-react";
import { SortOption } from "../SortSheet/SortSheet";

type CompanyCardProps = {
  company: Company;
  onAddToCart?: (company: Company) => void;
  isInCart?: boolean;
  showAddButton?: boolean;
  highlightMetric?: SortOption | null;
};

export function CompanyCard({
  company,
  onAddToCart,
  isInCart = false,
  showAddButton = true,
  highlightMetric,
}: CompanyCardProps) {
  // Helper to get highlighting classes
  const getHighlightClass = (metricKey: SortOption) => {
    return highlightMetric === metricKey
      ? "!border-accent !border-b-2 font-bold text-primary [&_.text-muted-foreground]:text-primary"
      : "";
  };

  return (
    <Card className={`w-full transition-all duration-200 hover:shadow-lg ${isInCart ? "ring-2 ring-primary border-primary" : ""}`}>
      <CardContent className="p-3 md:p-5 flex flex-col h-full">
        {/* Header: Context & Action */}
        <div className="flex justify-between items-start mb-1 md:mb-3">
          <Badge variant="outline" className="text-xs text-muted-foreground font-medium bg-background">
            {company.industry}
          </Badge>
          
          {showAddButton && onAddToCart && (
            <Button
              onClick={() => onAddToCart(company)}
              size="sm"
              className={`rounded-full h-8 px-4 text-xs font-bold transition-all ${
                isInCart 
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90" 
                  : "bg-white text-primary border border-primary hover:bg-primary/5"
              }`}
            >
              {isInCart ? "選択中" : "選択"}
            </Button>
          )}
        </div>

        {/* Identity: Name & Tags */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-foreground leading-snug">
              {company.name}
            </h3>
            {/* {company.flags.is_holding && (
              <Badge variant="destructive" className="h-5 px-1.5 text-[10px] gap-0.5">
                <AlertTriangle className="h-3 w-3" />
                HD
              </Badge>
            )} */}
          </div>
          {/* <div className="flex flex-wrap gap-1.5 opacity-80">
            {company.content.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div> */}
        </div>

        {/* Compact Metrics Grid (7 Items) - Uniform Layout */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-3 mt-auto">
          {/* 1. Average Annual Salary */}
          <div className={`flex items-center justify-between text-xs border-b border-border/40 pb-1 ${getHighlightClass("salary")}`}>
            <div className="flex items-center gap-1.5 text-muted-foreground transition-colors inherit">
              <Banknote className="w-3.5 h-3.5" />
              <span>平均年収</span>
            </div>
            <div className="font-semibold">{company.metrics.salary} <span className="text-[10px] font-normal text-muted-foreground">万円</span></div>
          </div>

          {/* 2. Monthly Overtime */}
          <div className={`flex items-center justify-between text-xs border-b border-border/40 pb-1 ${getHighlightClass("overtime")}`}>
            <div className="flex items-center gap-1.5 text-muted-foreground transition-colors inherit">
              <Clock className="w-3.5 h-3.5" />
              <span>平均残業</span>
            </div>
            <div className="font-semibold">{company.metrics.overtime ?? "-"} <span className="text-[10px] font-normal text-muted-foreground">時間/月</span></div>
          </div>

          {/* 3. Paid Leave */}
          <div className={`flex items-center justify-between text-xs border-b border-border/40 pb-1 ${getHighlightClass("paid_leave")}`}>
            <div className="flex items-center gap-1.5 text-muted-foreground transition-colors inherit">
              <Calendar className="w-3.5 h-3.5" />
              <span>有休取得</span>
            </div>
            <div className="font-semibold">{company.metrics.paid_leave ?? "-"} <span className="text-[10px] font-normal text-muted-foreground">%</span></div>
          </div>

          {/* 4. Average Age */}
          <div className={`flex items-center justify-between text-xs border-b border-border/40 pb-1 ${getHighlightClass("age")}`}>
            <div className="flex items-center gap-1.5 text-muted-foreground transition-colors inherit">
              <User className="w-3.5 h-3.5" />
              <span>平均年齢</span>
            </div>
            <div className="font-semibold">{company.metrics.age} <span className="text-[10px] font-normal text-muted-foreground">歳</span></div>
          </div>

          {/* 5. Duration */}
          <div className={`flex items-center justify-between text-xs border-b border-border/40 pb-1 ${getHighlightClass("duration")}`}>
            <div className="flex items-center gap-1.5 text-muted-foreground transition-colors inherit">
              <Hourglass className="w-3.5 h-3.5" />
              <span>平均勤続</span>
            </div>
            <div className="font-semibold">{company.metrics.duration} <span className="text-[10px] font-normal text-muted-foreground">年</span></div>
          </div>

          {/* 6. Employees */}
          <div className={`flex items-center justify-between text-xs border-b border-border/40 pb-1 ${getHighlightClass("employees")}`}>
            <div className="flex items-center gap-1.5 text-muted-foreground transition-colors inherit">
              <Users className="w-3.5 h-3.5" />
              <span>従業員数</span>
            </div>
            <div className="font-semibold">{company.metrics.employees.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">人</span></div>
          </div>

          {/* 7. Revenue */}
          <div className={`flex items-center justify-between text-xs border-b border-border/40 pb-1 ${getHighlightClass("revenue")}`}>
            <div className="flex items-center gap-1.5 text-muted-foreground transition-colors inherit">
              <Building2 className="w-3.5 h-3.5" />
              <span>売上高</span>
            </div>
            <div className="font-semibold">{company.metrics.revenue.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">億</span></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
