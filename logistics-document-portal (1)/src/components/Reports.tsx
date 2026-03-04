import React from 'react';
import { LogisticsDocument } from '../types';
import { docTypeLabels, statusLabels } from '../data/mockData';

interface ReportsProps {
  documents: LogisticsDocument[];
}

export const Reports: React.FC<ReportsProps> = ({ documents }) => {
  const totalCost = documents.reduce((s, d) => s + d.cost, 0);
  const totalWeight = documents.reduce((s, d) => s + d.weight, 0);

  const byType = Object.keys(docTypeLabels).map(type => ({
    type,
    label: docTypeLabels[type],
    count: documents.filter(d => d.type === type).length,
    cost: documents.filter(d => d.type === type).reduce((s, d) => s + d.cost, 0),
  })).filter(d => d.count > 0);

  const byStatus = Object.keys(statusLabels).map(status => ({
    status,
    label: statusLabels[status],
    count: documents.filter(d => d.status === status).length,
  })).filter(d => d.count > 0);

  const maxCount = Math.max(...byType.map(d => d.count), 1);

  const statusColors: Record<string, string> = {
    draft: 'bg-slate-400',
    pending: 'bg-amber-400',
    approved: 'bg-green-500',
    rejected: 'bg-red-500',
    in_transit: 'bg-blue-500',
    delivered: 'bg-emerald-500',
    cancelled: 'bg-gray-400',
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Документов', value: documents.length, suffix: 'шт.', icon: '📄', color: 'text-slate-700' },
          { label: 'Общая стоимость', value: `${(totalCost / 1000000).toFixed(2)}M`, suffix: '₽', icon: '💰', color: 'text-blue-600' },
          { label: 'Общий вес', value: `${(totalWeight / 1000).toFixed(1)}`, suffix: 'т', icon: '⚖️', color: 'text-slate-700' },
          { label: 'Доставлено', value: documents.filter(d => d.status === 'delivered').length, suffix: 'шт.', icon: '✅', color: 'text-emerald-600' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-500">{c.label}</span>
              <span className="text-xl">{c.icon}</span>
            </div>
            <p className={`text-2xl font-bold ${c.color}`}>{c.value} <span className="text-sm font-normal text-slate-400">{c.suffix}</span></p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Type Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h3 className="font-bold text-slate-800 mb-4">📊 По типам документов</h3>
          <div className="space-y-3">
            {byType.map(item => (
              <div key={item.type}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-600 font-medium truncate max-w-48">{item.label}</span>
                  <div className="text-right ml-2">
                    <span className="text-sm font-bold text-slate-700">{item.count}</span>
                    <span className="text-xs text-slate-400 ml-1">шт.</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.cost.toLocaleString('ru-RU')} ₽</p>
              </div>
            ))}
          </div>
        </div>

        {/* By Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h3 className="font-bold text-slate-800 mb-4">📈 По статусам</h3>
          <div className="space-y-3">
            {byStatus.map(item => (
              <div key={item.status} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${statusColors[item.status]}`} />
                <span className="text-sm text-slate-600 flex-1">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-100 rounded-full h-2">
                    <div
                      className={`${statusColors[item.status]} h-2 rounded-full`}
                      style={{ width: `${(item.count / documents.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-700 w-6 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pie visual */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap gap-2">
              {byStatus.map(item => (
                <div key={item.status} className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full">
                  <div className={`w-2 h-2 rounded-full ${statusColors[item.status]}`} />
                  <span className="text-xs text-slate-600">{item.label}: <span className="font-bold">{Math.round((item.count / documents.length) * 100)}%</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Все документы (сводная таблица)</h3>
          <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold rounded-xl transition-colors">
            📥 Экспорт CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Номер</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Тип</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Отправитель</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">Вес, кг</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">Сумма, ₽</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {documents.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-slate-700">{doc.number}</td>
                  <td className="px-5 py-3 text-slate-600 text-xs">{docTypeLabels[doc.type]}</td>
                  <td className="px-5 py-3 text-slate-600 text-xs truncate max-w-40">{doc.sender}</td>
                  <td className="px-5 py-3 text-right text-slate-700">{doc.weight.toLocaleString('ru-RU')}</td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-700">{doc.cost.toLocaleString('ru-RU')}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 border-t-2 border-slate-200 font-bold">
                <td className="px-5 py-3 text-slate-700" colSpan={3}>ИТОГО</td>
                <td className="px-5 py-3 text-right text-slate-700">{totalWeight.toLocaleString('ru-RU')}</td>
                <td className="px-5 py-3 text-right text-blue-700">{totalCost.toLocaleString('ru-RU')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
