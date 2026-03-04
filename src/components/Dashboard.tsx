import React from 'react';
import { LogisticsDocument, Stats } from '../types';
import { StatusBadge } from './StatusBadge';
import { docTypeLabels } from '../data/mockData';

interface DashboardProps {
  documents: LogisticsDocument[];
  stats: Stats;
  onNavigate: (section: string) => void;
}

const StatCard: React.FC<{ label: string; value: number; icon: string; color: string; sub?: string }> = ({ label, value, icon, color, sub }) => (
  <div className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl`}>
        {icon}
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ documents, stats, onNavigate }) => {
  const recent = documents.slice(0, 5);

  const totalCost = documents.reduce((sum, d) => sum + d.cost, 0);
  const inTransitCount = documents.filter(d => d.status === 'in_transit').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Добро пожаловать, Алексей! 👋</h2>
            <p className="text-blue-100 mt-1 text-sm">Сегодня у вас {inTransitCount} документов в пути. Все под контролем.</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => onNavigate('create')}
                className="px-4 py-2 bg-white text-blue-700 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow"
              >
                ➕ Создать документ
              </button>
              <button
                onClick={() => onNavigate('tracking')}
                className="px-4 py-2 bg-blue-500/30 text-white text-sm font-semibold rounded-xl hover:bg-blue-500/50 transition-colors border border-blue-400/40"
              >
                📍 Отслеживание
              </button>
            </div>
          </div>
          <div className="hidden md:block text-7xl opacity-20 select-none">🚚</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Всего документов" value={stats.total} icon="📁" color="text-slate-700" sub="За всё время" />
        <StatCard label="В пути" value={stats.in_transit} icon="🚚" color="text-blue-600" sub="Активные перевозки" />
        <StatCard label="Доставлено" value={stats.delivered} icon="✅" color="text-emerald-600" sub="Успешно завершены" />
        <StatCard label="На рассмотрении" value={stats.pending} icon="⏳" color="text-amber-600" sub="Ожидают решения" />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Черновики</p>
          <p className="text-2xl font-bold text-slate-700 mt-1">{stats.draft}</p>
          <p className="text-xs text-slate-400 mt-1">Не отправленные</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Одобрено</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
          <p className="text-xs text-slate-400 mt-1">Готовы к отправке</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Общая сумма грузов</p>
          <p className="text-2xl font-bold text-slate-700 mt-1">
            {(totalCost / 1000000).toFixed(1)}M ₽
          </p>
          <p className="text-xs text-slate-400 mt-1">Совокупная стоимость</p>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Последние документы</h3>
          <button onClick={() => onNavigate('documents')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Все документы →
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {recent.map((doc) => (
            <div key={doc.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/70 transition-colors">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                {doc.type === 'waybill' ? '🚚' : doc.type === 'invoice' ? '🧾' : doc.type === 'customs' ? '🛃' : doc.type === 'packing_list' ? '📦' : doc.type === 'bill_of_lading' ? '⚓' : '📋'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{doc.number}</p>
                <p className="text-xs text-slate-500 truncate">{docTypeLabels[doc.type]} · {doc.sender}</p>
              </div>
              <div className="hidden md:block text-right mr-4">
                <p className="text-xs text-slate-400">{doc.origin.split(',')[0]} → {doc.destination.split(',')[0]}</p>
                <p className="text-xs font-semibold text-slate-600">{doc.cost.toLocaleString('ru-RU')} ₽</p>
              </div>
              <StatusBadge status={doc.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '📄', label: 'Новая ТТН', action: 'create' },
          { icon: '🧾', label: 'Счёт-фактура', action: 'create' },
          { icon: '🛃', label: 'Таможенная декларация', action: 'create' },
          { icon: '📊', label: 'Отчёт', action: 'reports' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.action)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all text-left group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
