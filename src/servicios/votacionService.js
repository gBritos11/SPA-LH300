import { Await } from "react-router-dom";

const BASE_URL = 'https://69e933af55d62f34797a51fc.mockapi.io';

/* Funcion principal de votacion  */
export const votarDestino = async (destino, puntaje) => {
    //Leemos valores actuales
    const puntuacionTotal = destino.puntuacionTotal || 0;
    const cantidadVotos = destino.cantidadVotos || 0;

    //Calculamos nuevos valores acumulando voto
    const nuevaPuntacionTotal = puntuacionTotal + puntaje;
    const nuevaCantidadVotos = cantidadVotos + 1;

    //Calculamos el nuevo promedio
    //toFixed(1) -> deja un solo decimal 4.333 -> 4.3
    const nuevaCalificacion = parseFloat(
        (nuevaPuntacionTotal / nuevaCantidadVotos).toFixed(1)
    )

    //Objeto que enviamos al PUT, mantenemos todos los campos igual solo sobreescribimos los que cambian
    const destinoActualizado = {
        ...destino,
        puntuacionTotal: nuevaPuntacionTotal,
        cantidadVotos: nuevaCantidadVotos,
        calificacion: nuevaCalificacion
    }

    //Peticion Put a MockApi
    //PUT reemplaza el objeto completo en el servidor
    const respuesta = await fetch(`${BASE_URL}/destino/${destino.id}`, {
        method: 'PUT',
        headers: {
            //Le decimos a mockApi que enviamos JSON
            'Content-type': 'application/json'
        },
        //COnvertimos el objeto a string JSON para enviarlo
        body: JSON.stringify(destinoActualizado)
    })

    if (!respuesta.ok) {
        throw new Error(`Error al votar: ${respuesta.status}`)
    }

    //Retornamos destino actualizado.
    //Es el mismo objeto pero confirmado por el servidor
    return await respuesta.json();
}