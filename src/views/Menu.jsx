import { useState } from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import MobileNavbar from '../Components/mobileNavbar'

 
export default function Menu() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Carousel></Carousel>
    </>
  )
}

