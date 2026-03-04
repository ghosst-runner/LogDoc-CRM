import { useState, useCallback } from 'react';
import { LogisticsDocument, Stats } from './types';
import { mockDocuments } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DocumentList } from './components/DocumentList';
import { DocumentForm } from './components/DocumentForm';
import { DocumentModal } from './components/DocumentModal';
import { Tracking } from './components/Tracking';
import { Reports } from './components/Reports';
import { Counterparties } from './components/Counterparties';

const sectionTitles: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Дашборд', subtitle: 'Обзор и сводка' },
  documents: { title: 'Документы', subtitle: 'Управление логистическими документами' },
  create: { title: 'Создать документ', subtitle: 'Заполните форму нового документа' },
  tracking: { title: 'Отслеживание грузов', subtitle: 'Мониторинг активных перевозок' },
  counterparties: { title: 'Контрагенты', subtitle: 'Отправители, получатели, перевозчики' },
  reports: { title: 'Отчёты и аналитика', subtitle: 'Статистика и экспорт данных' },
  settings: { title: 'Настройки', subtitle: 'Параметры системы' },
};

function getStats(docs: LogisticsDocument[]): Stats {
  return {
    total: docs.length,
    draft: docs.filter(d => d.status === 'draft').length,
    pending: docs.filter(d => d.status === 'pending').length,
    approved: docs.filter(d => d.status === 'approved').length,
    in_transit: docs.filter(d => d.status === 'in_transit').length,
    delivered: docs.filter(d => d.status === 'delivered').length,
    rejected: docs.filter(d => d.status === 'rejected').length,
  };
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export default function App() {
  const [section, setSection] = useState('dashboard');
  const [documents, setDocuments] = useState<LogisticsDocument[]>(mockDocuments);
  const [viewDoc, setViewDoc] = useState<LogisticsDocument | null>(null);
  const [editDoc, setEditDoc] = useState<LogisticsDocument | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const stats = getStats(documents);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const handleSaveDocument = (data: Omit<LogisticsDocument, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editDoc) {
      setDocuments(prev => prev.map(d =>
        d.id === editDoc.id
          ? { ...d, ...data, updatedAt: new Date().toISOString() }
          : d
      ));
      showToast(`Документ ${editDoc.number} успешно обновлён`);
    } else {
      const newDoc: LogisticsDocument = {
        ...data,
        id: Math.random().toString(36).slice(2),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setDocuments(prev => [newDoc, ...prev]);
      showToast(`Документ ${newDoc.number} успешно создан`);
    }
    setEditDoc(null);
    setSection('documents');
  };

  const handleEdit = (doc: LogisticsDocument) => {
    setEditDoc(doc);
    setViewDoc(null);
    setSection('create');
  };

  const handleDelete = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (window.confirm(`Удалить документ ${doc?.number}?`)) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      showToast(`Документ удалён`, 'error');
    }
  };

  const handleNavigate = (sec: string) => {
    if (sec !== 'create') setEditDoc(null);
    setSection(sec);
  };

  const info = sectionTitles[section] || { title: section };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar activeSection={section} onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={info.title}
          subtitle={info.subtitle}
          notifications={stats.pending + stats.rejected}
          onNotificationsClick={() => setSection('documents')}
        />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {section === 'dashboard' && (
            <Dashboard documents={documents} stats={stats} onNavigate={handleNavigate} />
          )}

          {section === 'documents' && (
            <DocumentList
              documents={documents}
              onView={setViewDoc}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {section === 'create' && (
            <DocumentForm
              initialData={editDoc}
              onSave={handleSaveDocument}
              onCancel={() => { setEditDoc(null); setSection('documents'); }}
            />
          )}

          {section === 'tracking' && <Tracking documents={documents} />}

          {section === 'counterparties' && <Counterparties />}

          {section === 'reports' && <Reports documents={documents} />}

          {section === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-xl">
              <h2 className="text-lg font-bold text-slate-800 mb-6">⚙️ Настройки портала</h2>
              <div className="space-y-5">
                {[
                  { label: 'Название организации', value: 'ООО "ЛогиДокс"' },
                  { label: 'ИНН', value: '7701234567' },
                  { label: 'КПП', value: '770101001' },
                  { label: 'Юридический адрес', value: 'Москва, ул. Логистическая, 1' },
                  { label: 'Email для уведомлений', value: 'logist@logidocs.ru' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">{f.label}</label>
                    <input
                      type="text"
                      defaultValue={f.value}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                ))}
                <button
                  onClick={() => showToast('Настройки сохранены')}
                  className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  💾 Сохранить настройки
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Document View Modal */}
      {viewDoc && (
        <DocumentModal
          doc={viewDoc}
          onClose={() => setViewDoc(null)}
          onEdit={handleEdit}
        />
      )}

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium text-white animate-in slide-in-from-right
              ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-500'}`}
          >
            <span>{toast.type === 'success' ? '✅' : '❌'}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
