import { memo } from 'react';
import { Link } from "react-router-dom";

const Boton = memo (({ 
  children,
  to,
  onClick,
  iconoIzquierda,
  iconoDerecha,
  variante = "primary",
  className = "",
  type = "button"
}) => {
  
  // BASE — transiciones y estados comunes a todas las variantes
  const estilosBase = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none";
  
  // VARIANTES
  const dicVariantes = {

    // Naranja sólido — acción principal
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md",

    // Navy suave — acción secundaria
    secondary: "bg-[#0a1628] text-white hover:bg-[#0a1628]/80 shadow-sm",

    // Contorno navy — acción terciaria
    outline: "border border-[#0a1628] text-[#0a1628] hover:bg-[#0a1628] hover:text-white",

    // Sin fondo — acción mínima
    ghost: "text-gray-500 hover:text-gray-800 hover:bg-gray-100",

    // Rojo — acción destructiva
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm"
  };

  const estilos = `${estilosBase} ${dicVariantes[variante] || dicVariantes.primary} ${className}`;

  const contenido = (
    <>
      {iconoIzquierda && <span className="shrink-0">{iconoIzquierda}</span>}
      {children}
      {iconoDerecha && <span className="shrink-0">{iconoDerecha}</span>}
    </>
  );

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
});

Boton.displayName = "Boton";
export default Boton;