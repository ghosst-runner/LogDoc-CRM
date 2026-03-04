import React, { useState } from 'react';
import { LogisticsDocument } from '../types';
import { StatusBadge } from './StatusBadge';

interface TrackingProps {
  documents: LogisticsDocument[];
}

const trackingSteps = [
  { status: 'draft', label: 'Черновик', icon: '📝', desc: 'Документ создан' },
  { status: 'pending', label: 'На рассмотрении', icon: '⏳', desc: 'Ожидает подтверждения' },
  { status: 'approved', label: 'Одобрен', icon: '✅', desc: 'Готов к отправке' },
  { status: 'in_transit', label: 'В пути', icon: '🚚', desc: 'Груз транспортируется' },
  { status: 'delivered', label: 'Доставлен', icon: '🏁', desc: 'Получен адресатом' },
];

const getStepIndex = (status: string) => {
  const idx = trackingSteps.findIndex(s => s.status === status);
  return idx === -1 ? 0 : idx;
};

export const Tracking: React.FC<TrackingProps> = ({ documents }) => {
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<LogisticsDocument | null>(null);

  const inTransit = documents.filter(d => d.status === 'in_transit' || d.status === 'pending' || d.status === 'approved');

  const filtered = inTransit.filter(d =>
    search === '' ||
    d.number.toLowerCase().includes(search.toLowerCase()) ||
    (d.trackingNumber || '').toLowerCase().includes(search.toLowerCase()) ||
    d.carrier.toLowerCase().includes(search.toLowerCase())
  );

  const stepIndex = selectedDoc ? getStepIndex(selectedDoc.status) : 0;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-3">🔍 Поиск груза</h3>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">📍</span>
            <input
              type="text"
              placeholder="Введите номер документа, трек-номер или перевозчика..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
            Найти
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documents list */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Активные грузы <span className="text-blue-600">({filtered.length})</span></h3>
          </div>
          <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-sm">Нет активных грузов</p>
              </div>
            ) : (
              filtered.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`w-full text-left px-5 py-4 hover:bg-blue-50/60 transition-colors
                    ${selectedDoc?.id === doc.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{doc.number}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{doc.cargo}</p>
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <span>🚚 {doc.carrier}</span>
                    {doc.trackingNumber && <span>· #{doc.trackingNumber}</span>}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Tracking detail */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {!selectedDoc ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-slate-400">
              <div className="text-5xl mb-4">📍</div>
              <p className="font-medium">Выберите груз для отслеживания</p>
              <p className="text-sm mt-1">Нажмите на документ слева</p>
            </div>
          ) : (
            <>
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800">{selectedDoc.number}</h3>
                  <p className="text-xs text-slate-500">{selectedDoc.carrier}</p>
                </div>
                <StatusBadge status={selectedDoc.status} />
              </div>
              <div className="p-5 space-y-5">
                {/* Route info */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">📤</div>
                      <p className="text-xs text-slate-500 mt-1 max-w-24 truncate">{selectedDoc.origin.split(',')[0]}</p>
                    </div>
                    <div className="flex-1 border-t-2 border-dashed border-blue-300 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">🚚</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm">📥</div>
                      <p className="text-xs text-slate-500 mt-1 max-w-24 truncate">{selectedDoc.destination.split(',')[0]}</p>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  {trackingSteps.map((step, idx) => {
                    const isCompleted = idx < stepIndex;
                    const isCurrent = idx === stepIndex;
                    const isPending = idx > stepIndex;

                    return (
                      <div key={step.status} className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 transition-all
                          ${isCompleted ? 'bg-emerald-100' : isCurrent ? 'bg-blue-600 shadow-lg shadow-blue-200 ring-4 ring-blue-100' : 'bg-slate-100'}
                        `}>
                          {isCompleted ? '✅' : isCurrent ? step.icon : <span className="text-slate-400 text-xs">{idx + 1}</span>}
                        </div>
                        <div className={`flex-1 ${isPending ? 'opacity-40' : ''}`}>
                          <p className={`text-sm font-semibold ${isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {step.label}
                          </p>
                          <p className="text-xs text-slate-400">{step.desc}</p>
                        </div>
                        {isCurrent && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Сейчас</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Details */}
                <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-slate-500">Груз:</span><span className="font-medium text-slate-700">{selectedDoc.cargo}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Вес:</span><span className="font-medium text-slate-700">{selectedDoc.weight} кг</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Трек-номер:</span><span className="font-medium text-slate-700 font-mono">{selectedDoc.trackingNumber || '—'}</span></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
