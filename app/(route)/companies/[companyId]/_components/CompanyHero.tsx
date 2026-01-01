"use client";

import { loadCart, saveCart } from "@/app/_client-only/_service/storage/storage.service";
import { Badge } from "@/app/_shared/components/ui/badge";
import { Button } from "@/app/_shared/components/ui/button";
import { Company } from "@/app/_shared/types/company.type";
import { ArrowRightLeft, Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  company: Company;
};

export const CompanyHero = ({ company }: Props) => {
  // Logic moved to CompanyBottomBar for mobile, but kept here for Desktop view if needed.
  // Ideally, we show this button on Desktop and hide on Mobile.
  
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = loadCart();
    setIsInCart(cart.includes(company.id));
  }, [company.id]);

  const toggleCart = () => {
    const cart = loadCart();
    if (isInCart) {
      const newCart = cart.filter((id) => id !== company.id);
      saveCart(newCart);
      setIsInCart(false);
    } else {
        if(cart.length >= 4) {
            alert("比較カートがいっぱいです(最大4社)");
            return;
        }
      const newCart = [...cart, company.id];
      saveCart(newCart);
      setIsInCart(true);
    }
  };

  return (
    <div className="bg-white border-b border-border/40 pb-6 pt-4 md:py-8 relative">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        
        {/* Top Row: Industry & Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs font-medium px-2.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200">
                {company.industry}
            </Badge>
            {company.flags.is_holding && (
                <Badge variant="outline" className="text-xs border-orange-200 text-orange-600 bg-orange-50">
                    持株会社
                </Badge>
            )}
            {company.content.tags.map(tag => (
                <span key={tag} className="text-[10px] text-muted-foreground px-2 py-0.5 bg-gray-50 rounded border border-gray-100">
                    #{tag}
                </span>
            ))}
        </div>

        <div className="flex flex-col gap-4">
            {/* Identity & Summary */}
            <div className="space-y-4">
                <div>
                     <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        {company.name}
                     </h1>
                     <p className="text-xs text-muted-foreground font-mono mt-1">code: {company.id}</p>
                </div>
                
                {/* AI Summary in Hero - Immediate Context */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm md:text-base text-slate-700 leading-relaxed font-medium">
                    {company.content.summary}
                </div>
            </div>
        </div>

        {/* Desktop Action Button Positioned nicely */}
        <div className="hidden md:flex justify-end mt-4 gap-3">
             {/* Link to Compare Page - only if cart has items */}
             <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary gap-2">
                 <a href="/compare">
                     <ArrowRightLeft className="w-4 h-4" />
                     比較ページへ
                 </a>
             </Button>

             <Button 
                onClick={toggleCart}
                variant={isInCart ? "outline" : "default"}
                size="sm"
                className={`gap-2 transition-all ${
                    isInCart 
                    ? "border-primary/20 text-primary" 
                    : "bg-primary text-white shadow-md hover:bg-primary/90"
                }`}
             >
                {isInCart ? (
                    <>
                        <Check className="w-4 h-4" />
                        リストに追加済み
                    </>
                ) : (
                    <>
                        <Plus className="w-4 h-4" />
                        比較リストに追加
                    </>
                )}
             </Button>
        </div>

      </div>
    </div>
  );
};
