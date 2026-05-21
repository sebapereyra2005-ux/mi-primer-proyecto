/**
 * NEXUS — Pantalla 3: Sincronizador de realidad
 *
 * Permite al usuario ajustar el espejo cuando no se siente reflejado.
 * Es lo único editable. Todo lo demás lo sostiene la IA.
 */

import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { Card } from '@/components/ui/Card';
import { useNexus } from '@/context/NexusContext';
import { PILLAR_LABELS, ROUTES } from '@/utils/constants';

export function SincronizadorPage() {
  const navigate = useNavigate();
  const { state, updateEspejo } = useNexus();
  const sesion = state.sesionActiva;
  const [textoEspejo, setTextoEspejo] = useState(
    sesion?.pilares?.espejo ?? ''
  );

  if (!sesion || !sesion.pilares) {
    return <Navigate to={ROUTES.ENTRADA} replace />;
  }

  const guardar = () => {
    const limpio = textoEspejo.trim();
    if (limpio.length < 3) return;
    updateEspejo(limpio);
    navigate(ROUTES.PILARES);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <header>
        <h1 className="mb-2 text-xl text-nexus-text">Sincronizar realidad</h1>
        <p className="text-sm text-nexus-dim">
          ¿El espejo está desviado? Reescríbelo en tus términos.
        </p>
      </header>

      <Card>
        <span className="label-clinical mb-2 block">
          {PILLAR_LABELS.espejo} actual
        </span>
        <p className="text-clinical text-nexus-dim">{sesion.pilares.espejo}</p>
      </Card>

      <TextArea
        label="Tu reformulación"
        hint="Escribe cómo te sientes en realidad, en tus palabras."
        value={textoEspejo}
        onChange={(e) => setTextoEspejo(e.target.value)}
        rows={5}
        autoFocus
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(ROUTES.PILARES)}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={guardar}
          disabled={textoEspejo.trim().length < 3}
        >
          Aplicar ajuste
        </Button>
      </div>
    </div>
  );
}
