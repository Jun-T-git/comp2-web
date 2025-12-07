import type { Company } from '@/app/_shared/types/company.type';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RandomSuggestion } from './RandomSuggestion';

// Mock hidden gem companies (high hourly wage or high profit margin)
const hiddenGemCompanies: Company[] = [
  {
    id: '4063',
    name: '信越化学工業',
    kana: 'シンエツカガクコウギョウ',
    industry: '化学',
    metrics: {
      salary: 903,
      age: 42.1,
      duration: 20.3,
      employees: 3382,
      revenue: 2318,
      profit_margin: 28.5, // High profit margin
      equity_ratio: 78.9,
      overtime: 18,
      paid_leave: 75,
      hourly_wage: 5200,
    },
    content: {
      summary: '塩ビ・半導体材料で世界トップクラス。高利益率企業。',
      risk_text: '特になし',
      tags: ['化学', '素材', '高収益'],
    },
    flags: {
      is_holding: false,
    },
  },
  {
    id: '6758',
    name: 'ソニーグループ',
    kana: 'ソニーグループ',
    industry: '電気機器',
    metrics: {
      salary: 1084,
      age: 42.6,
      duration: 16.7,
      employees: 2479,
      revenue: 11539,
      profit_margin: 12.4,
      equity_ratio: 42.1,
      overtime: 20,
      paid_leave: 68,
      hourly_wage: 5800, // High hourly wage
    },
    content: {
      summary: 'エレクトロニクスとエンタメの複合企業。',
      risk_text: '特になし',
      tags: ['電機', 'エンタメ', 'グローバル'],
    },
    flags: {
      is_holding: false,
    },
  },
  {
    id: '9984',
    name: 'ソフトバンクグループ',
    kana: 'ソフトバンクグループ',
    industry: '情報・通信業',
    metrics: {
      salary: 1405,
      age: 41.5,
      duration: 8.9,
      employees: 255,
      revenue: 6651,
      profit_margin: 15.2,
      equity_ratio: 28.3,
      overtime: null,
      paid_leave: null,
      hourly_wage: 8500, // Very high hourly wage
    },
    content: {
      summary: '投資会社。従業員数が少なく持株会社の可能性。',
      risk_text: '持株会社のため実態と乖離の可能性',
      tags: ['投資', '通信', 'ベンチャー'],
    },
    flags: {
      is_holding: true,
    },
  },
];

const meta = {
  title: 'Components/RandomSuggestion',
  component: RandomSuggestion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onAddToCart: () => {},
  },
} satisfies Meta<typeof RandomSuggestion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    companies: hiddenGemCompanies,
    selectedIds: [],
  },
};

export const WithSelectedCompany: Story = {
  args: {
    companies: hiddenGemCompanies,
    selectedIds: ['6758'],
  },
};

export const NoHiddenGems: Story = {
  args: {
    companies: [
      {
        id: '7203',
        name: 'トヨタ自動車',
        kana: 'トヨタジドウシャ',
        industry: '輸送用機器',
        metrics: {
          salary: 857,
          age: 40.4,
          duration: 16.2,
          employees: 70710,
          revenue: 37154,
          profit_margin: 9.8, // Low profit margin
          equity_ratio: 45.2,
          overtime: 25,
          paid_leave: 72,
          hourly_wage: 3500, // Low hourly wage
        },
        content: {
          summary: '世界最大級の自動車メーカー。',
          risk_text: '特になし',
          tags: ['自動車', 'グローバル'],
        },
        flags: {
          is_holding: false,
        },
      },
    ],
    selectedIds: [],
  },
};
