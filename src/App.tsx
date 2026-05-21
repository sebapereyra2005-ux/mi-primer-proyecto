import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { NexusProvider } from '@/context/NexusContext';
import { CierrePage } from '@/pages/Cierre';
import { EntradaPage } from '@/pages/Entrada';
import { NotasPage } from '@/pages/Notas';
import { NotFoundPage } from '@/pages/NotFound';
import { PilaresPage } from '@/pages/Pilares';
import { RetornoPage } from '@/pages/Retorno';
import { SincronizadorPage } from '@/pages/Sincronizador';
import { ROUTES } from '@/utils/constants';

export function App() {
  return (
    <ErrorBoundary>
      <NexusProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.ENTRADA} element={<EntradaPage />} />
            <Route path={ROUTES.PILARES} element={<PilaresPage />} />
            <Route
              path={ROUTES.SINCRONIZADOR}
              element={<SincronizadorPage />}
            />
            <Route path={ROUTES.CIERRE} element={<CierrePage />} />
            <Route path={ROUTES.RETORNO} element={<RetornoPage />} />
            <Route path={ROUTES.NOTAS} element={<NotasPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </NexusProvider>
    </ErrorBoundary>
  );
}
