import React from 'react';
import { LogisticsDocument } from '../types';
import { StatusBadge } from './StatusBadge';
import { docTypeLabels } from '../data/mockData';

interface DocumentModalProps {
  doc: LogisticsDocument;
  onClose: () => void;
  onEdit: (doc: LogisticsDocument) => void;
}

const Row: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
    <span className="text-sm text-slate-800 font-medium">{value || '—'}</span>
  </div>
);

export const DocumentModal: React.FC<DocumentModalProps> = ({ doc, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between rounded-t-2xl">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-800">{doc.number}</h2>
              <StatusBadge status={doc.status} />
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{docTypeLabels[doc.type]}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-500 text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Parties */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Стороны</h3>
            <div className="grid grid-cols-2 gap-4">
              <Row label="Отправитель" value={doc.sender} />
              <Row label="Получатель" value={doc.recipient} />
            </div>
          </div>

          {/* Route */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Маршрут</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs text-slate-400">Откуда</p>
                <p className="text-sm font-semibold text-slate-800">{doc.origin}</p>
              </div>
              <div className="text-blue-400 text-lg flex-shrink-0">→</div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">Куда</p>
                <p className="text-sm font-semibold text-slate-800">{doc.destination}</p>
              </div>
            </div>
          </div>

          {/* Cargo */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Груз</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Row label="Наименование" value={doc.cargo} />
              <Row label="Вес" value={`${doc.weight.toLocaleString('ru-RU')} кг`} />
              <Row label="Объём" value={`${doc.volume} м³`} />
              <Row label="Стоимость" value={`${doc.cost.toLocaleString('ru-RU')} ${doc.currency}`} />
            </div>
          </div>

          {/* Carrier */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Перевозчик</h3>
            <div className="grid grid-cols-2 gap-4">
              <Row label="Перевозчик" value={doc.carrier} />
              <Row label="Трек-номер" value={doc.trackingNumber} />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Row label="Дата создания" value={new Date(doc.createdAt).toLocaleString('ru-RU')} />
            <Row label="Последнее обновление" value={new Date(doc.updatedAt).toLocaleString('ru-RU')} />
          </div>

          {/* Notes */}
          {doc.notes && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">📌 Примечания</h3>
              <p className="text-sm text-slate-700">{doc.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={() => onEdit(doc)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            ✏️ Редактировать
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            🖨️ Печать
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors ml-auto"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
