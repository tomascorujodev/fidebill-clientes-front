import { useState } from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import MobileNavbar from '../components/MobileNavbar'

 
export default function Menu() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Carousel></Carousel>
    </>
  )
}

