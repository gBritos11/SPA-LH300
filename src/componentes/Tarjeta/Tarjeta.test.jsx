import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Tarjeta from './Tarjeta';
import { FavoritosProvider } from '../../context/entornoFavoritos'; 

// --- MOCKS DE DEPENDENCIAS ---

// Mock de i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'tarjeta.ver_mas': 'Ver más',
        'tarjeta.presupuesto': 'Presupuesto'
      };
      return translations[key] || key;
    },
  }),
}));

// Mock de Lucide React (Iconos)
vi.mock('lucide-react', () => ({
  ArrowRight: () => <div data-testid="icon-arrow" />,
}));

// Mock del componente Favorito (para evitar ruidos de lógica de favoritos aquí)
vi.mock('../Favorito/Favorito', () => ({
  default: () => <div data-testid="mock-favorito" />,
}));

describe('Pruebas en <Tarjeta />', () => {
  const mockAction = vi.fn();
  
  const destinoMock = {
    id: '1',
    nombre: 'San Martín de los Andes',
    descripcion: 'Destino patagónico con lagos y montañas.',
    presupuesto: 50000,
    pais: 'Argentina',
    imagen: 'test.jpg'
  };

  // Limpiar los mocks antes de cada test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('1. Debería renderizar correctamente la información del destino', () => {
    render(
      <FavoritosProvider>
        <Tarjeta destino={destinoMock} action={mockAction} />
      </FavoritosProvider>
    );

    expect(screen.getByText('San Martín de los Andes')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.getByText('$ 50000')).toBeInTheDocument();
    expect(screen.getByAltText('San Martín de los Andes')).toBeInTheDocument();
  });

  it('2. Debería ejecutar la función action cuando el usuario hace clic en Ver más', () => {
    render(
      <FavoritosProvider>
        <Tarjeta destino={destinoMock} action={mockAction} />
      </FavoritosProvider>
    );
    
    const botonVerMas = screen.getByText('Ver más');
    fireEvent.click(botonVerMas);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('3. Debería mostrar valores por defecto si los datos están incompletos', () => {
    const destinoIncompleto = { id: '99' };
    
    render(
      <FavoritosProvider>
        <Tarjeta destino={destinoIncompleto} action={mockAction} />
      </FavoritosProvider>
    );

    expect(screen.getByText('Sin nombre')).toBeInTheDocument();
    expect(screen.getByText('desconocido')).toBeInTheDocument();
    expect(screen.getByText('$ 0')).toBeInTheDocument();
  });

  it('4. Debería cambiar el diseño cuando el tipo es "alojamiento"', () => {
    render(
      <FavoritosProvider>
        <Tarjeta destino={destinoMock} tipo="alojamiento" action={mockAction} />
      </FavoritosProvider>
    );

    expect(screen.getByText(/\$ 50000/i)).toBeInTheDocument();
    
    expect(screen.getByText('San Martín de los Andes')).toBeInTheDocument();

    // El botón "Ver más" no debería existir en alojamiento
    const boton = screen.queryByText('Ver más');
    expect(boton).not.toBeInTheDocument();
  });
});