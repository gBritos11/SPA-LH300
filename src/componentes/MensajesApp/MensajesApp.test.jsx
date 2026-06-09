import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MensajesApp from './MensajesApp';
import { useTranslation } from 'react-i18next';

/* mock DE i18nEXT */
/* Si no mockeamos, el test fallaria xq i18 no esta inicializando en el entorno de testing */
/* vi.mock intercepta el modulo completo y lo reemplaza con nuestra version falsa antes de que el test corra */
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key
    })
}));

describe('MensajesApp', () => {
    /* Esta fn agrupa todos los test de este componente */

    /* TEST 1 */
    it('muestra el mensaje de carga cuando el tipo es cargando', () => {
        render(<MensajesApp tipo='cargando'/>);

        expect(screen.getByText('mensajes.cargando')).toBeInTheDocument();
        //Si el componente deja de llamar a t() en ese caso, el test falla -> correcto. Si solo cambiamos la clase CSS del spiner, el test sigue pasando -> tambien correcto
    });

    /* TEST 2 */
    it('muestra el emoji de error cuando el tipo es error', () => {
        /* Renderizamos el componente con tipo="error" No necesitamos container aca porque vamos a buscar por rol de accesibilidad*/
        render(<MensajesApp tipo="error" />);
        /* getByRole busca un elemento por su rol ARIA */
        const emoji = screen.getByRole('img', {name: 'error'});

        expect(emoji).toBeInTheDocument();
        //Confirmamos que el emoji estan en el DOM
    });

    /* TEST 3 */
    it('muestra el emoji correcto cuando el tipo es vacio', () => {
        render(<MensajesApp tipo="vacio" />);

        const emoji = screen.getByRole('img', {name: 'vacio'});
        
        expect(emoji).toBeInTheDocument();
    });

    /* TEST 4 */
    it('muestra el mensaje personalizado que recibe por prop', () => {
        render(<MensajesApp tipo="vacio" mensaje="No hay resultados para tu busqueda" />)

        expect(screen.getByText('No hay resultados para tu busqueda')).toBeInTheDocument();
        /* getByText busca al elem que contenga ese text. Si existe el test pasa */
    });

    /* TEST 5 */
    it('muestra el detalle tecnico cuando recibe la prop detalle', () => {
        render(<MensajesApp tipo="error" detalle="404" />);

        expect(screen.getByText(/404/)).toBeInTheDocument();
    });

    /* TEST 6 */
    it('renderiza los children cuando los recibe', () => {
        render(
            <MensajesApp tipo="error">
                <button>Reintentar</button>
            </MensajesApp>
        );
        // Pasamos un botón como children.
        // MensajesApp tiene esta lógica:
        // {children && <div className="mt-4">{children}</div>}
        // Si children existe, lo renderiza dentro de un div.
        expect(screen.getByText('Reintentar')).toBeInTheDocument();
        // Verificamos que el botón hijo se renderizó.
        // Esto confirma que MensajesApp pasa correctamente
        // sus children al DOM.
    });
})
