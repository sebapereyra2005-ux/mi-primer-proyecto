import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

/**
 * Captura cualquier error en el árbol y muestra un fallback sobrio.
 * Mantiene el lenguaje clínico — sin emojis ni dramatismo.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[NEXUS] ErrorBoundary:', error, info);
  }

  private handleReset = () => {
    this.setState({ hasError: false, message: undefined });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="label-clinical mb-2">Error inesperado</p>
          <h1 className="mb-4 text-xl text-nexus-text">
            Algo se rompió en NEXUS
          </h1>
          <p className="mb-6 text-sm text-nexus-dim">
            {this.state.message ??
              'No se pudo continuar. Recarga la página para reiniciar la sesión.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="btn-secondary"
            >
              Reintentar
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Recargar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
