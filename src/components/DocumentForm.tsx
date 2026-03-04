import React, { useState, useEffect } from 'react';
import { LogisticsDocument, DocumentType, DocumentStatus } from '../types';
import { docTypeLabels } from '../data/mockData';

interface DocumentFormProps {
  initialData?: LogisticsDocument | null;
  onSave: (doc: Omit<LogisticsDocument, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const emptyForm = {
  type: 'waybill' as DocumentType,
  number: '',
  status: 'draft' as DocumentStatus,
  sender: '',
  recipient: '',
  origin: '',
  destination: '',
  cargo: '',
  weight: 0,
  volume: 0,
  cost: 0,
  currency: 'RUB',
  carrier: '',
  notes: '',
  trackingNumber: '',
};

const typeIcons: Record<DocumentType, string> = {
  waybill: '🚚',
  invoice: '🧾',
  manifest: '📋',
  customs: '🛃',
  packing_list: '📦',
  bill_of_lading: '⚓',
};

export const DocumentForm: React.FC<DocumentFormProps> = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        type: initialData.type,
        number: initialData.number,
        status: initialData.status,
        sender: initialData.sender,
        recipient: initialData.recipient,
        origin: initialData.origin,
        destination: initialData.destination,
        cargo: initialData.cargo,
        weight: initialData.weight,
        volume: initialData.volume,
        cost: initialData.cost,
        currency: initialData.currency,
        carrier: initialData.carrier,
        notes: initialData.notes,
        trackingNumber: initialData.trackingNumber || '',
      });
    } else {
      const typePrefix: Record<DocumentType, string> = {
        waybill: 'ТТН',
        invoice: 'СФ',
        manifest: 'МНФ',
        customs: 'ДТ',
        packing_list: 'УЛ',
        bill_of_lading: 'КН',
      };
      setForm(prev => ({
        ...prev,
        number: `${typePrefix[prev.type]}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
      }));
    }
  }, [initialData]);

  const handleTypeChange = (type: DocumentType) => {
    const typePrefix: Record<DocumentType, string> = {
      waybill: 'ТТН',
      invoice: 'СФ',
      manifest: 'МНФ',
      customs: 'ДТ',
      packing_list: 'УЛ',
      bill_of_lading: 'КН',
    };
    setForm(prev => ({
      ...prev,
      type,
      number: `${typePrefix[type]}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
    }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.sender.trim()) e.sender = 'Обязательное поле';
    if (!form.recipient.trim()) e.recipient = 'Обязательное поле';
    if (!form.origin.trim()) e.origin = 'Обязательное поле';
    if (!form.destination.trim()) e.destination = 'Обязательное поле';
    if (!form.cargo.trim()) e.cargo = 'Обязательное поле';
    if (!form.carrier.trim()) e.carrier = 'Обязательное поле';
    if (form.weight <= 0) e.weight = 'Должен быть > 0';
    if (form.cost <= 0) e.cost = 'Должен быть > 0';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      trackingNumber: form.trackingNumber || undefined,
    });
  };

  const Field = ({ label, name, type = 'text', required = false, colSpan = 1 }: { label: string; name: string; type?: string; required?: boolean; colSpan?: number }) => (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={(form as any)[name]}
        onChange={e => {
          const val = type === 'number' ? Number(e.target.value) : e.target.value;
          setForm(prev => ({ ...prev, [name]: val }));
          if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        }}
        className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all
          ${errors[name] ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <h2 className="text-lg font-bold text-slate-800">
          {initialData ? '✏️ Редактирование документа' : '➕ Создание нового документа'}
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">Заполните все обязательные поля</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Document Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">Тип документа *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(Object.keys(docTypeLabels) as DocumentType[]).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => handleTypeChange(type)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all
                  ${form.type === type
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
              >
                <span>{typeIcons[type]}</span>
                <span className="truncate text-xs">{docTypeLabels[type]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Number & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Номер документа</label>
            <input
              type="text"
              value={form.number}
              readOnly
              className="w-full px-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Статус</label>
            <select
              value={form.status}
              onChange={e => setForm(prev => ({ ...prev, status: e.target.value as DocumentStatus }))}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="draft">Черновик</option>
              <option value="pending">На рассмотрении</option>
              <option value="approved">Одобрен</option>
              <option value="in_transit">В пути</option>
              <option value="delivered">Доставлен</option>
              <option value="rejected">Отклонён</option>
              <option value="cancelled">Отменён</option>
            </select>
          </div>
        </div>

        {/* Parties */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs">1</span>
            Стороны сделки
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Отправитель" name="sender" required />
            <Field label="Получатель" name="recipient" required />
          </div>
        </div>

        {/* Route */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs">2</span>
            Маршрут
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Пункт отправления" name="origin" required />
            <Field label="Пункт назначения" name="destination" required />
          </div>
        </div>

        {/* Cargo */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs">3</span>
            Груз и перевозчик
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Наименование груза" name="cargo" required colSpan={2} />
            <Field label="Вес (кг)" name="weight" type="number" required />
            <Field label="Объём (м³)" name="volume" type="number" />
            <Field label="Стоимость груза (₽)" name="cost" type="number" required />
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Валюта</label>
              <select
                value={form.currency}
                onChange={e => setForm(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="RUB">RUB — Российский рубль</option>
                <option value="USD">USD — Доллар США</option>
                <option value="EUR">EUR — Евро</option>
                <option value="CNY">CNY — Китайский юань</option>
              </select>
            </div>
            <Field label="Перевозчик" name="carrier" required />
            <Field label="Трек-номер" name="trackingNumber" />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Примечания</label>
          <textarea
            value={form.notes}
            onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
            placeholder="Особые условия, пометки..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-200"
          >
            {initialData ? '💾 Сохранить изменения' : '📄 Создать документ'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
