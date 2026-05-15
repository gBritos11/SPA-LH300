import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Boton from './Boton';

describe('Pruebas en <Boton />', () => {
    
    it('debería renderizar el texto correctamente (children)', () => {
        render(<Boton>Click aquí</Boton>);
        expect(screen.getByText('Click aquí')).toBeInTheDocument();
    });

    it('debería llamar a la función onClick al hacer clic', () => {
        const fnSimulada = vi.fn();
        render(<Boton onClick={fnSimulada}>Enviar</Boton>);
        
        const boton = screen.getByRole('button');
        fireEvent.click(boton);

        expect(fnSimulada).toHaveBeenCalledTimes(1);
    });

    it('debería aplicar clases de CSS según la variante (ej: primary)', () => {
        const { container } = render(<Boton variante="primary">Botón Azul</Boton>);
        
        // Aca verificamos si el botón tiene alguna clase que esperas
        const boton = container.firstChild;
        expect(boton).toHaveClass('rounded-xl');
    });

    it('debería renderizar el icono si se le pasa como prop', () => {
        const IconoMock = () => <span data-testid="test-icon">→</span>;
        render(<Boton iconoDerecha={<IconoMock />}>Siguiente</Boton>);
        
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
});