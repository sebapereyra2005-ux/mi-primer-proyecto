import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-nexus-bg text-nexus-text">
      <Header />
      <main className="mx-auto w-full max-w-3xl px-6 py-8 sm:py-12">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-3xl px-6 py-8">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-nexus-fade">
          NEXUS — Consola clínica
        </p>
      </footer>
    </div>
  );
}
