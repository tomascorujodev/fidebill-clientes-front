import { Home, Search, Bell, User } from "lucide-react"
import { Link } from "react-router-dom"

const MobileNavbar = () => {
  return (
    <nav style={{position: "absolute",bottom: "0"}} className="navbar navbar-light bg-light">
      <div className="container-fluid justify-content-around">
        <Link className="nav-link text-center" to="/">
          <Home size={24} />
          <div className="small">Inicio</div>
        </Link>
        <Link className="nav-link text-center" to="/">
          <Search size={24} />
          <div className="small">Buscar</div>
        </Link>
        <Link className="nav-link text-center" to="beneficios">
          <Bell size={24} />
          <div className="small">Beneficios</div>
        </Link>
        <Link className="nav-link text-center" to="#">
          <User size={24} />
          <div className="small">Más</div>
        </Link>
      </div>
    </nav>
  )
}

export default MobileNavbar