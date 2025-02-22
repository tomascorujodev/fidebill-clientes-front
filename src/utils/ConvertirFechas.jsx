export function convertirFecha(fecha) {
    const date = new Date(fecha); 
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const anio = date.getFullYear();

    return `${dia}-${mes}-${anio}`;
}

export function convertirFechaIngles(fecha) {
  const date = new Date(fecha); 
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const anio = date.getFullYear();

  return `${anio}-${mes}-${dia}`;
}

export function convertirFechaArgentina(fechaISO) {
  if(fechaISO == null) return;
    const fecha = new Date(fechaISO);
  
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
  
    const fechaFormateada = new Intl.DateTimeFormat('es-AR', opciones).format(fecha);
    return fechaFormateada;
}

export function ISOaLatino(fechaISO) {
  const fecha = new Date(fechaISO);
  
  const opcionesFecha = {
      weekday: 'long', // Día de la semana
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  };

  const opcionesHora = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Usa formato de 24 horas
  };

  // Formatear fecha
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
  // Formatear hora
  const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);

  return `${fechaFormateada}, ${horaFormateada}`;
}

  