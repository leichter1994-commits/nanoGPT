import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'
import type { FormEvent } from 'react'
import './App.css'

type TodoFilter = 'all' | 'active' | 'completed'

interface TodoItem {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export const STORAGE_KEY = 'todo-pro::tasks'

const filters: Array<{ key: TodoFilter; label: string }> = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Activas' },
  { key: 'completed', label: 'Completadas' },
]

const createId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`

const isTodoItem = (value: unknown): value is TodoItem => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'number'
  )
}

const loadInitialTodos = (): TodoItem[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isTodoItem)
  } catch {
    return []
  }
}

const buildEmptyMessage = (
  total: number,
  filter: TodoFilter,
  query: string,
): string => {
  if (total === 0) {
    return 'Todavia no hay tareas. Crea la primera y arrancamos.'
  }

  if (query.trim()) {
    return 'No hay resultados para esa busqueda.'
  }

  if (filter === 'active') {
    return 'No hay tareas activas. Excelente avance.'
  }

  return 'No hay tareas completadas aun.'
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>(loadInitialTodos)
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState<TodoFilter>('all')
  const [query, setQuery] = useState('')
  const [statusNote, setStatusNote] = useState(
    'Espacio listo. Escribi tu primera tarea.',
  )

  const deferredQuery = useDeferredValue(query)

  const persistTodos = useEffectEvent((nextTodos: TodoItem[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTodos))
  })

  useEffect(() => {
    persistTodos(todos)
  }, [todos])

  const normalizedQuery = deferredQuery.trim().toLowerCase()
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active' && todo.completed) {
      return false
    }

    if (filter === 'completed' && !todo.completed) {
      return false
    }

    if (normalizedQuery && !todo.title.toLowerCase().includes(normalizedQuery)) {
      return false
    }

    return true
  })

  const total = todos.length
  const completed = todos.filter((todo) => todo.completed).length
  const active = total - completed

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = draft.trim()
    if (!title) {
      setStatusNote('Escribi una tarea antes de agregar.')
      return
    }

    setTodos((current) => [
      {
        id: createId(),
        title,
        completed: false,
        createdAt: Date.now(),
      },
      ...current,
    ])
    setDraft('')
    setStatusNote(`Tarea agregada: ${title}.`)
  }

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
    setStatusNote('Tarea eliminada.')
  }

  const toggleAll = () => {
    if (total === 0) {
      return
    }

    const shouldCompleteAll = active > 0
    setTodos((current) =>
      current.map((todo) => ({ ...todo, completed: shouldCompleteAll })),
    )
    setStatusNote(
      shouldCompleteAll
        ? 'Todas las tareas quedaron completadas.'
        : 'Todas las tareas volvieron a pendientes.',
    )
  }

  const clearCompleted = () => {
    if (completed === 0) {
      return
    }

    setTodos((current) => current.filter((todo) => !todo.completed))
    setStatusNote('Se limpiaron las tareas completadas.')
  }

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <p className="hero-kicker">Proyecto popular, simple y util</p>
        <h1>Todo Pro</h1>
        <p className="hero-copy">
          Un gestor de tareas que parece liviano, pero trabaja en serio:
          persistencia local, filtros inteligentes y flujo rapido.
        </p>

        <div className="hero-metrics" aria-label="Metricas del proyecto">
          <article>
            <h2>{total}</h2>
            <p>Total</p>
          </article>
          <article>
            <h2>{active}</h2>
            <p>Activas</p>
          </article>
          <article>
            <h2>{completed}</h2>
            <p>Completadas</p>
          </article>
        </div>
      </header>

      <main className="workspace">
        <section className="input-panel" aria-label="Alta y filtros">
          <form onSubmit={handleAddTodo} className="add-form">
            <label htmlFor="todo-title">Nueva tarea</label>
            <div className="add-row">
              <input
                id="todo-title"
                name="todo-title"
                value={draft}
                maxLength={80}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ej: Preparar demo para cliente"
              />
              <button type="submit">Agregar tarea</button>
            </div>
          </form>

          <div className="toolbar">
            <div
              className="filter-group"
              role="tablist"
              aria-label="Filtros de tareas"
            >
              {filters.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === option.key}
                  className={filter === option.key ? 'is-active' : ''}
                  onClick={() => {
                    startTransition(() => {
                      setFilter(option.key)
                    })
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <label className="search-field" htmlFor="todo-search">
              Buscar
              <input
                id="todo-search"
                name="todo-search"
                value={query}
                placeholder="Filtrar por texto..."
                onChange={(event) => {
                  const value = event.target.value
                  startTransition(() => {
                    setQuery(value)
                  })
                }}
              />
            </label>
          </div>

          <div className="bulk-actions">
            <button type="button" onClick={toggleAll} disabled={total === 0}>
              {active > 0 ? 'Marcar todas como hechas' : 'Marcar todas pendientes'}
            </button>
            <button
              type="button"
              onClick={clearCompleted}
              disabled={completed === 0}
            >
              Limpiar completadas
            </button>
          </div>
        </section>

        <section className="list-panel" aria-label="Listado de tareas">
          <h2>Lista de trabajo</h2>

          {filteredTodos.length === 0 ? (
            <p className="empty-state">
              {buildEmptyMessage(total, filter, deferredQuery)}
            </p>
          ) : (
            <ul className="todo-list">
              {filteredTodos.map((todo) => (
                <li key={todo.id} className={todo.completed ? 'is-done' : ''}>
                  <label className="todo-main">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      aria-label={
                        todo.completed
                          ? `Marcar "${todo.title}" como pendiente`
                          : `Marcar "${todo.title}" como completada`
                      }
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span>{todo.title}</span>
                  </label>

                  <div className="todo-meta">
                    <time dateTime={new Date(todo.createdAt).toISOString()}>
                      {new Intl.DateTimeFormat('es-AR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(todo.createdAt)}
                    </time>
                    <button
                      type="button"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Eliminar "${todo.title}"`}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="status-line">
        <p role="status" aria-live="polite">
          {statusNote}
        </p>
      </footer>
    </div>
  )
}

export default App
