"use client";

import { Company } from '@/app/_shared/types/company.type';
import { useMemo } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartLegend } from './ChartLegend';

type Props = {
  companies: Company[];
  allCompanies: Company[];
  colors: string[];
};

export const RadarChartSection = ({ companies, allCompanies, colors }: Props) => {
  // Calculate Mean and Standard Deviation for normalization (Score 3 = Mean)
  const stats = useMemo(() => {
    const calcStats = (key: keyof Company['metrics']) => {
       const values = allCompanies
         .map(c => c.metrics[key])
         .filter((v): v is number => typeof v === 'number');
       
       if (values.length === 0) return { mean: 0, std: 1 };
       
       const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
       const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
       const std = Math.sqrt(variance);
       
       return { mean, std: std === 0 ? 1 : std };
    };

    return {
      salary: calcStats('salary'),
      overtime: calcStats('overtime'),
      equity_ratio: calcStats('equity_ratio'),
      profit_margin: calcStats('profit_margin'),
      employees: calcStats('employees'),
    };
  }, [allCompanies]);

  
  const formattedData = [
    { metric: '給与', key: 'salary' },
    { metric: '労働環境', key: 'overtime' },
    { metric: '安定性', key: 'equity_ratio' },
    { metric: '収益性', key: 'profit_margin' },
    { metric: '規模', key: 'employees' },
  ];

  type RadarDataPoint = {
    subject: string;
    [key: string]: number | string;
  };

  const chartData = formattedData.map(item => {
    const dataPoint: RadarDataPoint = { subject: item.metric };
    const stat = stats[item.key as keyof typeof stats];

    companies.forEach(c => {
      const val = c.metrics[item.key as keyof typeof c.metrics];
      let score = 3; // Default score (Mean)

      if (typeof val === 'number' && stat) {
        // Calculate Z-score: (x - mean) / std
        const zScore = (val - stat.mean) / stat.std;
        
        // Convert to 1-5 scale (Mean=3, 1 StdDev = 1 point)
        // Overtime is inverted (Lower is better)
        if (item.key === 'overtime') {
           score = 3 - zScore;
        } else {
           score = 3 + zScore;
        }
      } else if (val === null) {
        score = 0; // Missing data -> 0 (Center)
      }

      // Clip score between 1 and 5 (but keep 0 for missing data)
      if (score === 0) {
          dataPoint[c.id] = 0;
      } else {
          dataPoint[c.id] = Math.max(1, Math.min(5, Number(score.toFixed(2))));
      }
    });

    return dataPoint;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center">
       <div className="bg-gray-50/80 backdrop-blur-sm px-3 py-3 border-b border-gray-100 w-full">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
              <span className="w-1 h-3 bg-primary rounded-full"/>
              総合バランス (5軸)
            </h3>
       </div>
       
       <ChartLegend companies={companies} colors={colors} />

      <div className="h-[340px] w-full max-w-md relative px-3">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#e5e7eb" strokeDasharray="4 4" />
            <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }} 
            />
            <PolarRadiusAxis 
                angle={90} 
                domain={[0, 5]} 
                tick={{ fill: '#9ca3af', fontSize: 10, offset: 0 }} 
                tickCount={6} 
                axisLine={false}
                stroke="#e5e7eb"
            />
            
            {companies.map((company, index) => (
              <Radar
                key={company.id}
                name={company.name}
                dataKey={company.id}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.15}
                isAnimationActive={true}
              />
            ))}
            <Tooltip 
               contentStyle={{ 
                 borderRadius: '12px', 
                 border: 'none', 
                 boxShadow: '0 4px 12px -2px rgba(0,0,0,0.08)',
                 backgroundColor: 'rgba(255, 255, 255, 0.95)',
                 fontSize: '12px'
               }}
               itemStyle={{ fontSize: '12px', padding: 0 }}
               formatter={(value: number) => value === 0 ? ['データなし', 'スコア'] : [value, 'スコア']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-muted-foreground pb-3 px-3 text-center">
        ※全掲載企業の平均を「3」とした相対評価。データなしは中心(0)となります。
      </p>
    </div>
  );
};
