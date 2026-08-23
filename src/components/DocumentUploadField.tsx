"use client";

import React, { useRef } from 'react';
import { FileUp, X } from 'lucide-react';

interface DocumentUploadFieldProps {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
  removeLabel: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  accept?: string;
}

const labelClass = 'block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5';

export const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  id,
  label,
  placeholder,
  hint,
  removeLabel,
  file,
  onChange,
  required,
  accept = '.pdf,.doc,.docx',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        required={required}
        aria-required={required}
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className="sr-only"
      />
      {file ? (
        <div className="flex items-center gap-3 w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900">
          <FileUp className="w-5 h-5 text-[#0B5198] dark:text-sky-400 shrink-0" />
          <span className="text-sm text-slate-700 dark:text-slate-200 truncate flex-1">{file.name}</span>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            aria-label={removeLabel}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex items-center gap-3 w-full px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-900 hover:border-[#0B5198] dark:hover:border-sky-400 transition-colors"
        >
          <FileUp className="w-5 h-5 text-slate-400 shrink-0" />
          <span className="text-sm text-slate-500 dark:text-slate-400">{placeholder}</span>
        </label>
      )}
      <p className="text-[11px] text-slate-400 mt-1.5">{hint}</p>
    </div>
  );
};
