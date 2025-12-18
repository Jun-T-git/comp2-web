"use client";

import { Company } from "@/app/_shared/types/company.type";
import { BarChartSection } from "./BarChartSection";
import { RadarChartSection } from "./RadarChartSection";
import { ScatterPlotSection } from "./ScatterPlotSection";

type Props = {
  companies: Company[];
  allCompanies: Company[];
};

const CHART_COLORS = [
  "#0A3BA1", // Brand Blue (Primary)
  "#C0F03C", // Brand Lime (Accent)
  "#14b8a6", // Teal - Fresh, distinct from Blue/Lime
  "#6366f1", // Indigo - Tech/Modern, distinct from Primary
  "#f43f5e", // Rose - Warm contrast
  "#f59e0b", // Amber - Attention
];

export const ComparisonCharts = ({ companies, allCompanies }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Radar Chart: Takes full width on mobile, half on large */}
      <RadarChartSection companies={companies} allCompanies={allCompanies} colors={CHART_COLORS} />
      
      {/* Scatter Plot */}
      <ScatterPlotSection companies={companies} colors={CHART_COLORS} />
      
      {/* Bar Charts: Full Width */}
      <div className="lg:col-span-2">
         <BarChartSection companies={companies} colors={CHART_COLORS} />
      </div>
    </div>
  );
};
