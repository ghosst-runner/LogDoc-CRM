export type DocumentStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'in_transit' | 'delivered' | 'cancelled';
export type DocumentType = 'waybill' | 'invoice' | 'manifest' | 'customs' | 'packing_list' | 'bill_of_lading';

export interface LogisticsDocument {
  id: string;
  type: DocumentType;
  number: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  cargo: string;
  weight: number;
  volume: number;
  cost: number;
  currency: string;
  carrier: string;
  notes: string;
  trackingNumber?: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: string;
}

export interface Stats {
  total: number;
  draft: number;
  pending: number;
  approved: number;
  in_transit: number;
  delivered: number;
  rejected: number;
}
