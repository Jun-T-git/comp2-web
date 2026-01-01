import { Card, CardContent, CardHeader, CardTitle } from "@/app/_shared/components/ui/card";
import { Company } from "@/app/_shared/types/company.type";

type Props = {
  company: Company;
};

export const CompanyDetailsTable = ({ company }: Props) => {
    const details = [
        {
            title: "企業規模・業績",
            items: [
                { label: "売上高", value: `${company.metrics.revenue.toLocaleString()} 億円` },
                { label: "従業員数", value: `${company.metrics.employees.toLocaleString()} 人` },
            ]
        },
        {
            title: "従業員データ",
            items: [
                { label: "平均年収", value: `${company.metrics.salary} 万円` },
                { label: "平均年齢", value: `${company.metrics.age} 歳` },
                { label: "平均勤続年数", value: `${company.metrics.duration} 年` },
            ]
        },
        {
            title: "働き方・環境",
            items: [
                { label: "月間残業時間", value: company.metrics.overtime ? `${company.metrics.overtime} 時間` : "データなし" },
                { label: "有休消化率", value: company.metrics.paid_leave ? `${company.metrics.paid_leave} %` : "データなし" },
            ]
        }
    ];

    return (
        <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-3 border-b border-gray-50 bg-gray-50/50">
                <CardTitle className="text-lg font-bold text-gray-800">詳細データ</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {details.map((section, idx) => (
                    <div key={idx} className="border-b border-gray-100 last:border-0">
                        <div className="bg-gray-50/30 px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {section.title}
                        </div>
                        <div className="divide-y divide-gray-50">
                            {section.items.map((item, i) => (
                                <div key={i} className="px-6 py-3 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                                    <span className="text-sm font-medium text-gray-600">{item.label}</span>
                                    <span className={`text-sm font-mono text-gray-900 font-bold`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
