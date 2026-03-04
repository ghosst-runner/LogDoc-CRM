import React from 'react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Дашборд' },
  { id: 'documents', icon: '📄', label: 'Документы' },
  { id: 'create', icon: '➕', label: 'Создать документ' },
  { id: 'tracking', icon: '📍', label: 'Отслеживание' },
  { id: 'counterparties', icon: '🏢', label: 'Контрагенты' },
  { id: 'reports', icon: '📈', label: 'Отчёты' },
  { id: 'settings', icon: '⚙️', label: 'Настройки' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
            🚚
          </div>
          <div>
            <p className="text-lg font-bold leading-tight">LogiDocs</p>
            <p className="text-xs text-slate-400">Логистический портал</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left
              ${activeSection === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
            {activeSection === item.id && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300"></span>
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm font-bold">
            АИ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Алексей Иванов</p>
            <p className="text-xs text-slate-400 truncate">Логист</p>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors text-sm">⬅️</button>
        </div>
      </div>
    </aside>
  );
};
