import { Home, Search, Bell, User } from "lucide-react"

const MobileNavbar = () => {
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light">
      <div className="container-fluid justify-content-around">
        <a className="nav-link text-center" href="#">
          <Home size={24} />
          <div className="small">Inicio</div>
        </a>
        <a className="nav-link text-center" href="#">
          <Search size={24} />
          <div className="small">Buscar</div>
        </a>
        <a className="nav-link text-center" href="#">
          <Bell size={24} />
          <div className="small">Beneficios</div>
        </a>
        <a className="nav-link text-center" href="#">
          <User size={24} />
          <div className="small">Más</div>
        </a>
      </div>
    </nav>
  )
}

export default MobileNavbar