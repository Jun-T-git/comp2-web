"use client";

import companiesData from "@/app/_shared/data/companies.json";
import { Company } from "@/app/_shared/types/company.type";
import { BarChart3, Table2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ComparisonCharts } from "./_components/ComparisonCharts/ComparisonCharts";
import { ComparisonHeader } from "./_components/ComparisonHeader";
import { ComparisonTable } from "./_components/ComparisonTable";

const allCompanies = companiesData as Company[];

function ComparePageContent() {
  const searchParams = useSearchParams();
  const companyIdsString = searchParams.get("companyIds");

  const selectedCompanies = useMemo(() => {
    const ids = companyIdsString?.split(",") || [];
    return allCompanies.filter((c) => ids.includes(c.id));
  }, [companyIdsString]);


  
  // Need to use router hook inside component for cleaner update? 
  // For MVP, passing a handler that redirects is fine.
  // Actually, standard link update is safer.
  
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  if (selectedCompanies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
            <p className="text-muted-foreground mb-4">企業が選択されていません</p>
            <Link href="/" className="text-primary hover:underline">トップへ戻る</Link>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <ComparisonHeader 
        companies={selectedCompanies} 
      />

      <main className="container mx-auto px-3 py-6 space-y-6">
        
        {/* View Switcher (Segmented Control) */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200/80 p-1 rounded-full flex w-full max-w-[200px] relative">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex-1 flex items-center justify-center py-2 rounded-full transition-all duration-200 ${
                viewMode === 'chart' 
                  ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label="チャート表示"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex-1 flex items-center justify-center py-2 rounded-full transition-all duration-200 ${
                viewMode === 'table' 
                  ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label="テーブル表示"
            >
              <Table2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {viewMode === 'chart' ? (
             <ComparisonCharts companies={selectedCompanies} allCompanies={allCompanies} />
          ) : (
             <ComparisonTable companies={selectedCompanies} />
          )}
        </div>
      </main>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}
