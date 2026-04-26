import { Link } from "react-router-dom";

const Boton = ({ 
  children, // Contenido
  to, // Si recibe este atributo el componente es un link
  onClick, // Si recibe este atributo el componente es un button de acción
  iconoIzquierda, // Icono a la izquierda
  iconoDerecha, // Icono a la derecha
  variante = "primary", // Variante de estilos, por defecto primario
  className = "", // Asignación de estilos según corresponda
  type = "button" // Por defecto es button, pero permite 'submit' para formularios
}) => {
  
  // Estilos Bases
  const estilosBase = "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  // Variantes de estilos (Colores y Bordes)
  const dicVariantes = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  // Estilo final
  const estilos = `${estilosBase} ${dicVariantes[variante] || dicVariantes.primary} ${className}`;

  // Contenido Interno
  const contenido = (
    <>
      {iconoIzquierda && <span className="shrink-0">{iconoIzquierda}</span>}
      {children}
      {iconoDerecha && <span className="shrink-0">{iconoDerecha}</span>}
    </>
  );

  // Lógica Polimórfica: es un link o un botón de accioón?
  if (to) {
    return (
      <Link to={to} className={estilos}>
        {contenido}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={estilos}>
      {contenido}
    </button>
  );
};

export default Boton;