# NEXUS

> Consola clínica de orden mental.

NEXUS no es un chatbot. No te consuela, no te pregunta cómo estás, no te ofrece ejercicios de respiración. Recibe un volcado mental desordenado y te devuelve una estructura clínica de 4 pilares + un destilado cognitivo, con el objetivo de que cierres la sesión en menos de 15 minutos con **una acción concreta escrita**.

## Métrica de éxito

Una sola: **el usuario cierra la app en menos de 15 minutos con una acción concreta escrita en la pantalla de cierre.**

Si la app abre, hace ruido y el usuario se va sin compromiso, ha fallado.

## Las 6 pantallas

| # | Pantalla | Rol |
|---|----------|-----|
| 1 | **Entrada** | Volcado mental libre + 2 disparadores (`Necesito ordenar` / `Necesito una acción`) |
| 2 | **Pilares** | Salida estructurada: Foco, Hechos, Espejo, Por dónde empezar + destilado cognitivo |
| 3 | **Sincronizador** | El usuario reescribe el espejo si no se siente reflejado |
| 4 | **Cierre** | Pide UNA acción concreta antes de salir (lo que convierte NEXUS en sistema de seguimiento) |
| 5 | **Retorno** | Al volver, muestra el último compromiso y pregunta si lo cumplió |
| 6 | **Notas** | Block de notas + Base de realidad (evidencias objetivas anti-distorsión) |

## Stack

- **React 18 + TypeScript** — tipado fuerte
- **Vite** — build y HMR
- **Tailwind CSS** — paleta NEXUS controlada (negro profundo + acento menta)
- **React Router v6** — navegación entre pantallas
- **Context + useReducer** — estado global sin overhead
- **localStorage** — persistencia de sesión, historial, notas y evidencias
- **vite-plugin-pwa** — instalable como app
- **ESLint + Prettier** — calidad

## Empezar en local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrirá en `http://localhost:5173`.

Por defecto usa el **proveedor mock** — funciona sin red y devuelve respuestas plausibles. Útil para desarrollar UI.

## Conectar una IA real

Edita `.env.local`:

### Google Gemini

```
VITE_AI_PROVIDER=gemini
VITE_GEMINI_API_KEY=tu_api_key
VITE_GEMINI_MODEL=gemini-1.5-flash
```

### OpenAI

```
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=tu_api_key
VITE_OPENAI_MODEL=gpt-4o-mini
```

> **Nota:** las API keys quedan expuestas en el cliente. Para producción, mover las llamadas a un backend o serverless function.

## Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Servir el build localmente |
| `npm run lint` | Lint con ESLint |
| `npm run format` | Formatear con Prettier |
| `npm run typecheck` | Verificar tipos sin compilar |

## Estructura

```
src/
├── components/
│   ├── ui/              # Button, Card, Input, TextArea, Loader, EmptyState, ErrorBoundary
│   ├── layout/          # Header, Layout
│   └── nexus/           # PillarCard, CommitmentBanner, SessionTimer, DistillateBlock
├── pages/               # Las 6 pantallas + 404
├── context/             # NexusContext (estado global)
├── hooks/               # useLocalStorage, useTimer
├── services/
│   ├── storage.service  # Capa de localStorage
│   └── ai/              # Factory + providers (mock, gemini, openai)
├── types/               # Modelo del dominio
├── utils/               # constants, format, prompts
└── styles/              # globals.css
```

## Principios de diseño

1. **Cero competencia visual antes de la entrada.** En la pantalla 1 solo hay título + textarea + 2 botones.
2. **Lenguaje sobrio, nunca técnico.** Nada de `EJECUTAR_SÍNTESIS` ni `CORE_STATE`.
3. **Una sola acción primaria por pantalla.** El resto es secundario.
4. **Cierre obligatorio.** Sin compromiso escrito no se "cierra" la sesión: se "abandona". Es parte del registro.
5. **Persistencia local.** Nada sale del dispositivo a menos que el usuario conecte una API.

## Roadmap (no implementado todavía)

- [ ] Backend serverless para proteger API keys en producción
- [ ] Recordatorio push del compromiso (PWA + notifications)
- [ ] Exportar historial a Markdown / JSON
- [ ] Tests con Vitest + React Testing Library
- [ ] Modo offline completo (la PWA ya cachea, falta probar)

## Licencia

Privado. Pertenece a su autor.
