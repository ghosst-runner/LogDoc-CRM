import React, { useState } from 'react';
import { LogisticsDocument, DocumentType } from '../types';
import { StatusBadge } from './StatusBadge';
import { docTypeLabels, statusLabels } from '../data/mockData';

interface DocumentListProps {
  documents: LogisticsDocument[];
  onView: (doc: LogisticsDocument) => void;
  onEdit: (doc: LogisticsDocument) => void;
  onDelete: (id: string) => void;
}

const typeIcons: Record<DocumentType, string> = {
  waybill: '🚚',
  invoice: '🧾',
  manifest: '📋',
  customs: '🛃',
  packing_list: '📦',
  bill_of_lading: '⚓',
};

export const DocumentList: React.FC<DocumentListProps> = ({ documents, onView, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'number' | 'cost'>('createdAt');

  const filtered = documents
    .filter(d => {
      const matchSearch = search === '' ||
        d.number.toLowerCase().includes(search.toLowerCase()) ||
        d.sender.toLowerCase().includes(search.toLowerCase()) ||
        d.recipient.toLowerCase().includes(search.toLowerCase()) ||
        d.cargo.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || d.status === statusFilter;
      const matchType = typeFilter === 'all' || d.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    })
    .sort((a, b) => {
      if (sortBy === 'createdAt') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'number') return a.number.localeCompare(b.number);
      if (sortBy === 'cost') return b.cost - a.cost;
      return 0;
    });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Поиск по номеру, контрагенту, грузу..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Все статусы</option>
            {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Все типы</option>
            {Object.entries(docTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="createdAt">По дате</option>
            <option value="number">По номеру</option>
            <option value="cost">По сумме</option>
          </select>

          <div className="text-sm text-slate-500 ml-auto">
            Найдено: <span className="font-semibold text-slate-700">{filtered.length}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Тип / Номер</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Отправитель → Получатель</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden md:table-cell">Маршрут</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Сумма</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Статус</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600 hidden lg:table-cell">Дата</th>
                <th className="text-right px-5 py-3.5 font-semibold text-slate-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="font-medium">Документы не найдены</p>
                    <p className="text-xs mt-1">Попробуйте изменить параметры поиска</p>
                  </td>
                </tr>
              ) : (
                filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">{typeIcons[doc.type]}</span>
                        <div>
                          <p className="font-semibold text-slate-800">{doc.number}</p>
                          <p className="text-xs text-slate-400">{docTypeLabels[doc.type]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-slate-700 font-medium truncate max-w-48">{doc.sender}</p>
                      <p className="text-xs text-slate-400 truncate max-w-48">{doc.recipient}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-slate-600 text-xs">{doc.origin.split(',')[0]}</p>
                      <p className="text-slate-400 text-xs">→ {doc.destination.split(',')[0]}</p>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <p className="font-semibold text-slate-700">{doc.cost.toLocaleString('ru-RU')} ₽</p>
                      <p className="text-xs text-slate-400">{doc.weight} кг</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-xs text-slate-400">
                      {new Date(doc.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onView(doc)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Просмотр"
                        >👁️</button>
                        <button
                          onClick={() => onEdit(doc)}
                          className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                          title="Редактировать"
                        >✏️</button>
                        <button
                          onClick={() => onDelete(doc.id)}
                          className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                          title="Удалить"
                        >🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
