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
import { EmpresaProvider } from "./contexts/EmpresaContext";

export default function App() {
  const [isLogedIn, setIsLoggedIn] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function validateFunction() {
      try {
        let empresa = window.location.pathname.slice(1).split('/')[0];
        let token = localStorage.getItem(empresa);
        if (!token) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }
        let response = await GET("authclientes/validatetoken");
        if (response?.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem(empresa);
        }
      } catch { } finally {
        setIsLoading(false);
      }
    }
    validateFunction();
  }, []);

  return (
    <>
      {
        isLoading ?
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
          </div>
          :
          <>

            <BrowserRouter>
              <Routes>
                {
                  isLogedIn ?
                    <Route element={<ClientsOffice />}>
                      <Route path="/:empresa/*" element={<EmpresaProvider><Menu /></EmpresaProvider>} />
                      <Route path="/:empresa/sucursales" element={<Sucursales />} />
                      <Route path="/:empresa/beneficios" element={<Beneficios />} />
                      <Route path="/:empresa/movimientos" element={<Movimientos />} />
                    </Route>
                    :
                    <>
                      <Route path="*" element={<View404 />} />
                      <Route path="/404" element={<View404 />} />
                      <Route path="/:empresa/*" element={<EmpresaProvider><ViewLogin setChangePassword={setChangePassword} setIsLoggedIn={setIsLoggedIn} /></EmpresaProvider>} />
                      <Route path="/:empresa/registro" element={<EmpresaProvider><ViewRegistroClientes /></EmpresaProvider>} />
                      <Route path="/500" element={<View500 />} />
                    </>
                }
              </Routes>
              {/* <ChangePasswordModal changePassword={changePassword} setChangePassword={setChangePassword} /> */}
            </BrowserRouter>

          </>
      }
    </>
  );
}
