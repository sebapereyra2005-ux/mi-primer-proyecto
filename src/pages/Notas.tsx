/**
 * NEXUS — Pantalla 6: Block de notas + Base de realidad
 *
 * Dos colecciones libres del usuario, separadas por pestaña simple.
 * - Notas: pensamientos sueltos
 * - Base de realidad: evidencias objetivas (anti-distorsión)
 */

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { EmptyState } from '@/components/ui/EmptyState';
import { useNexus } from '@/context/NexusContext';
import { formatDate } from '@/utils/format';

type Tab = 'notas' | 'evidencias';

export function NotasPage() {
  const { state, addNote, removeNote, addEvidence, removeEvidence } = useNexus();
  const [tab, setTab] = useState<Tab>('notas');
  const [nota, setNota] = useState('');
  const [evidencia, setEvidencia] = useState('');
  const [categoria, setCategoria] = useState('');

  const guardarNota = () => {
    const limpia = nota.trim();
    if (limpia.length < 1) return;
    addNote(limpia);
    setNota('');
  };

  const guardarEvidencia = () => {
    const limpia = evidencia.trim();
    if (limpia.length < 1) return;
    addEvidence(limpia, categoria.trim() || 'general');
    setEvidencia('');
    setCategoria('');
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <header>
        <h1 className="text-xl text-nexus-text">
          {tab === 'notas' ? 'Block de notas' : 'Base de realidad'}
        </h1>
        <p className="mt-1 text-sm text-nexus-dim">
          {tab === 'notas'
            ? 'Pensamientos sueltos, sin estructura.'
            : 'Hechos objetivos verificables. Para volver cuando la cabeza distorsiona.'}
        </p>
      </header>

      <nav
        role="tablist"
        aria-label="Vista"
        className="flex gap-1 border-b border-nexus-border"
      >
        {(['notas', 'evidencias'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              tab === t
                ? 'border-nexus-accent text-nexus-text'
                : 'border-transparent text-nexus-dim hover:text-nexus-text'
            }`}
          >
            {t === 'notas' ? 'Notas' : 'Evidencias'}
          </button>
        ))}
      </nav>

      {tab === 'notas' ? (
        <>
          <div className="flex flex-col gap-3">
            <TextArea
              label="Nueva nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Lo que sea, sin filtro."
              rows={3}
            />
            <Button
              type="button"
              onClick={guardarNota}
              disabled={!nota.trim()}
            >
              Guardar nota
            </Button>
          </div>

          {state.notas.length === 0 ? (
            <EmptyState title="Sin notas" />
          ) : (
            <ul className="flex flex-col gap-3">
              {state.notas.map((n) => (
                <li
                  key={n.id}
                  className="rounded-md border border-nexus-border bg-nexus-surface p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs text-nexus-dim">
                      {formatDate(n.createdAt)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeNote(n.id)}
                      className="font-mono text-xs uppercase tracking-widest text-nexus-fade hover:text-nexus-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-nexus-text">
                    {n.contenido}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
            <TextArea
              label="Nueva evidencia"
              value={evidencia}
              onChange={(e) => setEvidencia(e.target.value)}
              placeholder="Algo objetivamente cierto. Sin interpretación."
              rows={3}
            />
            <div className="flex flex-col gap-3 sm:w-48">
              <Input
                label="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="trabajo, salud…"
              />
              <Button
                type="button"
                onClick={guardarEvidencia}
                disabled={!evidencia.trim()}
              >
                Guardar
              </Button>
            </div>
          </div>

          {state.evidencias.length === 0 ? (
            <EmptyState
              title="Sin evidencias"
              description="Las evidencias son tu ancla cuando la cabeza distorsiona."
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {state.evidencias.map((e) => (
                <li
                  key={e.id}
                  className="rounded-md border border-nexus-border bg-nexus-surface p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-nexus-border px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-nexus-dim">
                        {e.categoria}
                      </span>
                      <span className="font-mono text-xs text-nexus-fade">
                        {formatDate(e.createdAt)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEvidence(e.id)}
                      className="font-mono text-xs uppercase tracking-widest text-nexus-fade hover:text-nexus-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-nexus-text">
                    {e.contenido}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
