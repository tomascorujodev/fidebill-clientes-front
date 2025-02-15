import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientsOffice from "./Layouts/ClientsOffice";
import Menu from "./Views/Menu";
import Beneficios from "./Views/Beneficios";
import Movimientos from "./Views/Movimientos";
import { useEffect, useState } from "react";
import { GET } from "./Services/Fetch";
import { LogIn } from "lucide-react";
import ViewLogin from "./views/ViewLogin";
import ViewCambiarContraseña from "./views/ViewCambiarContraseña";

function App() {
  const [isLogedIn, setIsLoggedIn] = useState(true);
  const [passwordChange, setPasswordChange] = useState(false);
//   useEffect(() => {
//     async function validateFunction (){
//       let token = sessionStorage.getItem("token");
//       if(token){
//         let response = await GET("auth/validatetoken");
//         if(response.ok){
//           setIsLoggedIn(true);
//         }else{
//           sessionStorage.clear();
//           setIsLoggedIn(false);
//         }
//       }else{
//         setIsLoggedIn(false);
//       }
//     }
//     validateFunction();
//   }, [])
  return (
    <BrowserRouter>
      <Routes>
        {isLogedIn &&
          <Route element={<ClientsOffice/>}>
            <Route path="/*" element={<Menu></Menu>}></Route>
            <Route path="/beneficios" element={<Beneficios></Beneficios>}></Route>
            <Route path="/movimientos" element={<Movimientos></Movimientos>}></Route>
          </Route>
          /*: passwordChange ?
          <Route path="/*" element={<ViewCambiarContraseña></ViewCambiarContraseña>}></Route>
            :
          <Route path="/*" element={<ViewLogin setIsLoggedIn={setIsLoggedIn}></ViewLogin>}></Route>*/
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
