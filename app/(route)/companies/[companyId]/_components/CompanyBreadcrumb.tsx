import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

type Props = {
  companyName: string;
  industry: string;
};

export const CompanyBreadcrumb = ({ companyName, industry }: Props) => {
  return (
    <nav className="flex items-center text-sm text-muted-foreground py-4 overflow-x-auto whitespace-nowrap">
      <Link 
        href="/" 
        className="flex items-center hover:text-primary transition-colors pr-2"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0 text-gray-300" />
      
      <span className="px-2 truncate">
        {industry}
        {/* 将来的に一覧ページができたらLinkにする: <Link href={`/industries/${industry}`} ... /> */}
      </span>
      
      <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0 text-gray-300" />
      
      <span className="font-medium text-gray-900 px-2 truncate max-w-[200px] md:max-w-none">
        {companyName}
      </span>
    </nav>
  );
};
