/**
 * NEXUS — Pantalla 2: Los 4 pilares
 *
 * Output principal de la consola. La acción "Por dónde empezar"
 * está visualmente destacada porque es la que cierra la sesión.
 */

import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { PillarCard } from '@/components/nexus/PillarCard';
import { DistillateBlock } from '@/components/nexus/DistillateBlock';
import { useNexus } from '@/context/NexusContext';
import { PILLAR_LABELS, ROUTES } from '@/utils/constants';

export function PilaresPage() {
  const { state, isProcessing } = useNexus();
  const sesion = state.sesionActiva;

  // Si no hay sesión activa, volver a entrada
  if (!sesion) {
    return <Navigate to={ROUTES.ENTRADA} replace />;
  }

  if (isProcessing || !sesion.pilares || !sesion.destilado) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        <h1 className="text-xl text-nexus-text">Sintetizando</h1>
        <Loader label="Destilando tu volcado" />
      </div>
    );
  }

  const { pilares, destilado } = sesion;

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <header className="flex items-center justify-between">
        <h1 className="text-xl text-nexus-text">Lectura clínica</h1>
        <Link
          to={ROUTES.SINCRONIZADOR}
          className="font-mono text-xs uppercase tracking-widest text-nexus-dim hover:text-nexus-text"
        >
          ¿No te refleja? Ajustar →
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PillarCard label={PILLAR_LABELS.foco} index={1}>
          {pilares.foco}
        </PillarCard>
        <PillarCard label={PILLAR_LABELS.hechos} index={2}>
          {pilares.hechos}
        </PillarCard>
        <PillarCard label={PILLAR_LABELS.espejo} index={3}>
          {pilares.espejo}
        </PillarCard>
        <PillarCard label={PILLAR_LABELS.porDondeEmpezar} index={4} primary>
          {pilares.porDondeEmpezar}
        </PillarCard>
      </div>

      <DistillateBlock destilado={destilado} />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <Link to={ROUTES.NOTAS} className="btn-ghost text-center">
          Guardar nota libre
        </Link>
        <Link to={ROUTES.CIERRE} className="flex-1 sm:flex-none">
          <Button fullWidth>Cerrar con compromiso</Button>
        </Link>
      </div>
    </div>
  );
}
