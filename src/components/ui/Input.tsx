import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className = '', ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="label-clinical">{label}</label>}
      <input
        ref={ref}
        className={`w-full rounded-md border border-nexus-border bg-nexus-bg
                    px-4 py-3 font-sans text-base text-nexus-text
                    placeholder:text-nexus-fade transition-colors
                    focus:border-nexus-accent focus:outline-none
                    disabled:opacity-50 ${className}`.trim()}
        {...rest}
      />
      {hint && !error && <span className="text-xs text-nexus-dim">{hint}</span>}
      {error && <span className="text-xs text-nexus-danger">{error}</span>}
    </div>
  );
});
