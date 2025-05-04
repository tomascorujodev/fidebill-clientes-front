import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocales } from "../contexts/LocalesContext";
import { useEmpresa } from "../contexts/EmpresaContext";

export default function MapBranch() {
  const { empresa, estiloBorde } = useEmpresa();
  const locales = useLocales();
  const mapCenter = [-38.015, -57.559];
  const [mapZoom, setMapZoom] = useState(14);
  
  const customIcon = divIcon({
    html: `
      <div style="width: 70px; height: 70px; position: relative;">
        <svg viewBox="0 0 16 16" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0a6 6 0 0 1 6 6c0 4.418-6 10-6 10S2 10.418 2 6a6 6 0 0 1 6-6z" fill="${estiloBorde}"/>
          <circle cx="8" cy="6" r="5" fill="white"/>
        </svg>
        <div style="position: absolute; top: 4.375px; left: 13.125px; width: 43.75px; height: 43.75px; border-radius: 50%;">
          <img 
            src="/assets/${empresa}.png"
            style="width: 100%; height: 100%; object-fit: contain; object-position: center; border-radius: 50%;"
            alt="flecha de ubicación en el mapa"
          />
        </div>
      </div>
    `,
    className: "",
    iconAnchor: [35, 70],
  });

  useEffect(() => {
    function handleResize(){
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
                locales?.map((sucursal) => (
                  (sucursal.geoLat && sucursal.geoLong) &&
                  <Marker key={sucursal.idUsuarioEmpresa} position={[sucursal.geoLat, sucursal.geoLong]} icon={customIcon}>
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold mb-2">{sucursal.direccionLocal}</h3>
                        <img
                          src={`/assets/${empresa}.png`}
                          alt="logo empresa"
                          style={{ width: "100px", height: "50px"}}
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
