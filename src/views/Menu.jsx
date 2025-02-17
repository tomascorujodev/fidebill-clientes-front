import { useState } from 'react'
import Carousel from '../components/Carousel'
import { useParams } from 'react-router-dom';

 
export default function Menu() {
  const [count, setCount] = useState(0);
  const pathname = window.location.pathname;
  const firstPart = pathname.split('/')[1];   
  console.log(firstPart);

  return (
    <>
      <Carousel/>
    </>
  )
}

