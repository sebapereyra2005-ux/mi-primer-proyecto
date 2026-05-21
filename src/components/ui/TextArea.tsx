import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, hint, error, className = '', ...rest }, ref) {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="label-clinical">{label}</label>}
        <textarea
          ref={ref}
          className={`min-h-[120px] w-full resize-y rounded-md border border-nexus-border
                      bg-nexus-bg px-4 py-3 font-sans text-base leading-relaxed
                      text-nexus-text placeholder:text-nexus-fade
                      transition-colors focus:border-nexus-accent focus:outline-none
                      disabled:opacity-50 ${className}`.trim()}
          {...rest}
        />
        {hint && !error && (
          <span className="text-xs text-nexus-dim">{hint}</span>
        )}
        {error && <span className="text-xs text-nexus-danger">{error}</span>}
      </div>
    );
  }
);
