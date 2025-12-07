import { Card, CardContent } from "@/app/_shared/components/ui/card";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ companyId: string }>;
};

export default async function CompanyDetailPage({ params }: Props) {
  const { companyId } = await params;

  if (!companyId) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-border/60">
           <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 space-y-6">
               <div className="space-y-2">
                   <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">企業詳細ページ</h1>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Coming Soon
                   </div>
               </div>
               
               <div className="space-y-4 max-w-md mx-auto">
                   <p className="text-muted-foreground leading-relaxed">
                       申し訳ありませんが、詳細ページは現在開発中です。<br/>
                       より詳細な分析データをご覧いただけるよう準備を進めています。
                   </p>
                   
                   <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                       <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Company ID</p>
                       <p className="font-mono text-sm md:text-base font-medium">{companyId}</p>
                   </div>
               </div>
           </CardContent>
        </Card>
      </div>
    </main>
  );
}
