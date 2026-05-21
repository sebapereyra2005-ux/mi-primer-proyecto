import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Si true, no tiene padding (para componer libremente) */
  flush?: boolean;
}

export function Card({
  children,
  flush = false,
  className = '',
  ...rest
}: CardProps) {
  const padding = flush ? '' : 'p-6';
  return (
    <div
      className={`rounded-lg border border-nexus-border bg-nexus-surface ${padding} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
