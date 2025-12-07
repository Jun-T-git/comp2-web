import { Card, CardContent } from "@/app/_shared/components/ui/card";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ companyIds?: string }>;
};

function CompareContent({ companyIds }: { companyIds?: string }) {
  const ids = companyIds?.split(",") || [];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
         <div className="mb-6 md:mb-8 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">企業比較</h1>
             <p className="text-muted-foreground mt-2">選択した企業の詳細なデータを比較します</p>
         </div>
         
         <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-border/60">
             <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Coming Soon
                </div>

                <div className="space-y-4 max-w-2xl mx-auto">
                    <p className="text-lg font-medium text-foreground">比較機能は現在開発中です</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        複数の企業の年収、残業時間、有休取得率などを一目で比較できる機能を準備しています。<br className="hidden md:block"/>
                        アップデートをお待ちください。
                    </p>
                </div>

                {ids.length > 0 ? (
                    <div className="w-full max-w-md pt-4">
                         <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">Comparing {ids.length} Companies</p>
                         <div className="flex flex-wrap justify-center gap-2">
                            {ids.map(id => (
                                <span key={id} className="font-mono text-xs md:text-sm bg-muted px-3 py-1.5 rounded-full text-muted-foreground border border-border/50">
                                    {id}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">比較する企業が選択されていません。</p>
                )}
             </CardContent>
         </Card>
      </div>
    </main>
  );
}

export default async function ComparePage({ searchParams }: Props) {
  const { companyIds } = await searchParams;

  return (
    <Suspense fallback={
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground text-sm">読み込み中...</div>
        </main>
    }>
      <CompareContent companyIds={companyIds} />
    </Suspense>
  );
}
