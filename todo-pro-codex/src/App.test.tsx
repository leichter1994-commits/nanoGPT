import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App, { STORAGE_KEY } from './App'

const addTask = async (name: string) => {
  const user = userEvent.setup()
  const input = screen.getByLabelText(/nueva tarea/i)
  await user.type(input, name)
  await user.click(screen.getByRole('button', { name: /agregar tarea/i }))
}

describe('Todo Pro', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('agrega una tarea nueva', async () => {
    render(<App />)

    await addTask('Comprar verduras')

    expect(screen.getByText('Comprar verduras')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', {
        name: /marcar "comprar verduras" como completada/i,
      }),
    ).not.toBeChecked()
  })

  it('filtra por tareas completadas', async () => {
    render(<App />)
    const user = userEvent.setup()

    await addTask('Pagar internet')
    await addTask('Enviar resumen semanal')

    await user.click(
      screen.getByRole('checkbox', {
        name: /marcar "pagar internet" como completada/i,
      }),
    )
    await user.click(screen.getByRole('tab', { name: /completadas/i }))

    expect(screen.getByText('Pagar internet')).toBeInTheDocument()
    expect(screen.queryByText('Enviar resumen semanal')).not.toBeInTheDocument()
  })

  it('recupera tareas desde localStorage', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'task-1',
          title: 'Revisar pull request',
          completed: false,
          createdAt: 1712553035000,
        },
      ]),
    )

    render(<App />)

    expect(screen.getByText('Revisar pull request')).toBeInTheDocument()
  })
})
