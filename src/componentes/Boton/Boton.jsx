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
    primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-md hover:shadow-lg", // naranja intenso
    secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200", // beige cálido
    outline: "border-2 border-orange-600 text-orange-600 hover:bg-orange-50", // borde naranja
    ghost: "text-stone-700 hover:bg-stone-100", // gris-marrón suave
    danger: "bg-red-500 text-white hover:bg-red-600" // puedes dejarlo igual o pasarlo a un marrón rojizo
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