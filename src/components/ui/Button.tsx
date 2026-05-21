import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger:
    'inline-flex items-center justify-center gap-2 rounded-md border border-nexus-danger/40 bg-transparent px-5 py-3 font-sans text-sm text-nexus-danger transition-colors hover:bg-nexus-danger/10',
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : '';
  return (
    <button
      className={`${VARIANT_CLASS[variant]} ${widthClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
