import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientsOffice from "./layouts/ClientsOffice";
import Menu from "./views/Menu";
import Sucursales from "./views/Sucursales";
import Beneficios from "./views/Beneficios";
import Movimientos from "./views/Movimientos";
import { useEffect, useState } from "react";
import ViewLogin from "./views/ViewLogin";
import View404 from "./views/View404";
import View500 from "./views/View500";
import { GET } from "./services/Fetch";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { Spinner } from "react-bootstrap";
import ViewRegistroClientes from "./views/ViewRegistroClientes";
import { useEmpresa } from "./contexts/EmpresaContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [routes, setRoutes] = useState(false);
  const { empresa, statusCode } = useEmpresa();

  useEffect(() => {
    async function loadPage() {
      if (statusCode === null) {
        setIsLoading(true);
        return
      }

      if (statusCode === 200) {
        try {
          let token = localStorage.getItem(empresa);
          if (!token) {
            setIsLoggedIn(false);
          } else {
            let response = await GET("authclientes/validatetoken");
            if (response?.ok) {
              setIsLoggedIn(true);
            } else {
              localStorage.removeItem(empresa);
            }
          }
        } catch { }
      }

      setRoutes(returnView());
      setIsLoading(false);
    }
    loadPage()
  }, [statusCode, isLoggedIn]);

  function returnView() {
    switch (statusCode) {
      case 200:
        return (
          isLoggedIn ?
            <Route element={<ClientsOffice setChangePassword={setChangePassword}/>}>
              <Route path="/:empresa/*" element={<Menu />} />
              <Route path="/:empresa/sucursales" element={<Sucursales />} />
              <Route path="/:empresa/beneficios" element={<Beneficios />} />
              <Route path="/:empresa/movimientos" element={<Movimientos />} />
            </Route>
            :
            <>
              <Route path="*" element={<View404 />} />
              <Route path="/404" element={<View404 />} />
              <Route path="/:empresa/*" element={<ViewLogin setChangePassword={setChangePassword} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/:empresa/registro" element={<ViewRegistroClientes />} />
              <Route path="/500" element={<View500 />} />
            </>)
      case 400:
        return <Route path="*" element={<View404 />} />
      case 404:
        return <Route path="*" element={<View404 />} />
      case 500:
        return <Route path="*" element={<View500 />} />
    }
  }

  return (
    <>
      {
        isLoading || !routes ?
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
          </div>
          :
          <>
            <BrowserRouter>
              <Routes>
                {
                  routes
                }
              </Routes>
              <ChangePasswordModal changePassword={changePassword} setChangePassword={setChangePassword} />
            </BrowserRouter>

          </>
      }
    </>
  );
}
