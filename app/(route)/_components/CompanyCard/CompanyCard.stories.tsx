import type { Company } from '@/app/_shared/types/company.type';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CompanyCard } from './CompanyCard';

// Mock company data
const mockCompany: Company = {
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
    summary: '世界最大級の自動車メーカー。ハイブリッド技術に強み。',
    risk_text: '特になし',
    tags: ['自動車', 'グローバル', '大手', '製造業'],
  },
  flags: {
    is_holding: false,
  },
};

const holdingCompany: Company = {
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
    summary: '投資会社。従業員数が少なく持株会社の可能性。',
    risk_text: '持株会社のため実態と乖離の可能性',
    tags: ['投資', '通信', 'ベンチャー'],
  },
  flags: {
    is_holding: true,
  },
};

const meta = {
  title: 'Components/CompanyCard',
  component: CompanyCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CompanyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    company: mockCompany,
    onAddToCart: () => {},
    isInCart: false,
    showAddButton: true,
  },
};

export const HoldingCompany: Story = {
  args: {
    company: holdingCompany,
    onAddToCart: () => {},
    isInCart: false,
    showAddButton: true,
  },
};

export const InCart: Story = {
  args: {
    company: mockCompany,
    onAddToCart: () => {},
    isInCart: true,
    showAddButton: true,
  },
};

export const WithoutAddButton: Story = {
  args: {
    company: mockCompany,
    showAddButton: false,
  },
};

export const NoOvertimeData: Story = {
  args: {
    company: {
      ...mockCompany,
      metrics: {
        ...mockCompany.metrics,
        overtime: null,
        paid_leave: null,
      },
    },
    onAddToCart: () => {},
    isInCart: false,
    showAddButton: true,
  },
};
