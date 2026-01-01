"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const CompanyHeader = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center">
        <button 
          onClick={() => router.push('/')}
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-primary/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>検索に戻る</span>
        </button>
      </div>
    </div>
  );
};
