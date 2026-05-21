import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="label-clinical mb-2">404</p>
      <h1 className="mb-2 text-xl text-nexus-text">Ruta inexistente</h1>
      <p className="mb-6 text-sm text-nexus-dim">
        Esta pantalla no forma parte de NEXUS.
      </p>
      <Link to={ROUTES.ENTRADA} className="btn-primary">
        Volver a la entrada
      </Link>
    </div>
  );
}
