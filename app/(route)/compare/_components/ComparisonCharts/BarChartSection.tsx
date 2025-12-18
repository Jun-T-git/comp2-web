"use client";

import { Company } from '@/app/_shared/types/company.type';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartLegend } from './ChartLegend';

type Props = {
  companies: Company[];
  colors: string[];
};

const METRIC_OPTIONS = [
  { value: 'salary', label: '平均年収', unit: '万円', domain: [0, 1500] },
  { value: 'overtime', label: '残業時間', unit: 'h', domain: [0, 80] },
  { value: 'paid_leave', label: '有休取得率', unit: '%', domain: [0, 100] },
  { value: 'duration', label: '平均勤続', unit: '年', domain: [0, 30] },
  { value: 'age', label: '平均年齢', unit: '歳', domain: [0, 70] },
  { value: 'revenue', label: '売上高', unit: '億円', domain: [0, 5000] },
];

export const BarChartSection = ({ companies, colors }: Props) => {
  const [metric, setMetric] = useState('salary');
  
  const option = METRIC_OPTIONS.find(o => o.value === metric) || METRIC_OPTIONS[0];

  const data = companies.map(c => ({
    name: c.name.length > 5 ? c.name.slice(0, 5) + '..' : c.name,
    full_name: c.name,
    // Pass null if data is missing, so we can handle it in display (Recharts won't render bar)
    value: c.metrics[metric as keyof typeof c.metrics] ?? null, 
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50/80 backdrop-blur-sm px-3 py-3 border-b border-gray-100">
          <div className="flex flex-col gap-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                  <span className="w-1 h-3 bg-primary rounded-full"/>
                  項目別比較
              </h3>
              
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2 py-1 max-w-[200px]">
                  <select 
                      value={metric} 
                      onChange={(e) => setMetric(e.target.value)}
                      className="w-full bg-transparent outline-none font-medium text-gray-700 text-xs py-1"
                  >
                      {METRIC_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                  </select>
              </div>
          </div>
        </div>

        <ChartLegend companies={companies} colors={colors} />

        <div className="px-3 pb-3 h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 50, left: 0, bottom: 0 }} barCategoryGap={20}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
              <XAxis type="number" hide domain={option.domain} />
              <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={70} 
                  tick={{ fontSize: 11, fill: '#4b5563' }} 
                  axisLine={false}
                  tickLine={false}
              />
              <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.1)', fontSize: '12px' }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [
                      value !== null && value !== undefined 
                        ? `${value.toLocaleString()} ${option.unit}` 
                        : 'データなし', 
                      option.label
                  ]}
                  labelFormatter={(name) => {
                      const c = companies.find(comp => comp.name.startsWith(name.replace('..','')));
                      return c ? c.name : name;
                  }}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]} 
                barSize={24}
                animationDuration={500}
                isAnimationActive={true}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
                <LabelList 
                  dataKey="value" 
                  position="right" 
                  fontSize={10} 
                  fontWeight={500}
                  fill="#6b7280"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => value !== null ? `${value.toLocaleString()}` : ''}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
};
