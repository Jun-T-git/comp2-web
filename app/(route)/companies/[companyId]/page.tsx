import { RadarChartSection } from "@/app/(route)/compare/_components/ComparisonCharts/RadarChartSection";
import companiesData from "@/app/_shared/data/companies.json";
import { Company } from "@/app/_shared/types/company.type";
import { notFound } from "next/navigation";
import { CompanyAnalysis } from "./_components/CompanyAnalysis";
import { CompanyBottomBar } from "./_components/CompanyBottomBar";
import { CompanyDetailsTable } from "./_components/CompanyDetailsTable";
import { CompanyHeader } from "./_components/CompanyHeader";
import { CompanyHero } from "./_components/CompanyHero";
import { RelatedCompanies } from "./_components/RelatedCompanies";

// colors for single company radar chart.
const SINGLE_COMPANY_COLORS = ["#0A3BA1"]; // Primary Blue

type Props = {
  params: Promise<{ companyId: string }>;
};

export default async function CompanyDetailPage({ params }: Props) {
  const { companyId } = await params;
  
  // Cast to Company[] to ensure types
  const allCompanies = companiesData as Company[];
  const company = allCompanies.find(c => c.id === companyId);

  if (!company) {
    notFound();
  }

  // Filter related companies (Same industry, excluding current)
  // Take top 3 for display
  const relatedCompanies = allCompanies
    .filter(c => c.industry === company.industry && c.id !== company.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 pb-32 md:pb-20">
      {/* 0. Sticky Header with Back Button */}
      <CompanyHeader />

      {/* 1. Hero Section (Includes Identity, Summary, and Key Stats) */}
      <CompanyHero company={company} />

      <div className="container mx-auto max-w-5xl px-4 md:px-6 pt-6 space-y-10">
          
          {/* 2. Analysis & Charts Grid 
              Mobile: Chart (Top) -> Analysis (Bottom)
              Desktop: Analysis (Left) -> Chart (Right)
          */}
          <section className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
               {/* Left column on Desktop (Analysis) -> Order 2 on Mobile (displayed below charts) */}
               <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
                   {/* Risk Text Only (Summary is in Hero) */}
                   <CompanyAnalysis company={company} />
                   <CompanyDetailsTable company={company} />
               </div>

               {/* Right column on Desktop (Chart) -> Order 1 on Mobile (displayed above analysis) */}
               <div className="lg:col-span-5 order-1 lg:order-2">
                   <div className="sticky top-24">
                       <RadarChartSection 
                            companies={[company]} 
                            allCompanies={allCompanies} 
                            colors={SINGLE_COMPANY_COLORS} 
                       />
                       <div className="mt-4 p-4 rounded-lg bg-blue-50/50 text-xs text-muted-foreground leading-relaxed border border-blue-100">
                           <p className="font-semibold text-blue-800 mb-1">💡 チャートの見方</p>
                           全体平均を「3」とした相対評価です。5角形の面積が大きいほど、総合的なバランスに優れた「隠れ優良企業」である可能性が高まります。
                       </div>
                   </div>
               </div>
          </section>

          {/* 4. Related Companies */}
          <section>
              <RelatedCompanies currentCompanyId={company.id} companies={relatedCompanies} />
          </section>

      </div>

      {/* Mobile Sticky Bottom Bar */}
      <CompanyBottomBar company={company} />
    </main>
  );
}
