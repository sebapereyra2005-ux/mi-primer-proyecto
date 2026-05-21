import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-nexus-border px-6 py-12 text-center">
      <h3 className="font-mono text-sm uppercase tracking-widest text-nexus-dim">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm text-nexus-fade">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
