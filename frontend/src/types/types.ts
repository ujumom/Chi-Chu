import React from 'react';

export type PlanPickerType = {
  product_name: string;
  product_code: string;
  company_code: string;
  company_name: string;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ComparisonTableRowType = {
  option_code: string;
  option_name: string;
  product_code: string[];
  coverage: string[];
};

export type ComparisonTableType = {
  company: PlanPickerType[];
  가격: { product_code: string; rate: number }[];
  치츄지수: { product_code: string; total_index: number }[];
  치아보철치료: ComparisonTableRowType[];
  치아보존치료: ComparisonTableRowType[];
  치수치료: ComparisonTableRowType[];
};

export type ProgressBarWithNumberType = {
  plan_score: number;
  plan_average: number;
};

export interface PlanTagType {
  id: number;
  plan_tag: string;
}

// planList selector

export type ProductType = {
  product_code: string;
  product_name: string;
  company_code: string;
  company_name: string;
  subtype_code: number;
  rate: number;
  py: number;
  option_code: string[];
  option_name: string[];
  moving?: boolean;
  total_index: number;
};

export type PlanListType = {
  cheap: ProductType[];
  chichu: ProductType[];
  coverage: ProductType[];
  popular: ProductType[];
  reasonable: ProductType[];
};

export type PlanDataType = {
  data: PlanListType;
  cheap: ProductType[];
  chichu: ProductType[];
  coverage: ProductType[];
  popular: ProductType[];
  reasonable: ProductType[];
};
