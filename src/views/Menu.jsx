import Carousel from '../components/Carousel'
import useAuthValidation from '../hooks/useAuthValidation'

 
export default function Menu({setIsLoggedIn}) {
  useAuthValidation(setIsLoggedIn)

  return (
    <>
      <Carousel/>
    </>
  )
}

