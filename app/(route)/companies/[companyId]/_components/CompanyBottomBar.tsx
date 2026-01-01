"use client";

import { loadCart, saveCart } from "@/app/_client-only/_service/storage/storage.service";
import { Button } from "@/app/_shared/components/ui/button";
import { Company } from "@/app/_shared/types/company.type";
import { ArrowRightLeft, Check, Plus, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
// Note: If sonner is not installed, I'll use simple window.alert or console for now.
// Since I don't see sonner installed, I'll stick to simple alerts or just state changes.

type Props = {
  company: Company;
};

export const CompanyBottomBar = ({ company }: Props) => {
  const [isInCart, setIsInCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${company.name}の企業分析`,
                text: `平均年収${company.metrics.salary}万円`,
                url: window.location.href,
            }).catch(() => {});
        } else {
            alert("URLをコピーしました");
        }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/40 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden safe-area-bottom">
      <div className="flex items-center gap-3">
        {/* Compare Link (Mobile) */}
        <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground"
            onClick={() => window.location.href = '/compare'}
        >
            <ArrowRightLeft className="w-5 h-5" />
        </Button>

        <Button 
            onClick={handleShare}
            variant="outline"
            size="icon"
            className="shrink-0"
        >
            <Share2 className="w-4 h-4" />
        </Button>
        
        <Button 
            onClick={toggleCart}
            variant={isInCart ? "outline" : "default"}
            className={`flex-1 gap-2 font-bold shadow-lg transition-all ${
                isInCart 
                ? "border-primary/20 text-primary hover:bg-primary/5" 
                : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
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
  );
};
