import { useEffect, useState } from "react"
import { GET } from "../services/Fetch";

export default function Carousel() {
  const [urlImagenes, setUrlImagenes] = useState(null);

  useEffect(() => {
    async function obtenerCarrousel() {
      let result = await GET("vistaclientes/getcarrousel");
      if (result?.status === 200) {
        result = await result.json();
        console.log(result);
        setUrlImagenes(result);
      }
    }
    obtenerCarrousel();
  }, []);


  return (
    <div style={{ aspectRatio: "4 / 1" }} className="w-full max-w-3xl mx-auto p-0 mt-0">
      <div id="carouselExampleFade" className=" h-100 w-100 carousel slide carousel-fade">
        <div className="carousel-inner h-100 w-100">
          {
            urlImagenes ?
              <>
                <div className="carousel-item active h-100 w-100">
                  <img src={urlImagenes?.imagen1} className="d-block w-100 h-100 object-cover" alt="..." />
                </div>
                <div className="carousel-item w-100 h-100">
                  <img src={urlImagenes?.imagen2} className="d-block w-100 h-100 object-cover" alt="..." />
                </div>
                <div className="carousel-item w-100 h-100">
                  <img src={urlImagenes?.imagen3} className="d-block w-100 h-100 object-cover" alt="..." />
                </div>
              </>
              :
              <div>No se ha podido cargar las imagenes 🥺🥺</div>
          }
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}