import { useParams } from 'react-router-dom'
import Carousel from '../components/Carousel'
import MapBranch from '../components/MapBranch'
import useAuthValidation from '../hooks/useAuthValidation'
import jwtDecode from '../utils/jwtDecode'


export default function Menu({ setIsLoggedIn }) {
  useAuthValidation(setIsLoggedIn)
  const { empresa } = useParams();
  const token = jwtDecode(localStorage.getItem(empresa))
  
  return (
    <>

      <MapBranch />
      <br />
      <Carousel />
    </>
  )
}

