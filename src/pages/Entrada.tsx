/**
 * NEXUS — Pantalla 1: Entrada
 *
 * Principio de diseño: NADA compite con el campo de texto.
 * - Una sola pregunta arriba
 * - El campo de texto, grande
 * - Dos disparadores debajo
 * - Si hay compromiso previo, banner discreto sobre todo
 *
 * Sin el banner, son 3 elementos. Con banner, 4. Nunca más.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { CommitmentBanner } from '@/components/nexus/CommitmentBanner';
import { useNexus } from '@/context/NexusContext';
import { ROUTES } from '@/utils/constants';
import type { Trigger } from '@/types';

export function EntradaPage() {
  const navigate = useNavigate();
  const { startSession, hasActiveSession, lastCommitment } = useNexus();
  const [texto, setTexto] = useState('');

  // Si ya hay sesión activa, ir directo a pilares (no rebobinar)
  useEffect(() => {
    if (hasActiveSession) {
      navigate(ROUTES.PILARES, { replace: true });
    }
  }, [hasActiveSession, navigate]);

  const dispararSesion = async (disparador: Trigger) => {
    if (texto.trim().length < 3) return;
    await startSession(texto.trim(), disparador);
    navigate(ROUTES.PILARES);
  };

  const puedeDisparar = texto.trim().length >= 3;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {lastCommitment && (
        <CommitmentBanner session={lastCommitment} />
      )}

      <section>
        <h1 className="mb-2 text-xl text-nexus-text">¿Qué tienes en la cabeza?</h1>
        <p className="text-sm text-nexus-dim">
          Escribe sin orden. Sin filtrar. Esto es para ti, no para nadie más.
        </p>
      </section>

      <TextArea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Vuelca aquí lo que sea que esté ocupando espacio mental ahora mismo…"
        rows={10}
        autoFocus
        aria-label="Volcado mental"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="primary"
          disabled={!puedeDisparar}
          onClick={() => dispararSesion('orden')}
        >
          Necesito ordenar
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={!puedeDisparar}
          onClick={() => dispararSesion('accion')}
        >
          Necesito una acción
        </Button>
      </div>

      <p className="text-center font-mono text-xs uppercase tracking-widest text-nexus-fade">
        Objetivo: cerrar en menos de 15 minutos con una acción escrita.
      </p>
    </div>
  );
}
