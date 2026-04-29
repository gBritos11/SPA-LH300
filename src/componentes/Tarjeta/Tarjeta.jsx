import Boton from '../Boton/Boton'; // Asegúrate de que la ruta sea la correcta
import { ArrowRight } from 'lucide-react'; // Importamos un icono para darle nivel
import estilo from './Tarjeta.module.css';

const Tarjeta = ({ destino, action }) => { 
  if (!destino) return null;

  const { 
    imagen = 'https://picsum.photos/400/300',
    nombre = 'Sin nombre',
    descripcion = 'Sin descripción disponible',
    presupuesto = 0,
    pais = 'desconocido'
  } = destino;
  
  return (
    <div className="max-w-sm bg-stone-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-comax-w-sm bg-stone-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      
      <div className="relative">
        <img 
          src={imagen} 
          alt={nombre} 
          className="w-full h-48 object-cover" 
        />
      </div>

      <div className="p-4 flex flex-col flex-1 text-center">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 h-7 hover:text-xl transition-all duration-300">
          {nombre}
        </h2>
        
        <p className="text-gray-600 mt-2 line-clamp-2 text-sm h-10">
          {pais} - {descripcion}
        </p>
        
        <p className="text-600 font-bold mt-4 text-xl">
          $ {presupuesto}
        </p>

        <Boton 
          onClick={action} 
          variante="primary" 
          iconoDerecha={<ArrowRight size={18} />}
          className="mt-4 w-full" 
        >
          Ver más
        </Boton>
      </div>
    </div>
  );
};

export default Tarjeta;