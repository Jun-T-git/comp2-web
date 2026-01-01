"use client";

import { CompanyCard } from "@/app/(route)/_components/CompanyCard/CompanyCard";
import { loadCart, saveCart } from "@/app/_client-only/_service/storage/storage.service";
import { Company } from "@/app/_shared/types/company.type";
import { useEffect, useState } from "react";

type Props = {
  currentCompanyId: string;
  companies: Company[];
};

export const RelatedCompanies = ({ currentCompanyId, companies }: Props) => {
  const [cartIds, setCartIds] = useState<string[]>([]);

  useEffect(() => {
    setCartIds(loadCart());
  }, []);

  const handleAddToCart = (company: Company) => {
    const currentCart = loadCart();
    
    if (currentCart.includes(company.id)) {
      // Remove
      const newCart = currentCart.filter(id => id !== company.id);
      saveCart(newCart);
      setCartIds(newCart);
    } else {
      // Add
      if (currentCart.length >= 4) {
        alert("比較カートがいっぱいです(最大4社)");
        return;
      }
      const newCart = [...currentCart, company.id];
      saveCart(newCart);
      setCartIds(newCart);
    }
  };

  if (companies.length === 0) return null;

  return (
    <div className="space-y-6 pt-8 border-t border-border/60">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-accent rounded-full"></span>
        この企業の同業他社もチェック
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onAddToCart={handleAddToCart}
            isInCart={cartIds.includes(company.id)}
            isCartFull={cartIds.length >= 4}
            showAddButton={true}
          />
        ))}
      </div>
    </div>
  );
};
