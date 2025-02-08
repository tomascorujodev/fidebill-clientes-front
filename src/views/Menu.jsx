import { useState } from 'react'
import Navbar from '../components/Navbar'
 
export default function Menu() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
    </>
  )
}

