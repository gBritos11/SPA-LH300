import { render, screen, userEvent} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Boton from './Boton';

describe('Pruebas en <Boton />', () => {
    
    it('debería renderizar el texto correctamente (children)', () => {
        render(<Boton>Click aquí</Boton>);
        expect(screen.getByText('Click aquí')).toBeInTheDocument();
    });

    it('debería llamar a la función onClick al hacer clic', async () => { //userEvent es asincrona
        const user = userEvent.setup(); //crea una instancia del usuario simulada y mantiene el estado entre acciones

        const fnSimulada = vi.fn();
        render(<Boton onClick={fnSimulada}>Enviar</Boton>);

        const boton = screen.getByRole('button');
        await user.click(boton);
        //await xq userEvent simula eventos reales asincronos. sin await, el test terminaria antes de que el click se procese.
        
        expect(fnSimulada).toHaveBeenCalledTimes(1);
    });

    it('debería renderizar un button cuando no recibe la prop to', () => {
        render(<Boton onClick={() => {}}>Enviar</Boton>);

        const boton = screen.getByRole('button'); //verficamos que cuando no hay un prop "to", el componente renderiza un boton y no un <a>

        expect(boton).toBeInTheDocument();
    });

    it('debería renderizar el icono si se le pasa como prop', () => {
        const IconoMock = () => <span data-testid="test-icon">→</span>;
        render(<Boton iconoDerecha={<IconoMock />}>Siguiente</Boton>);
        
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
});