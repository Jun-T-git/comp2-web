/**
 * 企業メトリクス
 */
export type CompanyMetrics = {
  /** 平均年収 (万円) */
  salary: number;
  /** 平均年齢 (歳) */
  age: number;
  /** 平均勤続年数 (年) */
  duration: number;
  /** 従業員数 (人) */
  employees: number;
  /** 売上高 (億円) */
  revenue: number;
  /** 営業利益率 (%) - 計算済み */
  profit_margin: number;
  /** 自己資本比率 (%) - 計算済み */
  equity_ratio: number;
  /** 月間残業 (時間) - null可 */
  overtime: number | null;
  /** 有休消化率 (%) - null可 */
  paid_leave: number | null;
  /** 実質時給 (円) - 計算済み */
  hourly_wage: number;
};

/**
 * 企業コンテンツ（説明文・タグ）
 */
export type CompanyContent = {
  /** AI生成による企業要約 */
  summary: string;
  /** 財務から読み取れる懸念点 */
  risk_text: string;
  /** タグ一覧 */
  tags: string[];
};

/**
 * 企業フラグ
 */
export type CompanyFlags = {
  /** HD判定フラグ (従業員数極小かつ高年収) */
  is_holding: boolean;
};

/**
 * 企業データ
 */
export type Company = {
  /** 証券コード */
  id: string;
  /** 企業名 */
  name: string;
  /** 企業名（カナ） */
  kana: string;
  /** 業種 */
  industry: string;
  /** メトリクス */
  metrics: CompanyMetrics;
  /** コンテンツ */
  content: CompanyContent;
  /** フラグ */
  flags: CompanyFlags;
};
