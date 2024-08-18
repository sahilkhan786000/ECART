import React from 'react'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'

export default function Home() {
  return (
   <>

    <div>
        <Header/>
    </div>

    <div>
        <Carousel/>
    </div>
   
    <div>
        <ProductList/>
    </div>

    <div>
        <Footer/>
    </div>
   </>
  )
}



