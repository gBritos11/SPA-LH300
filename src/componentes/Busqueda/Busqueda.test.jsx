import { render, screen, userEvent } from '@testing-library/react';
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

  it('2. Debería llamar a onChange cuando el usuario escribe', async () => {
    const user = userEvent.setup();
    render(
      <Busqueda 
        valor="" 
        onChange={mockOnChange} 
        campoFiltro="search" 
        onCampoChange={mockOnCampoChange} 
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'Neuquén');//user.type simula que el usuario tipea letra por letra
    //dispara keydown, keypress, input, keyup por cada carácter.

    expect(mockOnChange).toHaveBeenCalled();
    //Usamos toHaveBeenCalled() en vez de toHaveBeenCalledWith('Neuquén')
    //porque user.type llama onChange por cada letra, no con el string completo.
  });

  it('3. Debería llamar a onCampoChange cuando se cambia el criterio de búsqueda', async () => {
    const user = userEvent.setup();
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
    await user.selectOptions(select, 'pais');
    //user.selectOptions es el equivalente de userEvent para selects.
    //Simula abrir el dropdown y elegir una opción.
   
    expect(mockOnCampoChange).toHaveBeenCalledWith('pais');
  });
});