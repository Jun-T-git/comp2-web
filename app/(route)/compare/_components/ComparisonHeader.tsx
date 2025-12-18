import { Company } from '@/app/_shared/types/company.type';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  companies: Company[];
};

export const ComparisonHeader = ({ companies }: Props) => {
  const router = useRouter();

  if (companies.length === 0) return null;

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="container mx-auto px-3 h-14 flex items-center justify-between gap-4">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          aria-label="検索に戻る"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Company List (Scrollable) */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar mask-linear-fade-right">
          <span className="text-xs font-bold text-muted-foreground shrink-0 hidden md:block">比較中:</span>
          {companies.map((company) => (
            <Link 
              key={company.id} 
              href={`/companies/${company.id}`}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm max-w-[160px] md:max-w-[200px] hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                {company.name.slice(0, 1)}
              </div>
              <span className="text-xs font-medium text-gray-700 truncate group-hover:text-primary transition-colors">
                {company.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
