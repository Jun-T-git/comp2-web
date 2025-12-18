import { Company, CompanyMetrics } from '@/app/_shared/types/company.type';
import { Minus } from 'lucide-react';

type Props = {
  companies: Company[];
};

type MetricConfig = {
  key: keyof CompanyMetrics;
  label: string;
  unit: string;
  isGoodHigh: boolean; // true: copy is good, false: low is good
  isNeutral?: boolean; // true: no coloring
  format?: (val: number) => string;
};

const METRICS: { category: string; items: MetricConfig[] }[] = [
  {
    category: '労働条件・環境',
    items: [
      { key: 'salary', label: '平均年収', unit: '万円', isGoodHigh: true },
      { key: 'overtime', label: '月間残業', unit: '時間', isGoodHigh: false },
      { key: 'paid_leave', label: '有休取得率', unit: '%', isGoodHigh: true },
      { key: 'duration', label: '平均勤続', unit: '年', isGoodHigh: true },
      { key: 'age', label: '平均年齢', unit: '歳', isGoodHigh: true, isNeutral: true },
    ],
  },
  {
    category: '企業の安定性・規模',
    items: [
      { key: 'revenue', label: '売上高', unit: '億円', isGoodHigh: true, format: (v) => v.toLocaleString() },
      { key: 'profit_margin', label: '営業利益率', unit: '%', isGoodHigh: true },
      { key: 'equity_ratio', label: '自己資本比率', unit: '%', isGoodHigh: true },
      { key: 'employees', label: '従業員数', unit: '人', isGoodHigh: true, isNeutral: true, format: (v) => v.toLocaleString() },
    ],
  },
];

export const ComparisonTable = ({ companies }: Props) => {
  // Helper to determine cell color
  const getCellColor = (value: number | null, key: keyof CompanyMetrics, config: MetricConfig) => {
    if (value === null || config.isNeutral) return '';
    
    // Get all valid values for this metric
    const values = companies
      .map(c => c.metrics[key])
      .filter((v): v is number => v !== null);
      
    if (values.length < 2) return ''; // Need at least 2 to compare

    const max = Math.max(...values);
    const min = Math.min(...values);
    
    if (max === min) return '';

    const isBest = config.isGoodHigh ? value === max : value === min;

    if (isBest) return 'bg-[#C0F03C]/50 text-primary font-bold ring-inset ring-1 ring-primary/20';
    
    return '';
  };

  return (
    <div className="space-y-6">
      {METRICS.map((section) => (
        <section key={section.category} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/80 backdrop-blur-sm px-3 py-2 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
              <span className="w-1 h-3 bg-primary rounded-full"/>
              {section.category}
            </h3>
          </div>
          
          <div className="w-full">
            <table className="w-full text-xs md:text-sm text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-1.5 md:p-3 w-[20%] md:w-[140px] font-medium text-gray-500 text-center bg-gray-50/10">
                    {/* Empty corner */}
                  </th>
                  {companies.map((company) => (
                    <th key={company.id} className="p-1.5 md:p-3 font-medium text-gray-500 text-center align-top">
                      <div className="flex flex-col items-center gap-1">
                         {/* Icon simplified/smaller for tight space */}
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold shrank-0">
                           {company.name.slice(0,1)}
                        </div>
                        <span className="line-clamp-2 text-[10px] md:text-xs leading-tight w-full break-words">
                          {company.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <tr key={item.key} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-1.5 md:p-3 font-semibold text-gray-700 text-[10px] md:text-sm bg-gray-50 text-center break-words align-middle border-r border-gray-100">
                      {item.label}
                    </td>
                    {companies.map((company) => {
                      const value = company.metrics[item.key];
                      const colorClass = getCellColor(value, item.key, item);
                      const formattedValue = value !== null 
                        ? (item.format ? item.format(value) : value)
                        : <Minus size={12} className="text-gray-300 mx-auto" />;

                      return (
                        <td key={`${company.id}-${item.key}`} className={`p-1.5 md:p-3 text-center align-middle ${colorClass}`}>
                           {value !== null ? (
                              <div className="flex flex-col items-center justify-center">
                                 <span className="tabular-nums tracking-tight font-bold text-xs md:text-base">
                                     {formattedValue}
                                 </span>
                                 <span className="text-[9px] md:text-[10px] text-muted-foreground scale-90 origin-center">
                                     {item.unit}
                                 </span>
                              </div>
                           ) : formattedValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
};
