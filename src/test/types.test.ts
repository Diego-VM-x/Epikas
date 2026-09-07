import { describe, it, expect } from 'vitest'
import { ordenarProductos } from '../lib/utils'
import type { Producto } from '../types'

const mockProductos: Producto[] = [
  {
    id: '1',
    nombre: 'Rosario de Plata',
    categoria: 'rosarios',
    precio: 850,
    material: 'Plata .925',
    descripcion: 'Rosario artesanal',
    imagen: 'img1.jpg',
    nuevo: true,
  },
  {
    id: '2',
    nombre: 'Collar de Oro',
    categoria: 'collares',
    precio: 1200,
    material: 'Oro 18k',
    descripcion: 'Collar elegante',
    imagen: 'img2.jpg',
    nuevo: false,
  },
  {
    id: '3',
    nombre: 'Anillo de Plata',
    categoria: 'anillos',
    precio: 450,
    material: 'Plata .925',
    descripcion: 'Anillo sencillo',
    imagen: 'img3.jpg',
    nuevo: true,
  },
]

describe('ordenarProductos', () => {
  it('should sort by precio-asc (ascending price)', () => {
    const result = ordenarProductos(mockProductos, 'precio-asc')
    expect(result[0].precio).toBe(450)
    expect(result[1].precio).toBe(850)
    expect(result[2].precio).toBe(1200)
  })

  it('should sort by precio-desc (descending price)', () => {
    const result = ordenarProductos(mockProductos, 'precio-desc')
    expect(result[0].precio).toBe(1200)
    expect(result[1].precio).toBe(850)
    expect(result[2].precio).toBe(450)
  })

  it('should sort by nombre-asc (alphabetical A-Z)', () => {
    const result = ordenarProductos(mockProductos, 'nombre-asc')
    expect(result[0].nombre).toBe('Anillo de Plata')
    expect(result[1].nombre).toBe('Collar de Oro')
    expect(result[2].nombre).toBe('Rosario de Plata')
  })

  it('should sort by nombre-desc (alphabetical Z-A)', () => {
    const result = ordenarProductos(mockProductos, 'nombre-desc')
    expect(result[0].nombre).toBe('Rosario de Plata')
    expect(result[1].nombre).toBe('Collar de Oro')
    expect(result[2].nombre).toBe('Anillo de Plata')
  })

  it('should sort by nuevos (newest first)', () => {
    const result = ordenarProductos(mockProductos, 'nuevos')
    expect(result[0].nuevo).toBe(true)
    expect(result[1].nuevo).toBe(true)
    expect(result[2].nuevo).toBe(false)
  })

  it('should return empty array when given empty array', () => {
    const result = ordenarProductos([], 'precio-asc')
    expect(result).toEqual([])
  })

  it('should not mutate original array', () => {
    const original = [...mockProductos]
    ordenarProductos(mockProductos, 'precio-asc')
    expect(mockProductos).toEqual(original)
  })
})
