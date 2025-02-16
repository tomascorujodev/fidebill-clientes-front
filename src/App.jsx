import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientsOffice from "./layouts/ClientsOffice";
import Menu from "./views/Menu";
import Beneficios from "./views/Beneficios";
import Movimientos from "./views/Movimientos";
import { useEffect, useState } from "react";
import ViewLogin from "./views/ViewLogin";
import ViewCambiarContraseña from "./views/ViewCambiarContraseña";
import View404 from "./views/View404";
import View500 from "./views/View500";
import { GET } from "./services/Fetch";

function App() {
  const [isLogedIn, setIsLoggedIn] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  useEffect(() => {
    async function validateFunction (){
      let token = localStorage.getItem(window.location.pathname.slice(1));
      if(token){
        let response = await GET("authclientes/validatetoken");
        if(response.ok){
          setIsLoggedIn(true);
        }else{
          sessionStorage.clear();
          setIsLoggedIn(false);
        }
      }else{
        setIsLoggedIn(false);
      }
    }
    validateFunction();
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        {
          isLogedIn ?
            <Route element={<ClientsOffice/>}>
              <Route path="/*" element={<Menu></Menu>}/>
              <Route path="/beneficios" element={<Beneficios></Beneficios>}/>
              <Route path="/movimientos" element={<Movimientos></Movimientos>}/>
            </Route>
          :  
            passwordChange ?
              <Route path="/*" element={<ViewCambiarContraseña></ViewCambiarContraseña>}/>
              :
              <>
                <Route path="/404" element={<View404/>}/>
                <Route path="/:empresa" element={<ViewLogin setIsLoggedIn={setIsLoggedIn}></ViewLogin>}/>
                <Route path="/500" element={<View500/>}/>
              </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
