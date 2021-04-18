import { request } from './base';

export interface VenueDepartInfo {
  canAdvance: boolean;
  date: string;
  left: number;
  time: string;
  vip: boolean;
  week: string;
  weekDes: string;
}

export interface PriceListItem {
  id: number;
  price: string;
  seriesId: string;
  endTime: string;
  startTime: string;
  status: '0' | '1' // 0代表可以订
}

export interface FieldListItem {
  id: number;
  fieldName: string;
  priceList: PriceListItem[];
}

export interface FieldListResponse {
  list: Array<{
    fieldList: FieldListItem[];
  }>;
}

export const getVenueDepartInfoInSevenDays = () => {
  return request.get<{ list: VenueDepartInfo[] }>('/court/departInfoInSevenDays');
};

export const getFieldList = (date: string) => {
  return request.get<FieldListResponse>('/court/fieldList', {
    params: { date },
  });
};
