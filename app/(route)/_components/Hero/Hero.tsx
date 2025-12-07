import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary/5 via-white to-white relative overflow-hidden">
      {/* Subtle decorative blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border/60 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Free</span>
            <span className="w-px h-3 bg-border" />
            <span className="text-sm text-muted-foreground font-medium">就活生のための企業比較アプリ</span>
          </div>

          {/* Logo */}
          <div className="relative">
             <Image
               src="/images/logo_header.png"
               alt="キギョヒカ"
               width={300}
               height={80}
               className="h-20 md:h-24 w-auto object-contain drop-shadow-sm"
               priority
             />
          </div>

          {/* Optional sub-message or visual cue */}
          <p className="text-muted-foreground/80 text-sm max-w-md mx-auto leading-relaxed">
            気になる企業の<span className="font-semibold text-primary/80">「年収」「残業」「有休」</span>などの<br className="md:hidden" />データを一目で比較。
          </p>

        </div>
      </div>
    </section>
  );
}
