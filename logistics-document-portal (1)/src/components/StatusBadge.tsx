import React from 'react';
import { DocumentStatus } from '../types';
import { statusLabels } from '../data/mockData';

const statusStyles: Record<DocumentStatus, string> = {
  draft: 'bg-slate-100 text-slate-600 border-slate-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  in_transit: 'bg-blue-50 text-blue-700 border-blue-200',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
};

const statusDots: Record<DocumentStatus, string> = {
  draft: 'bg-slate-400',
  pending: 'bg-amber-400',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
  in_transit: 'bg-blue-500',
  delivered: 'bg-emerald-500',
  cancelled: 'bg-gray-400',
};

interface StatusBadgeProps {
  status: DocumentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${statusDots[status]}`}></span>
      {statusLabels[status]}
    </span>
  );
};
