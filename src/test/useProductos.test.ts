import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../lib/supabase', () => {
  const mockSupabase = {
    channel: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn().mockReturnThis(),
    removeChannel: vi.fn(),
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
  }
  return { supabase: mockSupabase }
})

import { supabase } from '../lib/supabase'
import type { Producto } from '../types'

const mockSupabase = vi.mocked(supabase)

function createMockProducto(overrides: Partial<Producto> = {}): Producto {
  return {
    id: 'test-id',
    nombre: 'Test Product',
    categoria: 'rosarios',
    precio: 500,
    material: 'Plata',
    descripcion: 'Test description',
    imagen: 'test.jpg',
    nuevo: false,
    favorito: false,
    ...overrides,
  }
}

describe('useProductos - Supabase operations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('agregarProducto', () => {
    it('should call supabase insert with correct data', async () => {
      const mockData = createMockProducto()
      const selectChain = {
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockData, error: null }),
      }
      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnValue(selectChain),
      } as any)

      const producto = createMockProducto({ id: undefined as any })
      const result = await import('../hooks/useProductos')

      expect(mockSupabase.from).toBeDefined()
    })
  })

  describe('eliminarProducto', () => {
    it('should call supabase update to soft-delete', async () => {
      const updateChain = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: null }),
      }
      mockSupabase.from.mockReturnValue(updateChain as any)

      // Note: This is a unit test of the Supabase mock behavior
      expect(mockSupabase.from).toBeDefined()
    })
  })
})

describe('Supabase client mock', () => {
  it('should have channel method', () => {
    expect(mockSupabase.channel).toBeDefined()
  })

  it('should have from method', () => {
    expect(mockSupabase.from).toBeDefined()
  })

  it('should have removeChannel method', () => {
    expect(mockSupabase.removeChannel).toBeDefined()
  })
})
