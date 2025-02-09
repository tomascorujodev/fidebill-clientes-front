import { useState } from 'react'
import MobileNavbar from '../components/MobileNavbar'
import Navbar from '../components/Navbar'
 
export default function Menu() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <MobileNavbar></MobileNavbar>
    </>
  )
}

