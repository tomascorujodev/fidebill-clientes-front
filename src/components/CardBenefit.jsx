import { useState } from "react"
import "../assets/css/CardBenefit.css"

export default function CardBenefit({
  tipo,
  descripcion,
  dias,
  porcentajeReintegro,
  fechaInicio,
  fechaFin,
  sucursales,
  file,
  NombreEmpresa,
}) {
  const [expanded, setExpanded] = useState(false)

  // Formatear fechas para mostrar
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  // Imagen por defecto si no se proporciona
  const imageSrc = file || "/assets/LOGOSD400px.png"

  return (
    <div className={`promo-card ${expanded ? "expanded" : ""}`}>
      <div className="promo-card-header">
        <img src={imageSrc || "/placeholder.svg"} className="promo-logo" alt={`Logo de ${NombreEmpresa}`} />
        <div className="promo-badge">{porcentajeReintegro}% OFF</div>
      </div>

      <div className="promo-card-body">
        <h3 className="promo-title">{tipo}</h3>
        <p className="promo-description">{descripcion}</p>

        {expanded && (
          <div className="promo-details">
            <div className="promo-detail-item">
              <span className="detail-label">Días válidos:</span>
              <span className="detail-value">{dias}</span>
            </div>

            <div className="promo-detail-item">
              <span className="detail-label">Vigencia:</span>
              <span className="detail-value">
                {formatDate(fechaInicio)} - {formatDate(fechaFin)}
              </span>
            </div>

            {sucursales && sucursales.length > 0 && (
              <div className="promo-detail-item">
                <span className="detail-label">Sucursales:</span>
                <ul className="sucursales-list">
                  {sucursales.map((sucursal, index) => (
                    <li key={index}>{sucursal}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <button className="promo-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Ocultar detalles" : "Más detalles"}
        </button>
      </div>

      <div className="promo-card-footer">
        <span className="empresa-name">{NombreEmpresa}</span>
      </div>
    </div>
  )
}

