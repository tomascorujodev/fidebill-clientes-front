import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET } from "../services/Fetch";
import jwtDecode from "../utils/jwtDecode";

export default function useAuthValidation(setIsLoggedIn) {
  const { empresa } = useParams();

  useEffect(() => {
    async function validateFunction() {
      try {
        let token = localStorage.getItem(empresa);
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        let response = await GET("authclientes/validatetoken");
        if (response?.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem(empresa);
        }

        let decodedToken = jwtDecode(localStorage.getItem(empresa));
        if (empresa !== decodedToken.empresa) {
          localStorage.removeItem(empresa);
          setIsLoggedIn(false);
        }
      } catch {
        localStorage.removeItem(empresa);
        setIsLoggedIn(false);
      }
    }

    validateFunction();
  }, [empresa, setIsLoggedIn]);
}
