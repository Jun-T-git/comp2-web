"use client";

import { loadHistory, type ComparisonHistory } from "@/app/_client-only/_service/storage/storage.service";
import { Badge } from "@/app/_shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_shared/components/ui/card";
import type { Company } from "@/app/_shared/types/company.type";
import { History } from "lucide-react";
import { useEffect, useState } from "react";

type BrowsingHistoryProps = {
  companies: Company[];
  onRestore: (companyIds: string[]) => void;
};

export function BrowsingHistory({ companies, onRestore }: BrowsingHistoryProps) {
  const [history, setHistory] = useState<ComparisonHistory[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(loadHistory());
  }, []);

  if (history.length === 0) {
    return null;
  }

  const companyMap = new Map(companies.map((c) => [c.id, c]));

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5" />
          比較履歴
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {history.slice(0, 5).map((entry, index) => (
          <button
            key={`${entry.timestamp}-${index}`}
            onClick={() => onRestore(entry.companyIds)}
            className="w-full p-3 bg-muted rounded-lg hover:bg-accent transition-colors text-left"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex flex-wrap gap-1">
                {entry.companyIds.map((id) => {
                  const company = companyMap.get(id);
                  return (
                    <Badge key={id} variant="secondary" className="text-xs">
                      {company?.name || id}
                    </Badge>
                  );
                })}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(entry.timestamp)}
            </p>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
