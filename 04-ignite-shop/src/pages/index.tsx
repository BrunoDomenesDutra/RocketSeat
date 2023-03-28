import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import c1 from '../assets/img/Shirt/01.png'
import c2 from '../assets/img/Shirt/02.png'
import c3 from '../assets/img/Shirt/03.png'
import { useEffect, useState } from "react";
import { stripe } from "../lib/stripe";

export default function Home() {

  const [list, setList] = useState<number[]>([])

  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setList([1,2,3])
    }, 2000)
  }, [])


  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <Product className='keen-slider__slide'>
        <Image src={c1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={c2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={c3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={c3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export const getServerSideProps = async() => {
  const response = await stripe.products.list()

  return {
    props: {
      list: [1,2,3]
    }
  }
  
}