"use client";

import { Company } from '@/app/_shared/types/company.type';
import { useState } from 'react';
import { CartesianGrid, LabelList, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';

type Props = {
  companies: Company[];
  colors: string[];
};

const METRIC_OPTIONS = [
  { value: 'salary', label: '平均年収', unit: '万円', domain: [0, 1500] },
  { value: 'overtime', label: '残業時間', unit: 'h', domain: [0, 80] },
  { value: 'paid_leave', label: '有休取得率', unit: '%', domain: [0, 100] },
  { value: 'duration', label: '平均勤続', unit: '年', domain: [0, 30] },
  { value: 'age', label: '平均年齢', unit: '歳', domain: [20, 60] },
  { value: 'revenue', label: '売上高', unit: '億円', domain: [0, 10000] },
  { value: 'profit_margin', label: '営業利益率', unit: '%', domain: [-10, 50] },
  { value: 'employees', label: '従業員数', unit: '人', domain: [0, 10000] },
];

export const ScatterPlotSection = ({ companies, colors }: Props) => {
  const [xAxis, setXAxis] = useState('salary');
  const [yAxis, setYAxis] = useState('overtime');

  const xOption = METRIC_OPTIONS.find(o => o.value === xAxis) || METRIC_OPTIONS[0];
  const yOption = METRIC_OPTIONS.find(o => o.value === yAxis) || METRIC_OPTIONS[1];

  // Map first to preserve color index, then filter out invalid data
  const data = companies
    .map((c, i) => {
        const xVal = c.metrics[xAxis as keyof typeof c.metrics];
        const yVal = c.metrics[yAxis as keyof typeof c.metrics];
        
        // Keep 0, exclude null/undefined
        if (xVal === null || xVal === undefined || yVal === null || yVal === undefined) {
             return null;
        }

        return {
            x: xVal,
            y: yVal,
            z: 100,
            name: c.name,
            color: colors[i % colors.length]
        };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Calculate dynamic domains: Use default range, but expand if data exceeds it
  const xMaxRaw = Math.max(...data.map(d => d.x));
  const yMaxRaw = Math.max(...data.map(d => d.y));
  
  // X Axis Domain
  const xDefaultMax = xOption.domain[1] as number;
  const xDefaultMin = xOption.domain[0] as number;
  const xMax = Math.max(xDefaultMax, xMaxRaw);
  // Add 10% padding if extending
  const xFinalMax = xMax > xDefaultMax ? xMax * 1.1 : xMax;

  // Y Axis Domain
  const yDefaultMax = yOption.domain[1] as number;
  const yDefaultMin = yOption.domain[0] as number;
  const yMax = Math.max(yDefaultMax, yMaxRaw);
  // Add 10% padding if extending
  const yFinalMax = yMax > yDefaultMax ? yMax * 1.1 : yMax;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50/80 backdrop-blur-sm px-3 py-3 border-b border-gray-100">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                <span className="w-1 h-3 bg-primary rounded-full"/>
                相関図・ポジショニング
            </h3>
            
            {/* Controls */}
            <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1 flex-1">
                    <span className="text-muted-foreground whitespace-nowrap">X:</span>
                    <select 
                        value={xAxis} 
                        onChange={(e) => setXAxis(e.target.value)}
                        className="w-full bg-transparent outline-none font-medium text-gray-700"
                    >
                        {METRIC_OPTIONS.map(opt => (
                            <option key={`x-${opt.value}`} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <span className="text-muted-foreground">vs</span>
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1 flex-1">
                    <span className="text-muted-foreground whitespace-nowrap">Y:</span>
                     <select 
                        value={yAxis} 
                        onChange={(e) => setYAxis(e.target.value)}
                        className="w-full bg-transparent outline-none font-medium text-gray-700"
                    >
                        {METRIC_OPTIONS.map(opt => (
                            <option key={`y-${opt.value}`} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <p className="text-[10px] text-muted-foreground">
               ※データが存在しない企業は表示されません
            </p>
          </div>
      </div>
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center px-3 mb-2 mt-3">
        {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600 font-medium truncate max-w-[120px]">
                {item.name}
              </span>
            </div>
        ))}
      </div>

      <div className="h-[300px] w-full px-3 pb-3">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
                type="number" 
                dataKey="x" 
                name={xOption.label} 
                unit=""
                domain={[xDefaultMin, xFinalMax]}
                tick={{ fontSize: 10, fill: '#6b7280' }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                label={{ value: `${xOption.label} (${xOption.unit}) →`, position: 'insideBottomRight', offset: -5, fontSize: 10, fill: '#9ca3af' }}
            />
            <YAxis 
                type="number" 
                dataKey="y" 
                name={yOption.label} 
                unit="" 
                domain={[yDefaultMin, yFinalMax]}
                tick={{ fontSize: 10, fill: '#6b7280' }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                width={30}
                label={{ value: `${yOption.label} (${yOption.unit}) ↑`, angle: -90, position: 'insideLeft', fontSize: 10, fill: '#9ca3af', dy: 40 }}
            />
            <ZAxis type="number" dataKey="z" range={[40, 40]} />
            <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                content={({ active, payload }: { active?: boolean; payload?: any }) => {
                    if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                        <div className="bg-white/95 backdrop-blur border border-gray-100 shadow-xl rounded-lg text-xs p-3 z-50">
                            <p className="font-bold mb-1 text-primary">{data.name}</p>
                            <div className="space-y-0.5 text-gray-600">
                                <p>{xOption.label}: <span className="font-medium text-gray-900">{data.x.toLocaleString()}</span> {xOption.unit}</p>
                                <p>{yOption.label}: <span className="font-medium text-gray-900">{data.y.toLocaleString()}</span> {yOption.unit}</p>
                            </div>
                        </div>
                    );
                    }
                    return null;
                }}
            />
            {data.map((entry) => (
                <Scatter 
                    key={entry.name} 
                    name={entry.name} 
                    data={[entry]} 
                    fill={entry.color} 
                    shape="circle" 
                    fillOpacity={0.2} 
                    stroke={entry.color} 
                    strokeWidth={1}
                >
                   <LabelList dataKey="name" position="top" offset={5} style={{ fontSize: '10px', fill: entry.color, fontWeight: 'bold' }} />
                </Scatter>
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
