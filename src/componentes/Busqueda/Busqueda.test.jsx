import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Busqueda from './Busqueda';

// Mock de i18next (necesario si tu Busqueda usa placeholders traducidos)
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('Pruebas en <Busqueda />', () => {
  const mockOnChange = vi.fn();
  const mockOnCampoChange = vi.fn();

  it('1. Debería mostrar el valor inicial en el input', () => {
    render(
      <Busqueda 
        valor="Bariloche" 
        onChange={mockOnChange} 
        campoFiltro="search" 
        onCampoChange={mockOnCampoChange} 
      />
    );

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('Bariloche');
  });

  it('2. Debería llamar a onChange cuando el usuario escribe', () => {
    render(
      <Busqueda 
        valor="" 
        onChange={mockOnChange} 
        campoFiltro="search" 
        onCampoChange={mockOnCampoChange} 
      />
    );

    const input = screen.getByRole('textbox');
    
    // Simulamos que el usuario escribe "Neuquén"
    fireEvent.change(input, { target: { value: 'Neuquén' } });

    expect(mockOnChange).toHaveBeenCalledWith('Neuquén');
  });

  it('3. Debería llamar a onCampoChange cuando se cambia el criterio de búsqueda', () => {
    render(
      <Busqueda 
        valor="" 
        onChange={mockOnChange} 
        campoFiltro="search" 
        onCampoChange={mockOnCampoChange} 
      />
    );

    // Buscamos el select (combobox)
    const select = screen.getByRole('combobox');
    
    // Simulamos que el usuario elige buscar por "pais"
    fireEvent.change(select, { target: { value: 'pais' } });

    expect(mockOnCampoChange).toHaveBeenCalledWith('pais');
  });
});