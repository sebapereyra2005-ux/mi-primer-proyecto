import { Link, NavLink } from 'react-router-dom';
import { ROUTES, APP_NAME } from '@/utils/constants';
import { SessionTimer } from '@/components/nexus/SessionTimer';
import { useNexus } from '@/context/NexusContext';

const NAV_ITEMS = [
  { to: ROUTES.ENTRADA, label: 'Entrada' },
  { to: ROUTES.NOTAS, label: 'Notas' },
];

export function Header() {
  const { state } = useNexus();

  return (
    <header className="sticky top-0 z-10 border-b border-nexus-border bg-nexus-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          to={ROUTES.ENTRADA}
          className="font-mono text-sm font-medium tracking-[0.2em] text-nexus-text hover:text-nexus-accent"
        >
          {APP_NAME}
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                      isActive
                        ? 'text-nexus-text'
                        : 'text-nexus-dim hover:text-nexus-text'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <SessionTimer startISO={state.sesionActiva?.createdAt ?? null} />
      </div>
    </header>
  );
}
