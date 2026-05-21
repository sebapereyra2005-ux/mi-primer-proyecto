/**
 * NEXUS — Pantalla 4: Cierre activo
 *
 * NUEVA. Es la que evita que el usuario simplemente "cierre la app".
 * Le pide UNA acción concreta escrita antes de salir.
 * Sin esto, NEXUS sería una herramienta de consulta, no de seguimiento.
 */

import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { Card } from '@/components/ui/Card';
import { useNexus } from '@/context/NexusContext';
import { PILLAR_LABELS, ROUTES } from '@/utils/constants';

export function CierrePage() {
  const navigate = useNavigate();
  const { state, closeSession, abandonSession } = useNexus();
  const sesion = state.sesionActiva;

  const [compromiso, setCompromiso] = useState(
    sesion?.pilares?.porDondeEmpezar ?? ''
  );

  if (!sesion || !sesion.pilares) {
    return <Navigate to={ROUTES.ENTRADA} replace />;
  }

  const cerrar = () => {
    const limpio = compromiso.trim();
    if (limpio.length < 5) return;
    closeSession(limpio);
    navigate(ROUTES.RETORNO);
  };

  const abandonar = () => {
    if (!confirm('¿Cerrar sin compromiso? La sesión quedará marcada como abandonada.')) {
      return;
    }
    abandonSession();
    navigate(ROUTES.ENTRADA);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <header>
        <h1 className="mb-2 text-xl text-nexus-text">Cierre con compromiso</h1>
        <p className="text-sm text-nexus-dim">
          Antes de cerrar: escribe la acción que vas a hacer ahora. Una sola.
          Concreta. Ejecutable hoy.
        </p>
      </header>

      <Card>
        <span className="label-clinical mb-2 block">
          Sugerencia ({PILLAR_LABELS.porDondeEmpezar})
        </span>
        <p className="text-clinical text-nexus-dim">
          {sesion.pilares.porDondeEmpezar}
        </p>
      </Card>

      <TextArea
        label="Tu compromiso"
        hint="Una frase. Verbo + objeto + cuándo. Ej: 'Llamar a Marta antes de las 18h.'"
        value={compromiso}
        onChange={(e) => setCompromiso(e.target.value)}
        rows={4}
        autoFocus
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" onClick={abandonar}>
          Abandonar sin compromiso
        </Button>
        <Button
          type="button"
          onClick={cerrar}
          disabled={compromiso.trim().length < 5}
        >
          Cerrar y guardar
        </Button>
      </div>
    </div>
  );
}
