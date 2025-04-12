import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocales } from "../contexts/LocalesContext";

const customIcon = divIcon({
  html: `
  <svg width="40" height="40" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 0a6 6 0 0 1 6 6c0 4.418-6 10-6 10S2 10.418 2 6a6 6 0 0 1 6-6z"/>
  <circle cx="8" cy="6" r="3" fill="white"/>
  </svg>
  `,
  className: "custom-marker",
  iconAnchor: [19, 38],
});


export default function MapBranch() {
  const locales = useLocales();
  const mapCenter = [-38.015, -57.559];
  const [mapZoom, setMapZoom] = useState(14);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMapZoom(12);
      } else {
        setMapZoom(13);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>

      <br />
      <div className="container px-1">

        <div style={{ aspectRatio: "16 / 9" }} className="rounded-lg border bg-white shadow-sm w-full max-w-3xl mx-auto overflow-hidden">
          <div className="p-0">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ aspectRatio: "16 / 9", zIndex: 1 }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {locales &&
                locales.map((sucursal) => (
                  (sucursal.geoLat && sucursal.geoLong) &&
                  <Marker key={sucursal.idUsuarioEmpresa} position={[sucursal.geoLat, sucursal.geoLong]} icon={customIcon}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold mb-2">{sucursal.direccionLocal}</h3>
                        <img
                          src={"/placeholder.svg"}
                          alt={sucursal.direccionLocal}
                          style={{ width: "100px", height: "50px", objectFit: "cover" }}
                          className="rounded-md mb-2"
                        />
                      </div>
                    </Popup>
                  </Marker>
                ))
              }
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}
