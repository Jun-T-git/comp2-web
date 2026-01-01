"use client";

import { Card, CardContent } from "@/app/_shared/components/ui/card";
import { Company } from "@/app/_shared/types/company.type";
import { Banknote, Building2, Calendar, Clock, Hourglass, User, Users } from "lucide-react";

type Props = {
  company: Company;
};

export const CompanyStats = ({ company }: Props) => {
  const metrics = [
    {
        label: "平均年収",
        value: `${company.metrics.salary}万円`,
        icon: Banknote,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        label: "平均残業",
        value: company.metrics.overtime ? `${company.metrics.overtime}時間/月` : "N/A",
        icon: Clock,
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        label: "有休取得",
        value: company.metrics.paid_leave ? `${company.metrics.paid_leave}%` : "N/A",
        icon: Calendar,
        color: "text-rose-600",
        bg: "bg-rose-50"
    },
    {
        label: "平均年齢",
        value: `${company.metrics.age}歳`,
        icon: User,
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        label: "平均勤続",
        value: `${company.metrics.duration}年`,
        icon: Hourglass,
        color: "text-teal-600",
        bg: "bg-teal-50"
    },
    {
        label: "従業員数",
        value: `${company.metrics.employees.toLocaleString()}人`,
        icon: Users,
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        label: "売上高",
        value: `${company.metrics.revenue.toLocaleString()}億円`,
        icon: Building2,
        color: "text-slate-600",
        bg: "bg-slate-50"
    }
  ];

  return (
    // Mobile: Horizontal Scroll, Desktop: Grid
    <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x md:grid md:grid-cols-4 md:gap-4 md:pb-0 md:mx-0 md:px-0 no-scrollbar">
        {metrics.map((m, i) => (
            <Card key={i} className="min-w-[160px] md:min-w-0 snap-center border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-col items-start gap-3 h-full justify-between">
                    <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                        <m.icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-0.5">{m.label}</p>
                        <p className="text-xl md:text-xl font-bold tracking-tight font-mono text-gray-900">{m.value}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
  );
};
