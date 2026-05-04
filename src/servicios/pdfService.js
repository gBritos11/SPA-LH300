import jsPDF from "jspdf";
/* import html2canvas from "html2canvas"; */ //Al final no lo usamos porque dise;amos todo el pdf. Mas control sobre el documento

//Identidad Visual del pdf Tailwind
const COLORES = {
    naranja: [234, 88, 12],
    naranjaClaro: [255,237,213],
    grisOscuro: [31, 41, 55],
    grisMedio: [107,114,128],
    grisClaro: [243, 244, 246],
    blanco: [255, 255, 255],
}

//Logo en base64
const LOGO_BASE64 = null;
//Textos con saltos de linea automaticos - jsPDF no hace word-wrap automatico, debemos hacerlo nosotros
const agregarTextoConSaltos = (pdf, texto, x, y, anchoMaximo, alturaLinea) => {
    //splitTextToSize divide el texto en lineas que entran en anchoMaximo
    //devuelve un array de string: ["linea1", "linea2"...]
    const lineas = pdf.splitTextToSize(texto, anchoMaximo);

    //dibujamos cada linea desplazando y hacia abajo
    lineas.forEach((linea, index) => {
        pdf.text(linea, x, y + index * alturaLinea);
    });

    //retornamos la nueva posicion y despues del texto para saber donde continuar dibujando
    return y + lineas.length * alturaLinea;
}

//Funcion Principal
export const generarPDF = async (destino) => {
    //Creamos el documento A$ vertical en mm
    const pdf = new jsPDF('p', 'mm', 'a4');

    const ANCHO = pdf.internal.pageSize.getWidth(); //210mm
    const ALTO = pdf.internal.pageSize.getHeight(); //297
    const MARGEN = 20; //margin izq y der 20mm
    const ANCHO_UTIL = ANCHO - MARGEN * 2; //170 de ancho util para el texto

    let posY = 0; //cursor vertical = va bajando a medida que agregamos elementos

    //HEADER - franja naranja superior
    pdf.setFillColor(...COLORES.naranja);
    //rect(x, y, ancho, alto, 'F') → 'F' = filled (relleno)
    pdf.rect(0, 0, ANCHO, 45, 'F')

    //logo en el header
    //addImage(base64, formato, x, y, ancho, alto)
    try {
        pdf.addImage(LOGO_BASE64, 'PNG', MARGEN, 8, 40, 28);
    } catch {
        //Si el logo falla, ponemos nombre de la App como texto
        pdf.setTextColor(...COLORES.blanco);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text('TravelHub', MARGEN, 28);
    }

    //Texto "Ficha de destino" alineado a la derecha del header
    pdf.setTextColor(...COLORES.blanco);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Ficha de Destino', ANCHO - MARGEN, 28, {align: 'right'});

    posY = 55; //Dejamos espacio despues del header

    //Nombre del destino
    pdf.setTextColor(...COLORES.grisOscuro);
    pdf.setFontSize(26);
    pdf.setFont('helvetica', 'bold');
    pdf.text(destino.nombre || 'Sin nombre', MARGEN, posY);

    posY += 8;

    //Linea decorativa debajo del titulo
    //line(x1m y1, x2, y2)
    pdf.setDrawColor(...COLORES.naranja);
    pdf.setLineWidth(1);
    pdf.line(MARGEN, posY, ANCHO - MARGEN, posY);

    posY += 10;

    //Imagen del destino
    if (destino.imagen) {
        try {
            //descargamos la imagen y la convertimos a base64
            const respuesta = await fetch(destino.imagen, { mode: 'cors' });
            const blob = await respuesta.blob();
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            })
            //la img ocupa todo el ancho util
            const alturaImagen = 70;
            pdf.addImage(base64, 'JPEG', MARGEN, posY, ANCHO_UTIL, alturaImagen);
            posY += alturaImagen + 10;
        } catch {
            //Si la imagen falla, la omitimos
            posY += 5;
        }
    }

    //Informacion principal - dos cols
    //fondo gris claro para la seccion de datos
    pdf.setFillColor(...COLORES.grisClaro);
    pdf.roundedRect(MARGEN, posY, ANCHO_UTIL, 35, 3, 3, 'F');
    //roundedRect(x, y, ancho, alto, radio-x, radio-y, estilo)

    const colIzq = MARGEN + 5;
    const colDer = ANCHO / 2 + 5;

    //etiquetas en gris
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...COLORES.grisMedio);
    pdf.text('UBICACION', colIzq, posY + 8);
    pdf.text("PAIS", colDer, posY + 8);
    pdf.text('PRESUPUESTO', colIzq, posY + 22);
    pdf.text('CALIFICACION', colDer, posY + 22);

    //Valores en gris oscuro
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...COLORES.grisOscuro);
    pdf.text(destino.ubicacion || '-', colIzq, posY + 15);
    pdf.text(destino.pais || '-', colDer, posY + 15);

    //Presupuesto naranja para destacarlo
    pdf.setTextColor(...COLORES.naranja);
    pdf.text(`$ ${destino.presupuesto || 0}`, colIzq, posY + 29);
    pdf.setTextColor(...COLORES.grisOscuro);
    pdf.text(`${destino.calificacion || '-'} / 5`, colDer, posY + 29);

    posY += 45;

    //Descripcion
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...COLORES.naranja);
    pdf.text('Descripcion', MARGEN, posY);

    posY += 7;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...COLORES.grisOscuro);

    //AgregarTextoConSaltos maneja el word-wrop automaticamente 
    //alturaLinea: 5mm entre lineas
    posY = agregarTextoConSaltos(pdf, destino.descripcion || '-', MARGEN, posY, ANCHO_UTIL, 5)

    posY += 10;

    //ACCESIBILIDAD
    if (destino.accesibilidad?.length > 0) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...COLORES.naranja);
        pdf.text('Medios de acceso', MARGEN, posY);

        posY += 7

        //dibujamos cada medio como una "pastilla" naranja
        let posX = MARGEN;
        destino.accesibilidad.forEach((medio) => {
            const anchoTexto = pdf.getTextWidth(medio) + 8;

            //Si se sale del margen derechom bajamos a la siguiente linea
            if (posX + anchoTexto > ANCHO - MARGEN) {
                posX = MARGEN;
                posY += 10;
            }

            pdf.setFillColor(...COLORES.naranjaClaro);
            pdf.roundedRect(posX, posY -5, anchoTexto, 8, 2, 2, 'F');
            pdf.setFontSize(9);
            pdf.setTextColor(...COLORES.naranja);
            pdf.text(medio, posX + 4, posY + 0.5);

            posX += anchoTexto + 4;
        })

        posY += 15
    }

    //ALOJAMIENTOS

    if (destino.alojamiento?.length > 0) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...COLORES.naranja);
        pdf.text('Alojamientos disponibles', MARGEN, posY);

        posY += 8;

        destino.alojamiento.forEach((aloj, index) => {
            //Fondo alternado para las filas: gris claro, blanco
            if (index % 2 === 0) {
                pdf.setFillColor(...COLORES.grisClaro);
                pdf.rect(MARGEN, posY - 5, ANCHO_UTIL, 14, 'F');
            }

            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...COLORES.grisOscuro);
            pdf.text(`${aloj.nombre} (${aloj.tipo})`, MARGEN + 3, posY + 1);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(...COLORES.grisMedio);
            pdf.text(aloj.reseña || '', MARGEN + 3, posY + 6);

            pdf.setTextColor(...COLORES.naranja);
            pdf.text(`$ ${aloj.presupuesto}`, ANCHO - MARGEN - 3, posY + 3, {align: 'right'});

            posY += 16;
        })
    }

    //FOOTER
    //Linea separadora
    pdf.setDrawColor(...COLORES.grisClaro);
    pdf.setLineWidth(0.5);
    pdf.line(MARGEN, ALTO - 15, ANCHO - MARGEN, ALTO - 15);

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...COLORES.grisMedio);
    pdf.text('travelHub - Ficha generada automáticamente', MARGEN, ALTO - 8);
    pdf.text(new Date().toLocaleDateString('es-AR'), ANCHO - MARGEN, ALTO - 8, {align:'right'});

    //DESCARGA
    const nombreArchivo = `info-${(destino.nombre || 'destino').toLowerCase().replace(/\s+/g, '-')}.pdf`;
    pdf.save(nombreArchivo);

}