import { useState } from 'react'
import MobileNavbar from '../components/mobileNavbar'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
 
export default function Menu() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <MobileNavbar></MobileNavbar>
    </>
  )
}

