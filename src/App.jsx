import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientsOffice from "./layouts/ClientsOffice";
import Menu from "./views/Menu";
import Beneficios from "./views/Beneficios";
import Movimientos from "./views/Movimientos";
import { useEffect, useState } from "react";
import { GET } from "./Services/Fetch";
import { LogIn } from "lucide-react";

function App() {
  const [isLogedIn, setIsLoggedIn] = useState(true);
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
        {isLogedIn ?
          <Route element={<ClientsOffice/>}>
            <Route path="/*" element={<Menu></Menu>}></Route>
            <Route path="/beneficios" element={<Beneficios></Beneficios>}></Route>
            <Route path="/movimientos" element={<Movimientos></Movimientos>}></Route>
          </Route>
          :
          <Route path="/*" element={<ViewLogin setIsLoggedIn={setIsLoggedIn}></ViewLogin>}></Route>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
