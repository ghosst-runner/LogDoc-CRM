import React, { useState } from 'react';

const mockCounterparties = [
  { id: '1', name: 'ООО "АльфаТорг"', type: 'sender', inn: '7701234567', address: 'Москва, ул. Промышленная, 12', contact: '+7 (495) 123-45-67', docs: 3 },
  { id: '2', name: 'ЗАО "ПромСтрой"', type: 'sender', inn: '6601122334', address: 'Екатеринбург, ул. Машиностроителей, 3', contact: '+7 (343) 987-65-43', docs: 1 },
  { id: '3', name: 'ИП Смирнов А.В.', type: 'recipient', inn: '780112345678', address: 'Санкт-Петербург, пр. Ленина, 45', contact: '+7 (812) 456-78-90', docs: 2 },
  { id: '4', name: 'ООО "СтройМастер"', type: 'recipient', inn: '1655098765', address: 'Казань, ул. Победы, 88', contact: '+7 (843) 321-09-87', docs: 1 },
  { id: '5', name: 'ТК "Деловые линии"', type: 'carrier', inn: '7843123456', address: 'Санкт-Петербург', contact: '8-800-345-45-45', docs: 2 },
  { id: '6', name: 'ГК "Транс-Авто"', type: 'carrier', inn: '2310098765', address: 'Краснодар', contact: '+7 (861) 777-88-99', docs: 2 },
  { id: '7', name: 'COSCO Shipping', type: 'carrier', inn: 'Foreign', address: 'Шанхай, Китай', contact: '+86 21 3521-7777', docs: 1 },
  { id: '8', name: 'ООО "ГлобалИмпорт"', type: 'sender', inn: '7714567890', address: 'Москва, ул. Внешняя, 5', contact: '+7 (495) 999-11-22', docs: 1 },
];

const typeIcons: Record<string, string> = {
  sender: '📤',
  recipient: '📥',
  carrier: '🚚',
};

const typeLabels: Record<string, string> = {
  sender: 'Отправитель',
  recipient: 'Получатель',
  carrier: 'Перевозчик',
};

const typeColors: Record<string, string> = {
  sender: 'bg-blue-50 text-blue-700 border-blue-100',
  recipient: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  carrier: 'bg-amber-50 text-amber-700 border-amber-100',
};

export const Counterparties: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = mockCounterparties.filter(c => {
    const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.inn.includes(search);
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Поиск по названию или ИНН..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'sender', 'recipient', 'carrier'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all
                ${typeFilter === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'}`}
            >
              {t === 'all' ? 'Все' : typeLabels[t]}
            </button>
          ))}
        </div>
        <button className="ml-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          ➕ Добавить
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl">
                  {typeIcons[c.type]}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[c.type]}`}>
                    {typeLabels[c.type]}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg text-sm">✏️</button>
                <button className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg text-sm">🗑️</button>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-500">
              <div className="flex gap-2"><span>🏢</span><span className="truncate">{c.address}</span></div>
              <div className="flex gap-2"><span>📞</span><span>{c.contact}</span></div>
              <div className="flex gap-2"><span>🔢</span><span>ИНН: {c.inn}</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Документов: <span className="font-bold text-slate-600">{c.docs}</span></span>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Документы →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
