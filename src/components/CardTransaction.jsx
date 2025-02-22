import { Card, Badge } from "react-bootstrap"
import { ShoppingCart, Gift, MapPin } from 'lucide-react'
import "../assets/css/CardTransaction.css"

export default function CardTransaction({ tipo, fecha, puntos, monto, description, direccion }) {
  const isExchange = tipo === "Canje"

  return (
    <Card className={`card-transaction ${isExchange ? "exchange" : "purchase"}`}>
      <Card.Body>
        <div className="transaction-header">
          <Badge bg={isExchange ? "warning" : "success"} className="transaction-type">
            {tipo}
          </Badge>
          <span className="transaction-date">{fecha}</span>
        </div>
        <div className="transaction-content">
          <div className={`icon-container ${isExchange ? "exchange" : "purchase"}`}>
            {isExchange ? <Gift size={24} /> : <ShoppingCart size={24} />}
          </div>
          <div className="transaction-details">
            <p className="transaction-amount">
              {isExchange ? `Puntos Canjeados: ${puntos}` : `Monto de la compra: $${monto}`}
            </p>
            <p className="transaction-description">{description}</p>
            <p className="transaction-location">
              <MapPin size={16} className="location-icon" />
              {direccion}
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
