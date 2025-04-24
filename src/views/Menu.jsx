import Carousel from '../components/Carousel'
import MapBranch from '../components/MapBranch'


export default function Menu() {
  const userAgent = navigator.userAgent;
  let navegador;
  switch (true) {
    case userAgent.includes("Edg"):
      navegador = "Edge";
      break;
    case userAgent.includes("Chrome") && !userAgent.includes("Edg"):
      navegador = "Chrome";
      break;
    case userAgent.includes("Firefox"):
      navegador = "Firefox";
      break;
    case userAgent.includes("Safari") && !userAgent.includes("Chrome"):
      navegador = "Safari";
      break;
    case userAgent.includes("OPR") || userAgent.includes("Opera"):
      navegador = "Opera";
      break;
    default:
      navegador = "Otro o no identificado";
  }
  return (
    <>
      <MapBranch />
      <br />
      <Carousel />
    </>
  )
}

