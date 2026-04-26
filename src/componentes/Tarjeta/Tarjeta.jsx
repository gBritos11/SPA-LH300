import styles from './Tarjeta.module.css';

const Tarjeta = ({ imagen, titulo, descripcion, presupuesto, action }) => { 
    return (
    <div className=" ax-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={imagen} alt={titulo} className="w-full h-48 object-cover overflow-hidden aspect-ratio" />

      <div className="p-4 flex flex-col flex-1 text-center">
        <h2 className="text-lg font-semibold text-gray-800 hover:text-xl transition-all line-clamp-1">{titulo}</h2>
        <p className="text-gray-600 mt-2 line-clamp-2">{descripcion}</p>
        <p className="text-gray-500 italic mt-2">$ {presupuesto}</p>
        <button
          onClick={action}
          className="mt-4 flex justify-center items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        > Ver más
        </button>
      </div>
    </div>
);
};
export default Tarjeta;