import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>
)
const sucursales = [
  {
    id: 1,
    nombre: "Tucuman 3279",
    lat: -38.015094,
    lng: -57.5512744,
    imagen: "/assets/LOGOSD400px.png",
  },
  {
    id: 2,
    nombre: "Independencia 4169",
    lat: -38.0159271,
    lng: -57.5690578,
    imagen: "/assets/LOGOSD400px.png",
  },
]

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
})

export default function MapBranch() {
  const [mapCenter, setMapCenter] = useState([-38.0001, -57.5501])
  const [mapZoom, setMapZoom] = useState(13)
  const [mapHeight, setMapHeight] = useState("30vh") 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMapZoom(12)
        setMapHeight("40vh") 
      } else {
        setMapZoom(13)
        setMapHeight("50vh") 
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() 

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <div className="p-0">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          style={{ height: mapHeight, width: "100%" }} 
          zoomControl={false}  
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {sucursales.map((sucursal) => (
            <Marker key={sucursal.id} position={[sucursal.lat, sucursal.lng]} icon={customIcon}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold mb-2">{sucursal.nombre}</h3>
                  <img
                    src={sucursal.imagen || "/placeholder.svg"}
                    alt={sucursal.nombre}
                    style={{ width: "100px", height: "50px", objectFit: "cover" }}
                    className="rounded-md mb-2"
                  />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  )
}
