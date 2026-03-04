import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  notifications: number;
  onNotificationsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, notifications, onNotificationsClick }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Поиск документов..."
            className="pl-9 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64"
          />
        </div>

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors"
        >
          <span className="text-lg">🔔</span>
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Date */}
        <div className="hidden lg:block text-right">
          <p className="text-xs text-slate-400">Сегодня</p>
          <p className="text-sm font-semibold text-slate-700">
            {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </header>
  );
};
