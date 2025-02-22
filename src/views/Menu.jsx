import Carousel from '../components/Carousel'
import MapBranch from '../components/MapBranch'
import useAuthValidation from '../hooks/useAuthValidation'

 
export default function Menu({setIsLoggedIn}) {
  useAuthValidation(setIsLoggedIn)

  return (
    <>
      <MapBranch/>
      <br />
      <Carousel/>
    </>
  )
}

