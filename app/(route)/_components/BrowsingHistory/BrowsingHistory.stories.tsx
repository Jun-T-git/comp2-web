import type { Company } from '@/app/_shared/types/company.type';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BrowsingHistory } from './BrowsingHistory';

// Mock company data
const mockCompanies: Company[] = [
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
      profit_margin: 9.8,
      equity_ratio: 45.2,
      overtime: 25,
      paid_leave: 72,
      hourly_wage: 4200,
    },
    content: {
      summary: '世界最大級の自動車メーカー。',
      risk_text: '特になし',
      tags: ['自動車', 'グローバル', '大手'],
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
      hourly_wage: 8500,
    },
    content: {
      summary: '投資会社。',
      risk_text: '持株会社のため実態と乖離の可能性',
      tags: ['投資', '通信'],
    },
    flags: {
      is_holding: true,
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
      hourly_wage: 5800,
    },
    content: {
      summary: 'エレクトロニクスとエンタメの複合企業。',
      risk_text: '特になし',
      tags: ['電機', 'エンタメ'],
    },
    flags: {
      is_holding: false,
    },
  },
];

const meta = {
  title: 'Components/BrowsingHistory',
  component: BrowsingHistory,
  parameters: {
    layout: 'centered',
    // Mock localStorage for Storybook
    beforeEach: () => {
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
    },
  },
  tags: ['autodocs'],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any, context: any) => {
      // Set up localStorage based on story
      if (typeof window !== 'undefined' && context.args.mockHistory) {
        window.localStorage.setItem(
          'comparison-history',
          JSON.stringify(context.args.mockHistory)
        );
      }
      return (
        <div style={{ width: '500px' }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    onRestore: () => {},
  },
} satisfies Meta<typeof BrowsingHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    companies: mockCompanies,
  },
};

export const WithHistory: Story = {
  args: {
    companies: mockCompanies,
  },
};
