import { Company } from '@/app/_shared/types/company.type';

type Props = {
  companies: Company[];
  colors: string[];
};

export const ChartLegend = ({ companies, colors }: Props) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center px-3 mb-2 mt-3">
      {companies.map((c, i) => (
        <div key={c.id} className="flex items-center gap-1.5">
          <span 
            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" 
            style={{ backgroundColor: colors[i % colors.length] }}
          />
          <span className="text-xs text-gray-600 font-medium truncate max-w-[120px]">
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
};
