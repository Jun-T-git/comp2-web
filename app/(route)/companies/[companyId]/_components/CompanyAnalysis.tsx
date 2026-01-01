import { Company } from "@/app/_shared/types/company.type";
import { AlertTriangle } from "lucide-react";

type Props = {
  company: Company;
};

export const CompanyAnalysis = ({ company }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6">
        {/* Summary removed: Displayed in Hero */}

        {/* Risk Section */}
        <div className="space-y-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                懸念点・リスク分析
            </h3>
            <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 text-sm leading-relaxed text-gray-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-200"></div>
                <p>{company.content.risk_text}</p>
            </div>
        </div>
    </div>
  );
};
